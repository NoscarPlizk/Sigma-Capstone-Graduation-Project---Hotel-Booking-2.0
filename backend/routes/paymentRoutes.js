import { extractBookingData, pickFirst } from "./Neon_Database/bookingDbHelpers.js";

export function registerPaymentRoutes(app, { stripe }) {
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const {
        purchase_total_amount,
        purchase_currency,
        booking_Id,
        bookingRegistry,
      } = req.body;

      const bookingData = bookingRegistry
        ? extractBookingData(bookingRegistry)
        : null;

      const stripeAmount = Number(
        pickFirst(purchase_total_amount, bookingData?.totalAmount)
      );

      const stripeCurrency = String(
        pickFirst(purchase_currency, bookingData?.currency, "myr")
      ).toLowerCase();

      if (!Number.isInteger(stripeAmount) || stripeAmount <= 0) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid amount. Send purchase_total_amount in the smallest currency unit, or send bookingRegistry.total_cost.grand_total_cost_deceimal.",
        });
      }

      const metadata = {};
      const addMetadata = (key, value) => {
        if (value !== undefined && value !== null && value !== "") {
          metadata[key] = String(value).slice(0, 500);
        }
      };

      addMetadata(
        "booking_Id",
        pickFirst(booking_Id, bookingData?.bookingRegistryCode)
      );
      addMetadata("booking_registry_code", bookingData?.bookingRegistryCode);
      addMetadata("hotel_id", bookingData?.hotelId);
      addMetadata("check_in_date", bookingData?.checkInDate);
      addMetadata("check_out_date", bookingData?.checkOutDate);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: stripeAmount,
        currency: stripeCurrency,
        automatic_payment_methods: { enabled: true },
        metadata,
      });

      res.json({
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      });
    } catch (error) {
      console.error("PaymentIntent error:", error.message);

      res.status(500).json({
        success: false,
        message: "Failed to create payment intent",
        error: error.message,
      });
    }
  });
}
