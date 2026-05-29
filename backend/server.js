import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import process from "node:process";

dotenv.config({ path: "./backend.env" });

const app = express();
const PORT = process.env.PORT || 5000;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Stripe backend server is running" 
  });
});

app.post("/api/create-payment-intent", async (req, res) => {
  try {
    const { amount, bookingId } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount"
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "myr",
      automatic_payment_methods: {
        enabled: true
      },
      metadata: {
        bookingId: bookingId || "hotel-booking"
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error("PaymentIntent error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create payment intent"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});