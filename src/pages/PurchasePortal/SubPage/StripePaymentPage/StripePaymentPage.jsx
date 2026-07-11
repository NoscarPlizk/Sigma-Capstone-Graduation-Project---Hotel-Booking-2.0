import { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./StripePaymentPage.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function formatPrice(amount, currency) {
  const numericAmount = Number(amount ?? 0);
  return `${currency} ${Number.isFinite(numericAmount) ? numericAmount.toFixed(2) : "0.00"}`;
}

function PurchaseInfoWindow({ bookingRegistry }) {
  const {
    main_hotel_name,
    main_hotel_address,
    checking_start_end_time,
    guest,
    total_cost,
    select_room_offers,
  } = bookingRegistry.main_hotel_booked;

  const totalRoomCount = select_room_offers.reduce(
    (sum, roomGroup) => sum + (roomGroup?.base_select_room?.length ?? 0),
    0
  );

  return (
    <section className="stripe-summary-card">
      <div className="stripe-summary-head">
        <div>
          <p className="purchase-eyebrow">Payment summary</p>
          <h3>{main_hotel_name}</h3>
          <p className="stripe-summary-address">{main_hotel_address}</p>
        </div>
        <span className="purchase-pill">
          {totalRoomCount} room{totalRoomCount > 1 ? "s" : ""}
        </span>
      </div>

      <div className="stripe-summary-grid">
        <div className="stripe-summary-metric">
          <span>Check-in</span>
          <strong>{checking_start_end_time.check_in_date}</strong>
        </div>
        <div className="stripe-summary-metric">
          <span>Check-out</span>
          <strong>{checking_start_end_time.check_out_date}</strong>
        </div>
        <div className="stripe-summary-metric">
          <span>Stay length</span>
          <strong>{checking_start_end_time.total_days} nights</strong>
        </div>
        <div className="stripe-summary-metric">
          <span>Guests</span>
          <strong>
            {guest.adults} adult{Number(guest.adults) > 1 ? "s" : ""}
            {Number(guest.childs) > 0
              ? `, ${guest.childs} child${Number(guest.childs) > 1 ? "ren" : ""}`
              : ""}
          </strong>
        </div>
      </div>

      <div className="stripe-summary-room-list">
        {select_room_offers.map((roomObj, index) => {
          const description =
            roomObj?.base_select_room_description?.total_same_rooms_name ??
            roomObj?.base_room_name ??
            "Room option";
          const roomCount = roomObj?.base_select_room?.length ?? 0;

          return (
            <div key={`${description}-${index}`} className="stripe-summary-room-item">
              <strong>{description}</strong>
              <span>
                {roomCount} room{roomCount > 1 ? "s" : ""}
              </span>
            </div>
          );
        })}
      </div>

      <div className="stripe-summary-total">
        <span>Total payable</span>
        <strong>
          {formatPrice(total_cost.grand_total_cost, total_cost.currency)}
        </strong>
      </div>
    </section>
  );
}

export default function StripePaymentPage({ bookingRegistry, setSubPage }) {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function createPaymentIntent() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/create-payment-intent`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              purchase_total_amount:
                bookingRegistry.main_hotel_booked.total_cost.grand_total_cost_deceimal,
              purchase_currency:
                bookingRegistry.main_hotel_booked.total_cost.currency,
              booking_Id: bookingRegistry.booking_registry_code,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to create PaymentIntent");
        }

        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);

        sessionStorage.setItem(
          `bookingRegistry:${data.paymentIntentId}`,
          JSON.stringify(bookingRegistry)
        );
      } catch (error) {
        console.error("Create PaymentIntent error:", error);
        setLoadError(error.message);
      } finally {
        setLoading(false);
      }
    }

    createPaymentIntent();
  }, [bookingRegistry]);

  const options = useMemo(
    () => ({
      clientSecret,
      appearance: {
        theme: "stripe",
      },
    }),
    [clientSecret]
  );

  if (loading) {
    return (
      <div className="stripe-loading-card">
        <p className="purchase-eyebrow">Preparing payment</p>
        <h3>Loading your secure payment form</h3>
        <p className="purchase-section-copy">
          Your booking summary is ready. Stripe is setting up the final payment
          step now.
        </p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="stripe-error-card">
        <p className="purchase-eyebrow">Payment unavailable</p>
        <h3>We could not start the payment step</h3>
        <p className="purchase-section-copy">{loadError}</p>
        <button
          type="button"
          className="stripe-back-button"
          onClick={() => setSubPage("GuestnHotelDetailsPortal")}
        >
          Back to guest details
        </button>
      </div>
    );
  }

  return (
    <section className="stripe-step-card">
      <div className="stripe-step-header">
        <div>
          <p className="purchase-eyebrow">Secure payment</p>
          <h2>Confirm and pay</h2>
          <p className="purchase-section-copy">
            The booking record will be finalized after this payment succeeds.
          </p>
        </div>

        <button
          type="button"
          className="stripe-back-button"
          onClick={() => setSubPage("GuestnHotelDetailsPortal")}
        >
          Back
        </button>
      </div>

      <PurchaseInfoWindow bookingRegistry={bookingRegistry} />

      {clientSecret ? (
        <div className="stripe-elements-shell">
          <div className="stripe-elements-head">
            <h3>Payment method</h3>
            <p className="purchase-section-copy">
              All payment details are handled securely by Stripe.
            </p>
          </div>

          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm paymentIntentId={paymentIntentId} />
          </Elements>
        </div>
      ) : null}
    </section>
  );
}
