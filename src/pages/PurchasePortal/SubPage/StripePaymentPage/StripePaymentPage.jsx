import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

import { useSelector, useDispatch } from "react-redux";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function PurchaseInfoWindow({ bookingRegistry }) {

  const { 
    main_hotel_name,
    main_hotel_address,
    checking_start_end_time,
    guest,
    total_cost,
    select_room_offers
  } = bookingRegistry.main_hotel_booked;

  const { check_in_date, check_out_date, total_days } = checking_start_end_time;
  const { adults, childs } = guest;
  const { grand_total_cost, currency } = total_cost;

  return (
    <div style={styles.summaryBox}>        
      <div>
        <div>
          <h4>{main_hotel_name}</h4>
          <div>{main_hotel_address}</div>
        </div>
        <hr />
        <div>
          { select_room_offers.map((roomObj, index) => {
              const { total_same_rooms_name } = roomObj.base_select_room_description;

              return ( 
                <div key={index}>
                  {total_same_rooms_name}
                </div> 
              );
          })}
        </div>
        <hr />
        <div className="d-flex justify-content-between">
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
        <hr />
        <div className="d-flex justify-content-between">
          <div>
            <div>Adults {adults}</div>
            {childs 
              ? <div>Childs {childs}</div> 
              : ''
            }
          </div>
          <div>
            <div>
              <b>Total</b> 
            </div>
            <h5>
              {currency} {grand_total_cost}
            </h5>
          </div>
        </div>
      </div>
    </div>
  )
}


export default function StripePaymentPage({ bookingRegistry, setSubPage }) {
  const [ clientSecret, setClientSecret ] = useState("");
  const [ loading, setLoading ] = useState(true);
  const [ loadError, setLoadError ] = useState("");

  // console.log('bookingReg_currency:', bookingRegistry.main_hotel_booked.total_cost.currency);

  useEffect(() => {
    async function createPaymentIntent() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/create-payment-intent`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              purchase_total_amount: bookingRegistry.main_hotel_booked.total_cost.grand_total_cost_deceimal, // RM450.00 = 45000 sen
              purchase_currency: bookingRegistry.main_hotel_booked.total_cost.currency,
              booking_Id: bookingRegistry.booking_registry_code,
              bookingRegistry: bookingRegistry
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


    async function ImportIntoDB() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/start-setting-registry-data-in-db`,
          {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bookingRegistry: bookingRegistry
            }),
          }
        );
 
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to Database Post");
        }
      } catch (error) {
        console.error('Database Post Error:', error)
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
        <PurchaseInfoWindow bookingRegistry={bookingRegistry} />
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