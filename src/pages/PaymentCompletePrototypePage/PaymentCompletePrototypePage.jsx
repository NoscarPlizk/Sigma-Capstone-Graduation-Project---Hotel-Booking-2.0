import { useNavigate } from "react-router-dom";
import "./PaymentCompletePrototypePage.css";

const sampleBookingData = {
  booking_code: "BK-705398-20260621-20260628-0001",
  hotel_name: "Hilton Kuala Lumpur",
  hotel_address: "3 Jalan Stesen Sentral, Kuala Lumpur Sentral",
  check_in_date: "2026-06-21",
  check_out_date: "2026-06-28",
  total_days: 7,
  adult_pax: 2,
  child_pax: 1,
  currency: "MYR",
  total_amount: 2161.24,
  hotel_image:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500",

  rooms: [
    {
      room_id: "ROOM-001",
      room_name: "Deluxe King Room",
      room_image:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500",
      amount: 1,
      description: "Breakfast included · Non-refundable",
      subtotal_amount: 1260.5,
    },
    {
      room_id: "ROOM-002",
      room_name: "Superior Twin Room",
      room_image:
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500",
      amount: 1,
      description: "Free cancellation · City view",
      subtotal_amount: 900.74,
    },
  ],
};

function formatMoney(amount, currency = "MYR") {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency,
  }).format(Number(amount || 0));
}

function formatDate(dateValue) {
  return new Date(dateValue).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function PaymentCompletePrototypePage() {
  const navigate = useNavigate();

  const booking = sampleBookingData;

  return (
    <main className="payment-complete-prototype-page">
      <section className="payment-complete-header">
        <div className="success-badge">✓</div>

        <h1>Thank you for your purchase</h1>

        <p>
          Your hotel booking has been confirmed.
          <br />
          Your booking number is <strong>#{booking.booking_code}</strong>
        </p>
      </section>

      <section className="order-summary-card">
        <h2>Order Summary</h2>

        <div className="hotel-summary">
          <img
            src={booking.hotel_image}
            alt={booking.hotel_name}
            className="hotel-image"
          />

          <div className="hotel-info">
            <h3>{booking.hotel_name}</h3>

            <p>{booking.hotel_address}</p>

            <p>
              {formatDate(booking.check_in_date)} -{" "}
              {formatDate(booking.check_out_date)}
            </p>

            <p>
              {booking.total_days} night(s) · {booking.adult_pax} adult(s) ·{" "}
              {booking.child_pax} child(s)
            </p>
          </div>
        </div>

        <div className="summary-divider" />

        <div className="room-list">
          {booking.rooms.map((room) => (
            <div className="room-row" key={room.room_id}>
              <div className="room-left">
                <img
                  src={room.room_image}
                  alt={room.room_name}
                  className="room-image"
                />

                <div>
                  <h4>{room.room_name}</h4>

                  <p>
                    {room.amount} room(s) · {room.description}
                  </p>
                </div>
              </div>

              <strong>{formatMoney(room.subtotal_amount, booking.currency)}</strong>
            </div>
          ))}
        </div>

        <div className="summary-divider" />

        <div className="total-row">
          <span>Total</span>
          <strong>{formatMoney(booking.total_amount, booking.currency)}</strong>
        </div>
      </section>

      <div className="payment-complete-actions">
        <button
          type="button"
          className="outline-button"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>

        <button
          type="button"
          className="primary-button"
          onClick={() => navigate("/all-booked-list")}
        >
          View My Bookings
        </button>
      </div>
    </main>
  );
}