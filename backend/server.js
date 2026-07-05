import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import process from "node:process";
import pg from "pg";

import { ReportBackendRuning } from "./routes/backendRuningRoutes.js";
import { registerPaymentRoutes } from "./routes/paymentRoutes.js";
import { registerBookingRoutes } from "./routes/Neon_Database/bookingRoutes.js";

dotenv.config({ path: "./backend.env" });

const app = express();
const PORT = process.env.PORT || 5000;
const { Pool } = pg;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: "10mb" }));

const pool = new Pool({
  connectionString: process.env.NEON_PG_SQL_DATABASE_URL,
  ssl: { require: true },
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
ReportBackendRuning(app);

registerPaymentRoutes(app, { stripe });
registerBookingRoutes(app, { pool, stripe });

/// BASE SERVER RUNNING

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
