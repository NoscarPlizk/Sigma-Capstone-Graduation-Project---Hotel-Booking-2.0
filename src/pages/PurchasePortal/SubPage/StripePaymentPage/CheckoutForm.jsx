import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [ message, setMessage ] = useState("");
  const [ isProcessing, setIsProcessing ] = useState(false);

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
        return_url: `${window.location.origin}/payment-success`,
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
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      {message && (
        <p style={{ color: "red", marginTop: "12px" }}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        style={styles.button}
      >
        {isProcessing ? "Processing..." : "Pay now"}
      </button>
    </form>
  );
}

const styles = {
  button: {
    width: "100%",
    marginTop: "20px",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#635bff",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
};