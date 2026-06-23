import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../content/Firebase/AuthContext";
import "./PaymentCompletePage.css";

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

  return new Date(dateValue).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function PaymentCompletePage() {
  // const navigate = useNavigate();
  // const { state } = useLocation();
  // const { paymentIntentId } = state;
  // const { firebaseUser, userProfile } = useAuth();



  const [searchParams] = useSearchParams();

  const bookingCode = searchParams.get("booking_code");
  // const paymentIntentId = searchParams.get("payment_intent");

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    // async function ImportIntoDB(paymentIntentId) {
    //   const response = await fetch(
    //     `${import.meta.env.VITE_BACKEND_URL}/api/start-setting-registry-data-in-db`,
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         stripePaymentIntentId: paymentIntentId,
    //         firebaseUser: {
    //           firebase_uid: firebaseUser.uid,
    //           email: userProfile.email,
    //           display_name: userProfile.displayName,
    //           phone_number: `${userProfile.region_code} ${userProfile.telephone_number}`,
    //           photo_url: userProfile.photoURL,
    //         },
    //         bookingRegistry,
    //       }),
    //     }
    //   );

    //   const data = await response.json();

    //   if (!response.ok) {
    //     throw new Error(data.message || "Failed to Database Post");
    //   }

    //   if (data.success) {
    //     // redirect(
    //     //   `/payment-complete?booking_code=${encodeURIComponent(
    //     //     data.booking.booking_code
    //     //   )}`,
    //     //   { replace: true }
    //     // );
    //   }
    // }

    async function fetchBookingSummary() {
      try {
        setLoading(true);
        setErrorMessage("");

        let apiUrl = "";

        if (bookingCode) {
          apiUrl = `${BACKEND_URL}/api/booking-records/by-code/${encodeURIComponent(
            bookingCode
          )}`;
        } else if (paymentIntentId) {
          apiUrl = `${BACKEND_URL}/api/booking-records/by-payment-intent/${encodeURIComponent(
            paymentIntentId
          )}`;
        } else {
          throw new Error("Missing booking code or payment intent ID.");
        }

        const response = await fetch(apiUrl, {
          method: "GET",
          signal: controller.signal,
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to load booking summary.");
        }

        setBooking(result.booking);
      } catch (error) {
        if (error.name !== "AbortError") {
          setErrorMessage(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    // fetchBookingSummary();

    return () => {
      controller.abort();
    };
  }, [bookingCode, paymentIntentId]);

  if (loading) {
    return (
      <main className="payment-complete-page">
        <section className="payment-card">
          <p className="loading-text">Loading your confirmed booking...</p>
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

  const rooms = booking?.rooms || [];

  return (
    <main className="payment-complete-page">
      <section className="payment-header">
        <div className="success-badge">✓</div>

        <h1>Thank you for your purchase</h1>

        <p>
          Your hotel booking has been confirmed.
          <br />
          Your booking number is{" "}
          <strong>#{booking.booking_code}</strong>
        </p>
      </section>

      <section className="order-summary-card">
        <h2>Order Summary</h2>

        <div className="hotel-summary">
          {booking.hotel_photo_url && (
            <img
              src={booking.hotel_photo_url}
              alt={booking.hotel_name}
              className="hotel-image"
            />
          )}

          <div className="hotel-info">
            <h3>{booking.hotel_name}</h3>
            <p>{booking.hotel_address}</p>

            <p>
              {formatDate(booking.check_in_date)} -{" "}
              {formatDate(booking.check_out_date)}
            </p>

            <p>
              {booking.total_days} night(s), {booking.adult_pax} adult(s),{" "}
              {booking.child_pax} child(s)
            </p>
          </div>
        </div>

        <div className="summary-divider" />

        {rooms.length > 0 ? (
          <div className="room-list">
            {rooms.map((room, index) => (
              <div className="room-row" key={room.room_id || index}>
                <div className="room-left">
                  {room.photo_url && (
                    <img
                      src={room.photo_url}
                      alt={room.room_name}
                      className="room-image"
                    />
                  )}

                  <div>
                    <h4>{room.room_name}</h4>
                    <p>
                      {room.amount} room(s)
                      {room.description ? ` · ${room.description}` : ""}
                    </p>
                  </div>
                </div>

                <strong>
                  {formatMoney(room.subtotal_amount, booking.currency)}
                </strong>
              </div>
            ))}
          </div>
        ) : (
          <div className="room-row">
            <div>
              <h4>{booking.hotel_name}</h4>
              <p>{booking.total_days} night(s)</p>
            </div>

            <strong>
              {formatMoney(booking.total_amount, booking.currency)}
            </strong>
          </div>
        )}

        <div className="summary-divider" />

        <div className="total-row">
          <span>Total</span>
          <strong>
            {formatMoney(booking.total_amount, booking.currency)}
          </strong>
        </div>
      </section>

      <div className="payment-actions">
        <button
          className="outline-button"
          type="button"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>

        <button
          className="primary-button"
          type="button"
          onClick={() => navigate("/my-bookings")}
        >
          View My Bookings
        </button>
      </div>
    </main>
  );
}