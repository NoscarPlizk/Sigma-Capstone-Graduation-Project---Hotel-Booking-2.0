import { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setMessage("");

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/paymentcomplete`,
      },
    });

    if (result.error) {
      setMessage(result.error.message || "Payment failed");
      setIsProcessing(false);
      return;
    }

    setIsProcessing(false);
  }

  return (
    <form className="stripe-form" onSubmit={handleSubmit}>
      <div className="stripe-payment-element">
        <PaymentElement />
      </div>

      {message ? <p className="stripe-form-message">{message}</p> : null}

      <button
        type="submit"
        className="stripe-submit-button"
        disabled={!stripe || !elements || isProcessing}
      >
        {isProcessing ? "Processing payment..." : "Pay now"}
      </button>
    </form>
  );
}
