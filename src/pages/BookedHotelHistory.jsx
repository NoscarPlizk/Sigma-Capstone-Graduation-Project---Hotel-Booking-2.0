import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../content/Firebase/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

  const parsedDate = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return String(dateValue);
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatStatusLabel(value) {
  if (!value) return "Unknown";

  return String(value)
    .replaceAll("_", " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function getStatusTone(status) {
  if (status === "cancelled") {
    return {
      backgroundColor: "#fdf0ef",
      color: "#a63d32",
      borderColor: "#f2c9c4",
    };
  }

  if (status === "confirmed") {
    return {
      backgroundColor: "#eef8f2",
      color: "#246744",
      borderColor: "#c8e6d3",
    };
  }

  return {
    backgroundColor: "#f6f6f6",
    color: "#4a4a4a",
    borderColor: "#e2e2e2",
  };
}

function canCancelBooking(booking) {
  return booking?.booking_status === "confirmed";
}

function BookingCard({ booking, cancellingCode, onCancel }) {
  const statusTone = getStatusTone(booking.booking_status);
  const paymentTone = getStatusTone(
    booking.payment_status === "paid" ? "confirmed" : booking.payment_status
  );
  const isCancelling = cancellingCode === booking.booking_code;
  const canCancel = canCancelBooking(booking) && !isCancelling;

  return (
    <article style={styles.card}>
      <div style={styles.cardTopRow}>
        <div style={styles.cardMediaWrap}>
          {booking.hotel_photo_url ? (
            <img
              src={booking.hotel_photo_url}
              alt={booking.hotel_name}
              style={styles.hotelImage}
            />
          ) : (
            <div style={styles.imageFallback}>No Image</div>
          )}
        </div>

        <div style={styles.cardMain}>
          <div style={styles.cardHeaderRow}>
            <div>
              <p style={styles.bookingCode}>#{booking.booking_code}</p>
              <h2 style={styles.hotelName}>{booking.hotel_name}</h2>
              <p style={styles.hotelAddress}>{booking.hotel_address || "Address unavailable"}</p>
            </div>

            <div style={styles.badgesWrap}>
              <span style={{ ...styles.badge, ...statusTone }}>
                {formatStatusLabel(booking.booking_status)}
              </span>
              <span style={{ ...styles.badge, ...paymentTone }}>
                {formatStatusLabel(booking.payment_status)}
              </span>
            </div>
          </div>

          <div style={styles.detailsGrid}>
            <div style={styles.detailBox}>
              <span style={styles.detailLabel}>Stay</span>
              <strong>
                {formatDate(booking.check_in_date)} - {formatDate(booking.check_out_date)}
              </strong>
              <p style={styles.detailText}>{booking.total_days} night(s)</p>
            </div>

            <div style={styles.detailBox}>
              <span style={styles.detailLabel}>Guests</span>
              <strong>
                {booking.adult_pax} adult(s), {booking.child_pax} child(s)
              </strong>
            </div>

            <div style={styles.detailBox}>
              <span style={styles.detailLabel}>Total</span>
              <strong>{formatMoney(booking.total_amount, booking.currency)}</strong>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.roomSection}>
        <div style={styles.sectionHeaderRow}>
          <h3 style={styles.sectionTitle}>Booked rooms</h3>
          <span style={styles.sectionNote}>
            Preview actions like change dates and generate invoice are display-only for now.
          </span>
        </div>

        {booking.rooms?.length ? (
          <div style={styles.roomList}>
            {booking.rooms.map((room, index) => (
              <div key={`${booking.booking_code}-${room.room_name}-${index}`} style={styles.roomRow}>
                <div>
                  <strong style={styles.roomName}>{room.room_name}</strong>
                  <p style={styles.roomMeta}>{room.amount} room(s)</p>
                </div>

                <strong style={styles.roomPrice}>
                  {formatMoney(room.subtotal_amount, booking.currency)}
                </strong>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyRooms}>Room details are not available for this booking yet.</div>
        )}
      </div>

      <div style={styles.actionsRow}>
        <button
          type="button"
          style={{
            ...styles.primaryButton,
            ...(canCancel ? {} : styles.disabledPrimaryButton),
          }}
          onClick={() => onCancel(booking)}
          disabled={!canCancel}
        >
          {isCancelling ? "Cancelling..." : "Cancel reservation"}
        </button>

        <button type="button" style={styles.placeholderButton} disabled>
          Change dates
        </button>

        <button type="button" style={styles.placeholderButton} disabled>
          Manage guests
        </button>

        <button type="button" style={styles.placeholderButton} disabled>
          Generate invoice
        </button>

        {booking.receipt_url ? (
          <a
            href={booking.receipt_url}
            target="_blank"
            rel="noreferrer"
            style={styles.linkButton}
          >
            View receipt
          </a>
        ) : (
          <button type="button" style={styles.placeholderButton} disabled>
            Receipt unavailable
          </button>
        )}
      </div>
    </article>
  );
}

export default function BookedHotelHistory() {
  const navigate = useNavigate();
  const { firebaseUser, authLoading } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [cancellingCode, setCancellingCode] = useState("");

  async function loadBookings({ signal } = {}) {
    if (!firebaseUser?.uid) return;

    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch(
        `${BACKEND_URL}/api/booking-records/user/${encodeURIComponent(firebaseUser.uid)}`,
        {
          method: "GET",
          signal,
        }
      );

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Failed to load your booking history.");
      }

      setBookings(Array.isArray(result.bookings) ? result.bookings : []);
    } catch (error) {
      if (error.name !== "AbortError") {
        setErrorMessage(error.message);
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }

  async function handleCancelBooking(booking) {
    if (!firebaseUser?.uid || !canCancelBooking(booking)) {
      return;
    }

    const shouldContinue = window.confirm(
      `Cancel reservation for ${booking.hotel_name}?`
    );

    if (!shouldContinue) {
      return;
    }

    try {
      setCancellingCode(booking.booking_code);

      const response = await fetch(
        `${BACKEND_URL}/api/booking-records/${encodeURIComponent(booking.booking_code)}/cancel`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firebaseUid: firebaseUser.uid,
          }),
        }
      );

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Failed to cancel booking.");
      }

      if (result.booking) {
        setBookings((currentBookings) =>
          currentBookings.map((currentBooking) =>
            currentBooking.booking_code === result.booking.booking_code
              ? result.booking
              : currentBooking
          )
        );
      } else {
        await loadBookings();
      }
    } catch (error) {
      window.alert(error.message);
    } finally {
      setCancellingCode("");
    }
  }

  useEffect(() => {
    if (authLoading) {
      return undefined;
    }

    if (!firebaseUser?.uid) {
      navigate("/userauth");
      return undefined;
    }

    const controller = new AbortController();
    loadBookings({ signal: controller.signal });

    return () => controller.abort();
  }, [authLoading, firebaseUser?.uid, navigate]);

  const summary = bookings.reduce(
    (result, booking) => {
      result.total += 1;
      result.totalSpent += Number(booking.total_amount || 0);

      if (booking.booking_status === "confirmed") {
        result.confirmed += 1;
      }

      if (booking.booking_status === "cancelled") {
        result.cancelled += 1;
      }

      return result;
    },
    {
      total: 0,
      confirmed: 0,
      cancelled: 0,
      totalSpent: 0,
    }
  );

  if (authLoading || loading) {
    return (
      <main style={styles.page}>
        <section style={styles.loadingCard}>Loading your hotel booking history...</section>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main style={styles.page}>
        <section style={styles.errorCard}>
          <h1 style={styles.pageTitle}>Unable to load bookings</h1>
          <p style={styles.pageSubtitle}>{errorMessage}</p>
          <button type="button" style={styles.primaryButton} onClick={() => loadBookings()}>
            Try again
          </button>
        </section>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div>
          <p style={styles.eyebrow}>Booking history</p>
          <h1 style={styles.pageTitle}>Your booked hotels in one place</h1>
          <p style={styles.pageSubtitle}>
            Review confirmed stays, track cancelled reservations, and preview future
            self-service actions from a single screen.
          </p>
        </div>

        <button type="button" style={styles.secondaryButton} onClick={() => navigate("/")}>
          Back to Home
        </button>
      </section>

      <section style={styles.summaryGrid}>
        <div style={styles.summaryCard}>
          <span style={styles.summaryLabel}>Total bookings</span>
          <strong style={styles.summaryValue}>{summary.total}</strong>
        </div>

        <div style={styles.summaryCard}>
          <span style={styles.summaryLabel}>Confirmed stays</span>
          <strong style={styles.summaryValue}>{summary.confirmed}</strong>
        </div>

        <div style={styles.summaryCard}>
          <span style={styles.summaryLabel}>Cancelled</span>
          <strong style={styles.summaryValue}>{summary.cancelled}</strong>
        </div>

        <div style={styles.summaryCard}>
          <span style={styles.summaryLabel}>Total paid</span>
          <strong style={styles.summaryValue}>{formatMoney(summary.totalSpent, "MYR")}</strong>
        </div>
      </section>

      {bookings.length === 0 ? (
        <section style={styles.emptyState}>
          <h2 style={styles.emptyTitle}>No hotel bookings yet</h2>
          <p style={styles.emptyText}>
            When you complete a reservation, it will appear here with stay details,
            payment status, and management actions.
          </p>
          <button type="button" style={styles.primaryButton} onClick={() => navigate("/")}>
            Explore hotels
          </button>
        </section>
      ) : (
        <section style={styles.listWrap}>
          {bookings.map((booking) => (
            <BookingCard
              key={booking.booking_code}
              booking={booking}
              cancellingCode={cancellingCode}
              onCancel={handleCancelBooking}
            />
          ))}
        </section>
      )}
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px 20px 80px",
    background:
      "linear-gradient(180deg, #f6f3ee 0%, #fbfaf7 22%, #ffffff 100%)",
  },
  hero: {
    maxWidth: "1180px",
    margin: "0 auto 24px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    padding: "28px",
    borderRadius: "28px",
    backgroundColor: "rgba(255,255,255,0.86)",
    border: "1px solid #ece6dc",
    boxShadow: "0 24px 60px rgba(62, 45, 24, 0.08)",
    backdropFilter: "blur(10px)",
  },
  eyebrow: {
    margin: "0 0 8px",
    fontSize: "12px",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#9b7358",
  },
  pageTitle: {
    margin: 0,
    fontSize: "clamp(30px, 5vw, 44px)",
    lineHeight: 1.05,
    color: "#2c2118",
  },
  pageSubtitle: {
    margin: "12px 0 0",
    maxWidth: "720px",
    fontSize: "15px",
    lineHeight: 1.7,
    color: "#6b5a4a",
  },
  summaryGrid: {
    maxWidth: "1180px",
    margin: "0 auto 24px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
  },
  summaryCard: {
    padding: "20px 22px",
    borderRadius: "22px",
    backgroundColor: "#fffdf9",
    border: "1px solid #efe8dd",
    boxShadow: "0 16px 40px rgba(62, 45, 24, 0.06)",
  },
  summaryLabel: {
    display: "block",
    fontSize: "12px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#8b7d70",
  },
  summaryValue: {
    display: "block",
    marginTop: "8px",
    fontSize: "28px",
    color: "#2c2118",
  },
  listWrap: {
    maxWidth: "1180px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  card: {
    padding: "24px",
    borderRadius: "28px",
    backgroundColor: "#ffffff",
    border: "1px solid #eee6d9",
    boxShadow: "0 24px 50px rgba(62, 45, 24, 0.07)",
  },
  cardTopRow: {
    display: "grid",
    gridTemplateColumns: "minmax(140px, 180px) 1fr",
    gap: "22px",
  },
  cardMediaWrap: {
    minHeight: "110px",
  },
  hotelImage: {
    width: "100%",
    height: "100%",
    minHeight: "110px",
    objectFit: "cover",
    borderRadius: "22px",
    display: "block",
  },
  imageFallback: {
    width: "100%",
    minHeight: "110px",
    borderRadius: "22px",
    background:
      "linear-gradient(135deg, rgba(182,143,108,0.18), rgba(255,255,255,0.9))",
    border: "1px solid #eadfce",
    display: "grid",
    placeItems: "center",
    color: "#8f6f57",
    fontSize: "14px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  cardMain: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  cardHeaderRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "flex-start",
  },
  bookingCode: {
    margin: "0 0 10px",
    fontSize: "12px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#9b7358",
  },
  hotelName: {
    margin: 0,
    fontSize: "28px",
    color: "#2c2118",
  },
  hotelAddress: {
    margin: "8px 0 0",
    fontSize: "14px",
    lineHeight: 1.6,
    color: "#746555",
  },
  badgesWrap: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: "8px",
  },
  badge: {
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 700,
    border: "1px solid transparent",
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "12px",
  },
  detailBox: {
    padding: "16px",
    borderRadius: "18px",
    backgroundColor: "#faf7f2",
    border: "1px solid #eee4d5",
  },
  detailLabel: {
    display: "block",
    marginBottom: "8px",
    fontSize: "11px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#8b7d70",
  },
  detailText: {
    margin: "6px 0 0",
    fontSize: "13px",
    color: "#7a6d5d",
  },
  roomSection: {
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "1px solid #f0e7db",
  },
  sectionHeaderRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "14px",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "18px",
    color: "#2c2118",
  },
  sectionNote: {
    maxWidth: "420px",
    fontSize: "12px",
    lineHeight: 1.6,
    color: "#8a7866",
  },
  roomList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  roomRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    padding: "14px 16px",
    borderRadius: "18px",
    backgroundColor: "#fcfbf8",
    border: "1px solid #efe7dc",
  },
  roomName: {
    display: "block",
    color: "#2c2118",
  },
  roomMeta: {
    margin: "4px 0 0",
    fontSize: "13px",
    color: "#7a6d5d",
  },
  roomPrice: {
    color: "#2c2118",
    whiteSpace: "nowrap",
  },
  emptyRooms: {
    padding: "16px",
    borderRadius: "18px",
    backgroundColor: "#fcfbf8",
    border: "1px solid #efe7dc",
    color: "#7a6d5d",
  },
  actionsRow: {
    marginTop: "22px",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  primaryButton: {
    padding: "12px 18px",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "#2e6b4a",
    color: "#ffffff",
    fontWeight: 700,
    cursor: "pointer",
  },
  disabledPrimaryButton: {
    backgroundColor: "#b5c4bb",
    cursor: "not-allowed",
  },
  secondaryButton: {
    padding: "12px 18px",
    borderRadius: "999px",
    border: "1px solid #d9ccb8",
    backgroundColor: "#fffaf3",
    color: "#3c2e20",
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  placeholderButton: {
    padding: "12px 18px",
    borderRadius: "999px",
    border: "1px solid #e4d9ca",
    backgroundColor: "#f7f2ea",
    color: "#9b8e81",
    fontWeight: 600,
    cursor: "not-allowed",
  },
  linkButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 18px",
    borderRadius: "999px",
    border: "1px solid #d8ccb9",
    backgroundColor: "#ffffff",
    color: "#3c2e20",
    fontWeight: 700,
    textDecoration: "none",
  },
  loadingCard: {
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "32px",
    borderRadius: "24px",
    backgroundColor: "#ffffff",
    border: "1px solid #eee6d9",
    color: "#5f5143",
  },
  errorCard: {
    maxWidth: "720px",
    margin: "0 auto",
    padding: "32px",
    borderRadius: "24px",
    backgroundColor: "#ffffff",
    border: "1px solid #f0ddd9",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  emptyState: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "44px 32px",
    borderRadius: "28px",
    backgroundColor: "#fffdf9",
    border: "1px solid #efe7dc",
    boxShadow: "0 20px 50px rgba(62, 45, 24, 0.06)",
    textAlign: "center",
  },
  emptyTitle: {
    margin: 0,
    fontSize: "28px",
    color: "#2c2118",
  },
  emptyText: {
    margin: "12px auto 24px",
    maxWidth: "520px",
    lineHeight: 1.7,
    color: "#746555",
  },
};
