import { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";

export default function PaymentSuccessPage() {
  const stripe = useStripe();
  const [ message, setMessage ] = useState("Checking payment status...");

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search)
      .get("payment_intent_client_secret");

    if (!clientSecret) {
      setMessage("No payment information found.");
      return;
    }

    async function checkPayment() {
      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

      if (paymentIntent.status === "succeeded") {
        setMessage("Payment success!");
        console.log("PaymentIntent:", paymentIntent);
      } else {
        setMessage(`Payment status: ${paymentIntent.status}`);
      }
    }

    checkPayment();
  }, [stripe]);

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
}