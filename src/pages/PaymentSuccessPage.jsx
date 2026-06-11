import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function PaymentSuccessPage() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    async function checkPaymentStatus() {
      const params = new URLSearchParams(window.location.search);
      const clientSecret = params.get("payment_intent_client_secret");

      if (!clientSecret) {
        setStatus("missing_client_secret");
        return;
      }

      const stripe = await stripePromise;

      const { paymentIntent, error } = await stripe.retrievePaymentIntent(
        clientSecret
      );

      if (error) {
        console.error(error);
        setStatus("error");
        return;
      }

      setStatus(paymentIntent.status);
    }

    checkPaymentStatus();
  }, []);

  if (status === "checking") {
    return <h2>Checking payment status...</h2>;
  }

  if (status === "succeeded") {
    return <h2>Payment success! Your booking is confirmed.</h2>;
  }

  if (status === "processing") {
    return <h2>Your payment is processing. Please wait.</h2>;
  }

  if (status === "requires_payment_method") {
    return <h2>Payment failed. Please try another payment method.</h2>;
  }

  return <h2>Payment status: {status}</h2>;
}