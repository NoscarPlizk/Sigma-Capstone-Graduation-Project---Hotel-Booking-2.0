import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

// require download package:
// react-bootstrap, react-router-dom, font awesome, @reduxjs/toolkit react-redux, firebase, fast-deep-equal

// Payment package:
// Stripe: @stripe/stripe-js @stripe/react-stripe-js
// Stripe: @paypal/react-paypal-js
{/* <script async src="https://pay.google.com/gp/p/js/pay.js"></script> */}

// Backend Package:
// npm install express, cors, dotenv, stripe

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
