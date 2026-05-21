import { useState } from "react";
import "./PaymentPortal.css";

function PaymentOption({ type, selectedPayment, setSelectedPayment, icon, label }) {
  const isSelected = selectedPayment === type;

  return (
    <div
      className={`payment-option ${isSelected ? "selected" : ""}`}
      onClick={() => setSelectedPayment(type)}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => setSelectedPayment(type)}
      />

      <div className="payment-icon">{icon}</div>

      <p>{label}</p>
    </div>
  );
}

export default function PaymentPortal() {
  const [selectedPayment, setSelectedPayment] = useState("newCard");

  const [cardData, setCardData] = useState({
    cardholderName: "",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
    saveCard: false,
  });

  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setCardData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleBlur(e) {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  }

  function isEmpty(value) {
    return value.trim() === "";
  }

  function showError(fieldName) {
    return (
      selectedPayment === "newCard" &&
      isEmpty(cardData[fieldName]) &&
      (touched[fieldName] || submitted)
    );
  }

  function handleSubmit() {
    setSubmitted(true);

    if (selectedPayment === "newCard") {
      const requiredFields = [
        "cardholderName",
        "cardNumber",
        "expirationDate",
        "cvc",
      ];

      const hasEmptyField = requiredFields.some((field) =>
        isEmpty(cardData[field])
      );

      if (hasEmptyField) {
        return;
      }
    }

    console.log("Selected payment:", selectedPayment);
    console.log("Card data:", cardData);
  }

  return (
    <div className="payment-page">
      <section className="pay-online-box">
        <h3>Pay online</h3>
        <p>You&apos;ll pay when you complete this booking.</p>

        <div className="small-payment-icons">
          <span>💳</span>
          <span>G Pay</span>
          <span>PayPal</span>
          <span>🔒</span>
        </div>
      </section>

      <section className="payment-box">
        <h2>How do you want to pay?</h2>

        <div className="payment-options">
          <PaymentOption
            type="newCard"
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
            icon="💳"
            label="New card"
          />

          <PaymentOption
            type="googlePay"
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
            icon="G Pay"
            label="Google Pay"
          />

          <PaymentOption
            type="paypal"
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
            icon="PayPal"
            label="PayPal"
          />
        </div>

        {selectedPayment === "newCard" && (
          <div className="new-card-form">
            <h4>New card</h4>

            <div className="card-brands">
              <span>AMEX</span>
              <span>JCB</span>
              <span>DISCOVER</span>
              <span>Mastercard</span>
              <span>VISA</span>
            </div>

            <label>
              Cardholder&apos;s name <span>*</span>
              <div className="input-wrapper">
                <input
                  name="cardholderName"
                  value={cardData.cardholderName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={showError("cardholderName") ? "error" : ""}
                />

                {showError("cardholderName") && (
                  <span className="error-icon">!</span>
                )}
              </div>

              {showError("cardholderName") && (
                <small className="error-message">
                  Enter the cardholder&apos;s name
                </small>
              )}
            </label>

            <label>
              Card number <span>*</span>
              <div className="input-wrapper">
                <input
                  name="cardNumber"
                  value={cardData.cardNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className="input-icon">💳</span>
              </div>
            </label>

            <div className="card-row">
              <label>
                Expiration date <span>*</span>
                <input
                  name="expirationDate"
                  placeholder="MM/YY"
                  value={cardData.expirationDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </label>

              <label>
                CVC <span>*</span>
                <div className="input-wrapper">
                  <input
                    name="cvc"
                    value={cardData.cvc}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="input-icon">💳</span>
                </div>
              </label>
            </div>

            <label className="save-card-row">
              <input
                type="checkbox"
                name="saveCard"
                checked={cardData.saveCard}
                onChange={handleChange}
              />

              <span className="toggle"></span>

              Save card for future purchases
            </label>
          </div>
        )}

        {selectedPayment === "googlePay" && (
          <div className="external-payment-box">
            <h4>Google Pay</h4>
            <p>You will continue with Google Pay when completing the booking.</p>
          </div>
        )}

        {selectedPayment === "paypal" && (
          <div className="external-payment-box">
            <h4>PayPal</h4>
            <p>You will continue with PayPal when completing the booking.</p>
          </div>
        )}

        <button className="continue-button" onClick={handleSubmit}>
          Complete booking
        </button>
      </section>
    </div>
  );
}