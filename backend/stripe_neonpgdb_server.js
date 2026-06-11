import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import process from "node:process";
import pg from 'pg';

dotenv.config({ path: "./backend.env" });

const app = express();
const PORT = process.env.PORT || 5000;
const SERVER_LINK = `http://localhost:${PORT}`;
const { Pool } = pg;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: "10mb" }));

/// STRIPE

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Stripe backend server is running" 
  });
});

app.post("/api/create-payment-intent", async (req, res) => {
  try {
    const { 
      purchase_total_amount, 
      purchase_currency,
      bookingId,
      bookingRegistry
    } = req.body;

    if (!purchase_total_amount || purchase_total_amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount"
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: purchase_total_amount,
      currency: purchase_currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        bookingId,
      },
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

/// NEON POSTGRES DATABASE

const pool = new Pool({
  connectionString: process.env.NEON_PG_SQL_DATABASE_URL,
  ssl: { require: true }
});

async function getPostgresVersion() {
  const client = await pool.connect();
  try {
    const response = await client.query("SELECT version()");
    console.log(response.rows[0]);
  } finally {
    client.release();
  }
}

getPostgresVersion();

// app.post("/api/start-setting-registry-data-in-db", async (req, res) => {
//   try {
//     const { bookingRegistry } = req.body;
//   } catch {

//   }
// })



/// BASE SERVER RUNNING

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});