import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

import { useSelector, useDispatch } from "react-redux";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function StripePaymentPage({ 
  BookedHotelNMainInfo, objectDateNCalculate, setSubPage 
}) {

  const [ clientSecret, setClientSecret ] = useState("");
  const [ loading, setLoading ] = useState(true);
  const [ loadError, setLoadError ] = useState("");

  const { 
    main_hotel_name,
    main_hotel_address,
    checking_start_end_time,
    guest,
    select_room_offers
  } = useSelector(state => 
    state.PurchasePortal_FinalBookingData.CustomerDetailsnBookingHotelData)
    .main_hotel_booked;

  const { check_in_date, check_out_date, total_days } = checking_start_end_time;



  useEffect(() => {
    async function createPaymentIntent() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/create-payment-intent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: 45000, // RM450.00 = 45000 sen
              currency: "myr",
              bookingId: "BOOKING_TEST_001",
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to create PaymentIntent");
        }

        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Create PaymentIntent error:", error);
        setLoadError(error.message);
      } finally {
        setLoading(false);
      }
    }

    createPaymentIntent();
  }, []);

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  if (loading) {
    return <p>Loading payment form...</p>;
  }

  if (loadError) {
    return <p style={{ color: "red" }}>{loadError}</p>;
  }


  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Final Payment Terminal</h2>
    
        <div style={styles.summaryBox}>
          <h5>Purchase Hotel</h5>
          <div className="d-flex">
            <div>
              <div>{main_hotel_name}</div>
              <p>{main_hotel_address}</p>
            </div>
            <div>
              <div>Check-in Date: {check_in_date}</div>
              <div>Check-out Date: {check_out_date}</div>
            </div>
            <div>
              <div>
                Total Days
              </div>
              <div>
                {total_days}
              </div>
            </div>
          </div>

        </div>

        {clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  card: {
    width: "100%",
    maxWidth: "520px",
    padding: "28px",
    borderRadius: "12px",
    background: "white",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  },
  summaryBox: {
    marginBottom: "24px",
    padding: "16px",
    borderRadius: "8px",
    background: "#fafafa",
    border: "1px solid #e5e5e5",
  },
};