import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../content/Firebase/AuthContext";

import "./PaymentCompletePage.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const PAYMENT_COMPLETE_FLOW_SOURCE = "purchase-portal-stripe";

function formatMoney(amount, currency = "MYR") {
  const numberAmount = Number(amount || 0);

  try {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency,
    }).format(numberAmount);
  } catch {
    return `${currency} ${numberAmount.toFixed(2)}`;
  }
}

function formatDate(dateValue) {
  if (!dateValue) return "-";

  return new Date(dateValue).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function delay(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function readSessionJson(key) {
  if (!key) return null;

  const rawValue = sessionStorage.getItem(key);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
}

export default function PaymentCompletePage() {
  const navigate = useNavigate();
  const { firebaseUser, userProfile, authLoading } = useAuth();
  const firebaseUid = firebaseUser?.uid ?? null;

  const [searchParams] = useSearchParams();
  const paymentIntentId = searchParams.get("payment_intent");
  const redirectStatus = searchParams.get("redirect_status");

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(
    "Validating your payment return..."
  );
  const [errorMessage, setErrorMessage] = useState("");

  const importStateKey = paymentIntentId
    ? `bookingImportState:${paymentIntentId}`
    : null;
  const bookingRegistryKey = paymentIntentId
    ? `bookingRegistry:${paymentIntentId}`
    : null;
  const paymentCompleteFlowKey = paymentIntentId
    ? `paymentCompleteFlow:${paymentIntentId}`
    : null;

  function getSavedBookingRegistry(currentPaymentIntentId) {
    return readSessionJson(`bookingRegistry:${currentPaymentIntentId}`);
  }

  function setFlowState(status) {
    if (!paymentCompleteFlowKey) {
      return;
    }

    const currentFlow = readSessionJson(paymentCompleteFlowKey);

    sessionStorage.setItem(
      paymentCompleteFlowKey,
      JSON.stringify({
        source: PAYMENT_COMPLETE_FLOW_SOURCE,
        status,
        createdAt: currentFlow?.createdAt ?? Date.now(),
        updatedAt: Date.now(),
      })
    );
  }

  useEffect(() => {
    if (authLoading) {
      return undefined;
    }

    const controller = new AbortController();

    async function failFlow(message) {
      setBooking(null);
      setErrorMessage(message);
      setLoading(false);
    }

    async function ImportIntoDB(currentPaymentIntentId) {
      if (!importStateKey) {
        throw new Error("Missing import state key.");
      }

      const bookingRegistry = getSavedBookingRegistry(currentPaymentIntentId);

      if (!bookingRegistry) {
        throw new Error("Booking data was lost. Please contact support.");
      }

      const existingImportState = sessionStorage.getItem(importStateKey);

      if (existingImportState === "completed") {
        setFlowState("completed");
        return {
          success: true,
          alreadyImported: true,
        };
      }

      sessionStorage.setItem(importStateKey, "started");
      setFlowState("finalizing");
      setLoadingMessage("Saving your confirmed booking...");

      const response = await fetch(
        `${BACKEND_URL}/api/start-setting-registry-data-in-db`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            stripePaymentIntentId: currentPaymentIntentId,
            firebaseUser: {
              firebase_uid: firebaseUser.uid,
              email: userProfile?.email ?? firebaseUser?.email ?? null,
              display_name:
                userProfile?.display_name ??
                ([
                  userProfile?.name?.first_name,
                  userProfile?.name?.last_name,
                ]
                  .filter(Boolean)
                  .join(" ") || null) ??
                firebaseUser?.displayName ??
                null,
              phone_number: [
                userProfile?.phone?.region_number_code ??
                userProfile?.phone?.region_code,
                userProfile?.phone?.telephone_number,
              ]
                .filter(Boolean)
                .join(" ") || null,
              photo_url: userProfile?.photo_url ?? firebaseUser?.photoURL ?? null,
            },
            bookingRegistry,
          }),
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        sessionStorage.removeItem(importStateKey);
        setFlowState("failed");
        throw new Error(data?.message || "Failed to save booking into DB.");
      }

      sessionStorage.setItem(importStateKey, "completed");
      sessionStorage.removeItem(`bookingRegistry:${currentPaymentIntentId}`);
      setFlowState("completed");

      return data;
    }

    async function fetchBookingSummary() {
      if (!paymentIntentId) {
        throw new Error("Missing booking code or payment intent ID.");
      }

      const apiUrl = `${BACKEND_URL}/api/booking-records/by-payment-intent/${encodeURIComponent(
        paymentIntentId
      )}`;

      let lastError = null;
      setLoadingMessage("Loading your confirmed booking...");

      for (let attempt = 0; attempt < 8; attempt += 1) {
        const response = await fetch(apiUrl, {
          method: "GET",
          signal: controller.signal,
        });

        const result = await response.json().catch(() => null);

        if (response.ok && result?.success && result?.booking) {
          setBooking(result.booking);
          return;
        }

        lastError = new Error(
          result?.message || "Failed to fetch booking summary."
        );

        if (response.status !== 404 || attempt === 7) {
          throw lastError;
        }

        await delay(500 * (attempt + 1));
      }

      throw lastError ?? new Error("Failed to fetch booking summary.");
    }

    async function runPaymentSuccessFlow() {
      if (!paymentIntentId) {
        await failFlow(
          "This page is only available after a completed Stripe booking payment."
        );
        return;
      }

      if (redirectStatus && redirectStatus !== "succeeded") {
        await failFlow(
          "Payment was not completed through the booking checkout flow."
        );
        return;
      }

      const paymentCompleteFlow = readSessionJson(paymentCompleteFlowKey);
      const hasValidFlowMarker =
        paymentCompleteFlow?.source === PAYMENT_COMPLETE_FLOW_SOURCE;
      const hasSavedBookingRegistry = Boolean(
        bookingRegistryKey && sessionStorage.getItem(bookingRegistryKey)
      );
      const existingImportState = importStateKey
        ? sessionStorage.getItem(importStateKey)
        : null;
      const hasKnownCheckoutState =
        hasValidFlowMarker ||
        hasSavedBookingRegistry ||
        existingImportState === "started" ||
        existingImportState === "completed";

      if (!hasKnownCheckoutState) {
        await failFlow(
          "Invalid access. Complete the booking from Purchase Portal to open this page."
        );
        return;
      }

      if (!firebaseUid) {
        await failFlow("Please sign in again to finish loading your booking.");
        return;
      }

      try {
        setLoading(true);
        setBooking(null);
        setErrorMessage("");
        setLoadingMessage("Validating your payment return...");

        if (hasSavedBookingRegistry) {
          await ImportIntoDB(paymentIntentId);
        }

        await fetchBookingSummary();
      } catch (error) {
        if (error.name !== "AbortError") {
          setErrorMessage(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    runPaymentSuccessFlow();

    return () => {
      controller.abort();
    };
  }, [
    authLoading,
    bookingRegistryKey,
    firebaseUid,
    importStateKey,
    paymentCompleteFlowKey,
    paymentIntentId,
    redirectStatus,
  ]);

  if (loading) {
    return (
      <main className="payment-complete-page">
        <section className="payment-card">
          <div className="loading-indicator" aria-hidden="true" />
          <p className="loading-text">{loadingMessage}</p>
        </section>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="payment-complete-page">
        <section className="payment-card">
          <div className="error-badge">!</div>
          <h1>Unable to load booking</h1>
          <p className="payment-message">{errorMessage}</p>
          <button
            className="outline-button"
            type="button"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </section>
      </main>
    );
  }

  if (!booking) {
    return (
      <main className="payment-complete-page">
        <section className="payment-card">
          <div className="error-badge">!</div>
          <h1>Unable to load booking</h1>
          <p className="payment-message">
            Payment may be successful, but booking summary was not loaded.
          </p>
          <button
            className="outline-button"
            type="button"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </section>
      </main>
    );
  }

  const rooms = booking.rooms || [];
  const paxText = `${booking.adult_pax} adult(s), ${booking.child_pax} child(s)`;

  return (
    <main className="payment-complete-page">
      <section className="payment-header" style={styles.header}>
        <div className="success-badge">✓</div>
        <h1>Booking Confirmed</h1>
        <p>Your hotel booking has been successfully confirmed.</p>
      </section>

      <section className="order-summary-card" style={styles.summaryCard}>
        <div style={styles.bookingMeta}>
          <span style={styles.metaLabel}>Booking Number</span>
          <strong style={styles.bookingCode}>#{booking.booking_code}</strong>
        </div>

        <div className="hotel-summary" style={styles.hotelSummary}>
          {booking.hotel_photo_url && (
            <img
              src={booking.hotel_photo_url}
              alt={booking.hotel_name}
              className="hotel-image"
              style={styles.hotelImage}
            />
          )}

          <div className="hotel-info" style={styles.hotelInfo}>
            <h3>{booking.hotel_name}</h3>
            <p>{booking.hotel_address}</p>
          </div>
        </div>

        <div className="summary-divider" />

        <div style={styles.infoGrid}>
          <div style={styles.infoBlock}>
            <span style={styles.metaLabel}>Stay</span>
            <strong>
              {formatDate(booking.check_in_date)} -{" "}
              {formatDate(booking.check_out_date)}
            </strong>
            <p>{booking.total_days} night(s)</p>
          </div>

          <div style={styles.infoBlock}>
            <span style={styles.metaLabel}>Guests</span>
            <strong>{paxText}</strong>
          </div>

          <div style={styles.infoBlock}>
            <span style={styles.metaLabel}>Total</span>
            <strong>{formatMoney(booking.total_amount, booking.currency)}</strong>
          </div>
        </div>

        {rooms.length > 0 && (
          <>
            <div className="summary-divider" />

            <div style={styles.roomsSection}>
              <span style={styles.metaLabel}>Booked Rooms</span>

              <div style={styles.roomList}>
                {rooms.map((room, index) => (
                  <div
                    className="room-row"
                    style={styles.roomRow}
                    key={`${room.room_name}-${index}`}
                  >
                    <div>
                      <h4 style={styles.roomName}>{room.room_name}</h4>
                      <p style={styles.roomMeta}>{room.amount} room(s)</p>
                    </div>

                    <strong style={styles.roomPrice}>
                      {formatMoney(room.subtotal_amount, booking.currency)}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="payment-actions" style={styles.actions}>
          <button
            className="primary-button"
            type="button"
            style={styles.primaryButton}
            onClick={() => navigate("/")}
          >
            Return to Home
          </button>
        </div>
      </section>
    </main>
  );
}

const styles = {
  header: {
    maxWidth: "420px",
  },
  summaryCard: {
    maxWidth: "560px",
    padding: "28px",
  },
  bookingMeta: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "6px",
    marginBottom: "22px",
  },
  metaLabel: {
    fontSize: "12px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#7a7a7a",
  },
  bookingCode: {
    fontSize: "20px",
    color: "#1f1f1f",
  },
  hotelSummary: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "14px",
  },
  hotelImage: {
    width: "100%",
    maxWidth: "240px",
    height: "160px",
    borderRadius: "14px",
  },
  hotelInfo: {
    maxWidth: "420px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "14px",
  },
  infoBlock: {
    backgroundColor: "#fafafa",
    border: "1px solid #ececec",
    borderRadius: "12px",
    padding: "14px 16px",
    textAlign: "center",
  },
  roomsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  roomList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  roomRow: {
    padding: "12px 14px",
    borderRadius: "12px",
    backgroundColor: "#fafafa",
    border: "1px solid #ececec",
    alignItems: "center",
  },
  roomName: {
    margin: 0,
    fontSize: "15px",
    fontWeight: 600,
    color: "#1f1f1f",
  },
  roomMeta: {
    margin: "4px 0 0",
    fontSize: "13px",
    color: "#6a6a6a",
  },
  roomPrice: {
    fontSize: "14px",
    color: "#1f1f1f",
  },
  actions: {
    marginTop: "24px",
  },
  primaryButton: {
    minWidth: "180px",
    borderRadius: "999px",
    padding: "12px 20px",
  },
};
