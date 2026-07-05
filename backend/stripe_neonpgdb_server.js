import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import process from "node:process";
import pg from 'pg';

import {
  pickFirst,
  makeUserRefCode,
  extractBookingData,
  formatDateCode,
  getRoomOffers,
  getOfferAmount,
  getOfferStableId,
  getRoomGroupDescription,
  getOfferPricePerRoom,
  getOfferTotalPrice,
  getOfferMealPlan,
  getOfferCancellationPolicy,
  getOfferPaymentType,
} from "./bookingDbHelpers.js";

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
        message: "Invalid amount. Send purchase_total_amount in the smallest currency unit, or send bookingRegistry.total_cost.grand_total_cost_deceimal.",
      });
    }

    const metadata = {};
    const addMetadata = (key, value) => {
      if (value !== undefined && value !== null && value !== "") {
        metadata[key] = String(value).slice(0, 500);
      }
    };

    addMetadata("booking_Id", pickFirst(booking_Id, bookingData?.bookingRegistryCode));
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

function parseBookingRegistryJson(bookingRegistryJson) {
  if (!bookingRegistryJson) return {};

  if (typeof bookingRegistryJson === "object") {
    return bookingRegistryJson;
  }

  try {
    return JSON.parse(bookingRegistryJson);
  } catch {
    return {};
  }
}

function convertFromSmallestUnit(amount) {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return 0;
  }

  return numericAmount / 100;
}

function buildBookingSummary(bookingRow, roomRows) {
  const bookingRegistryJson = parseBookingRegistryJson(
    bookingRow.booking_registry_json
  );

  const hotelBooked = pickFirst(
    bookingRegistryJson?.main_hotel_booked,
    bookingRegistryJson?.CustomerDetailsnBookingHotelData?.main_hotel_booked,
    {}
  );

  const rawHotelData = pickFirst(
    hotelBooked?.rawjsondata,
    hotelBooked?.rawJsonData,
    hotelBooked?.raw_json_data,
    {}
  );

  const hotelPhotoUrl = pickFirst(
    rawHotelData?.photoUrls?.[0],
    rawHotelData?.photo_url,
    rawHotelData?.main_photo_url,
    hotelBooked?.select_room_offers?.[0]?.base_main_photos
  );

  return {
    booking_code: bookingRow.booking_code,
    hotel_name: bookingRow.hotel_name,
    hotel_address: bookingRow.hotel_address,
    hotel_photo_url: hotelPhotoUrl ?? null,
    check_in_date: bookingRow.check_in_date,
    check_out_date: bookingRow.check_out_date,
    total_days: Number(bookingRow.total_days ?? 0),
    adult_pax: Number(bookingRow.adult_pax ?? 0),
    child_pax: Number(bookingRow.child_pax ?? 0),
    currency: String(bookingRow.currency ?? "MYR").toUpperCase(),
    total_amount: convertFromSmallestUnit(bookingRow.total_amount),
    rooms: roomRows.map((roomRow) => ({
      room_name: roomRow.room_name,
      amount: Number(roomRow.amount ?? 0),
      subtotal_amount: convertFromSmallestUnit(roomRow.subtotal_amount),
    })),
  };
}

async function findBookingSummary(client, lookupQuery, params) {
  const bookingResult = await client.query(lookupQuery, params);

  if (bookingResult.rowCount === 0) {
    return null;
  }

  const bookingRow = bookingResult.rows[0];

  const roomsResult = await client.query(
    `
    SELECT
      brg.room_group_id,
      brg.base_room_name AS room_name,
      COALESCE(
        brg.base_select_room_total_amount,
        SUM(bro.amount),
        0
      ) AS amount,
      COALESCE(SUM(bro.total_offer_price), 0) AS subtotal_amount
    FROM booking_room_groups brg
    LEFT JOIN booking_room_offers bro
      ON bro.room_group_id = brg.room_group_id
    WHERE brg.booking_id = $1
    GROUP BY
      brg.room_group_id,
      brg.base_room_name,
      brg.base_select_room_total_amount
    ORDER BY brg.room_group_id ASC
    `,
    [bookingRow.booking_id]
  );

  return buildBookingSummary(bookingRow, roomsResult.rows);
}

async function findExistingBookingByPaymentIntent(client, paymentIntentId) {
  const existingBookingResult = await client.query(
    `
    SELECT
      bp.booking_id,
      br.booking_code,
      br.firebase_uid
    FROM booking_payments bp
    INNER JOIN booking_records br
      ON br.booking_id = bp.booking_id
    WHERE bp.stripe_payment_intent_id = $1
    LIMIT 1
    `,
    [paymentIntentId]
  );

  if (existingBookingResult.rowCount === 0) {
    return null;
  }

  return existingBookingResult.rows[0];
}

app.post("/api/start-setting-registry-data-in-db", async (req, res) => {
  const client = await pool.connect();
  let transactionStarted = false;

  try {
    const {
      firebaseUser,
      bookingRegistry,
      stripePaymentIntentId
    } = req.body;

    console.log('req.body in dbprocess', req.body);

    if (!firebaseUser?.firebase_uid) {
      return res.status(400).json({
        success: false,
        message: "Missing firebaseUser.firebase_uid",
      });
    }

    if (!bookingRegistry) {
      return res.status(400).json({
        success: false,
        message: "Missing bookingRegistry",
      });
    }

    if (!stripePaymentIntentId) {
      return res.status(400).json({
        success: false,
        message: "Missing stripePaymentIntentId",
      });
    }

    const firebaseUid = firebaseUser.firebase_uid;
    const userRefCode = makeUserRefCode(firebaseUid);

    const bookingData = extractBookingData(bookingRegistry);

    if (!bookingData.hotelId) {
      return res.status(400).json({
        success: false,
        message: "Missing hotel_id inside bookingRegistry",
      });
    }

    // bookingRegistry.CustomerDetailsnBookingHotelData.main_hotel_booked.rawjsondata.hotel_id

    if (!bookingData.checkInDate || !bookingData.checkOutDate) {
      return res.status(400).json({
        success: false,
        message: "Missing check-in or check-out date inside bookingRegistry",
      });
    }

    // Verify Stripe payment before saving booking.
    const paymentIntent = await stripe.paymentIntents.retrieve(
      stripePaymentIntentId,
      {
        expand: ["latest_charge"],
      }
    );

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        success: false,
        message: "Stripe payment is not completed yet",
        paymentStatus: paymentIntent.status,
      });
    }

    const existingBooking = await findExistingBookingByPaymentIntent(
      client,
      paymentIntent.id
    );

    if (existingBooking) {

      return res.json({
        success: true,
        message: "Booking data already exists for this Stripe payment intent",
        bookingId: existingBooking.booking_id,
        bookingCode: existingBooking.booking_code,
        firebaseUid: existingBooking.firebase_uid ?? firebaseUid,
        stripePaymentIntentId: paymentIntent.id,
        alreadyImported: true,
      });
    }

    await client.query("BEGIN");
    transactionStarted = true;

    // 1. Insert or update Firebase user record
    const firebaseUserResult = await client.query(
      `
      INSERT INTO firebase_users (
        firebase_uid,
        email,
        display_name,
        phone_number,
        photo_url,
        user_ref_code,
        updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      ON CONFLICT (firebase_uid)
      DO UPDATE SET
        email = EXCLUDED.email,
        display_name = EXCLUDED.display_name,
        phone_number = EXCLUDED.phone_number,
        photo_url = EXCLUDED.photo_url,
        updated_at = NOW()
      RETURNING firebase_uid, user_ref_code
      `,
      [
        firebaseUid,
        firebaseUser.email ?? null,
        firebaseUser.display_name ?? null,
        firebaseUser.phone_number ?? null,
        firebaseUser.photo_url ?? null,
        userRefCode,
      ]
    );

    const savedUserRefCode = firebaseUserResult.rows[0].user_ref_code;

    // 2. Generate booking sequence
    const sequenceResult = await client.query(
      `
      INSERT INTO booking_code_counters (
        firebase_uid,
        hotel_id,
        check_in_date,
        check_out_date,
        last_sequence
      )
      VALUES ($1, $2, $3, $4, 1)
      ON CONFLICT (
        firebase_uid,
        hotel_id,
        check_in_date,
        check_out_date
      )
      DO UPDATE SET
        last_sequence = booking_code_counters.last_sequence + 1,
        updated_at = NOW()
      RETURNING last_sequence
      `,
      [
        firebaseUid,
        bookingData.hotelId,
        bookingData.checkInDate,
        bookingData.checkOutDate,
      ]
    );

    const sequenceNo = sequenceResult.rows[0].last_sequence;
    const sequenceCode = String(sequenceNo).padStart(4, "0");

    const checkInCode = formatDateCode(bookingData.checkInDate);
    const checkOutCode = formatDateCode(bookingData.checkOutDate);

    const bookingCode = `BK-${bookingData.hotelId}-${savedUserRefCode}-${checkInCode}-${checkOutCode}-${sequenceCode}`;

    // 3. Insert main booking record
    const bookingResult = await client.query(
      `
      INSERT INTO booking_records (
        booking_code,
        firebase_uid,
        hotel_id,
        hotel_name,
        hotel_address,
        check_in_date,
        check_out_date,
        total_days,
        adult_pax,
        child_pax,
        currency,
        total_amount,
        booking_status,
        payment_status,
        booking_registry_json
      )
      VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, 'confirmed',
        'paid', $13::jsonb
      )
      RETURNING booking_id, booking_code
      `,
      [
        bookingCode,
        firebaseUid,
        bookingData.hotelId,
        bookingData.hotelName,
        bookingData.hotelAddress,
        bookingData.checkInDate,
        bookingData.checkOutDate,
        bookingData.totalDays,
        bookingData.adultPax,
        bookingData.childPax,
        paymentIntent.currency,
        paymentIntent.amount,
        JSON.stringify(bookingRegistry),
      ]
    );

    const bookingId = bookingResult.rows[0].booking_id;

    // 4. Insert guest information
    await client.query(
      `
      INSERT INTO booking_guests (
        booking_id,
        first_name,
        last_name,
        email,
        country_code,
        country_name,
        country_region,
        phone_number,
        booking_for_type,
        company_name,
        company_tax_id,
        special_request
      )
      VALUES (
        $1, $2, $3, $4,
        $5, $6, $7, $8,
        $9, $10, $11, $12
      )
      `,
      [
        bookingId,
        bookingData.guest.firstName,
        bookingData.guest.lastName,
        bookingData.guest.email,
        bookingData.guest.countryCode,
        bookingData.guest.countryName,
        bookingData.guest.countryRegion,
        bookingData.guest.phoneNumber,
        bookingData.guest.bookingForType,
        bookingData.guest.companyName,
        bookingData.guest.companyTaxId,
        bookingData.guest.specialRequest,
      ]
    );

    // 5. Insert selected room groups and offers
    for (const roomGroup of bookingData.selectedRooms) {
      const roomOffers = getRoomOffers(roomGroup);

      const totalRoomAmount = roomOffers.reduce((total, offer) => {
        return total + getOfferAmount(offer);
      }, 0);

      const roomGroupResult = await client.query(
        `
        INSERT INTO booking_room_groups (
          booking_id,
          base_room_id,
          base_room_name,
          base_room_surface_m2,
          base_main_photo,
          base_select_room_total_amount,
          base_select_room_description
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7
        )
        RETURNING room_group_id
        `,
        [
          bookingId,
          pickFirst(roomGroup?.base_room_id, roomGroup?.baseRoomId),
          pickFirst(roomGroup?.base_room_name, roomGroup?.baseRoomName),
          pickFirst(
            roomGroup?.base_room_surface_m2,
            roomGroup?.baseRoomSurfaceM2
          ),
          pickFirst(
            roomGroup?.base_main_photos,
            roomGroup?.base_main_photo,
            roomGroup?.baseMainPhoto
          ),
          pickFirst(
            roomGroup?.base_select_room_total_amount,
            roomGroup?.baseSelectRoomTotalAmount,
            totalRoomAmount
          ),
          getRoomGroupDescription(roomGroup),
        ]
      );

      const roomGroupId = roomGroupResult.rows[0].room_group_id;

      for (const offer of roomOffers) {
        const amount = getOfferAmount(offer);
        const pricePerRoom = getOfferPricePerRoom(offer);
        const totalOfferPrice = getOfferTotalPrice(offer);

        await client.query(
          `
          INSERT INTO booking_room_offers (
            room_group_id,
            offer_id,
            offer_name,
            amount,
            price_per_room,
            total_offer_price,
            currency,
            meal_plan,
            cancellation_policy,
            payment_type,
            offer_json
          )
          VALUES (
            $1, $2, $3,
            $4, $5, $6,
            $7, $8, $9, $10,
            $11::jsonb
          )
          `,
          [
            roomGroupId,
            getOfferStableId(offer),
            pickFirst(
              offer?.offer_name,
              offer?.offerName,
              offer?.name,
              offer?.spec_room_data?.name
            ),
            amount,
            pricePerRoom,
            totalOfferPrice,
            paymentIntent.currency,
            getOfferMealPlan(offer),
            getOfferCancellationPolicy(offer),
            getOfferPaymentType(offer),
            JSON.stringify(offer),
          ]
        );
      }
    }

    // 6. Insert Stripe payment record
    const latestCharge =
      typeof paymentIntent.latest_charge === "object"
        ? paymentIntent.latest_charge
        : null;

    await client.query(
      `
      INSERT INTO booking_payments (
        booking_id,
        stripe_payment_intent_id,
        stripe_client_secret,
        amount,
        currency,
        payment_status,
        payment_method,
        receipt_url,
        stripe_response_json
      )
      VALUES (
        $1, $2, $3,
        $4, $5,
        $6, $7, $8,
        $9::jsonb
      )
      `,
      [
        bookingId,
        paymentIntent.id,
        paymentIntent.client_secret,
        paymentIntent.amount,
        paymentIntent.currency,
        paymentIntent.status,
        typeof paymentIntent.payment_method === "string"
          ? paymentIntent.payment_method
          : null,
        latestCharge?.receipt_url ?? null,
        JSON.stringify(paymentIntent),
      ]
    );

    await client.query("COMMIT");

    res.json({
      success: true,
      message: "Booking data inserted into Neon PostgreSQL successfully",
      bookingId,
      bookingCode,
      firebaseUid,
      stripePaymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    if (transactionStarted) {
      await client.query("ROLLBACK");
    }

    if (
      error?.code === "23505" &&
      error?.constraint === "booking_payments_stripe_payment_intent_id_key"
    ) {
      const existingBooking = await findExistingBookingByPaymentIntent(
        client,
        req.body?.stripePaymentIntentId
      );

      if (existingBooking) {
        return res.json({
          success: true,
          message: "Booking data already exists for this Stripe payment intent",
          bookingId: existingBooking.booking_id,
          bookingCode: existingBooking.booking_code,
          firebaseUid: existingBooking.firebase_uid ?? req.body?.firebaseUser?.firebase_uid,
          stripePaymentIntentId: req.body?.stripePaymentIntentId,
          alreadyImported: true,
        });
      }
    }

    console.error("Database insert error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to insert booking data into Neon PostgreSQL",
      error: error.message,
    });
  } finally {
    client.release();
    
  }
});

app.get("/api/booking-records/by-payment-intent/:paymentIntentId", async (req, res) => {
  const client = await pool.connect();

  try {
    const booking = await findBookingSummary(
      client,
      `
      SELECT
        br.booking_id,
        br.booking_code,
        br.hotel_name,
        br.hotel_address,
        br.check_in_date,
        br.check_out_date,
        br.total_days,
        br.adult_pax,
        br.child_pax,
        br.currency,
        br.total_amount,
        br.booking_registry_json
      FROM booking_records br
      INNER JOIN booking_payments bp
        ON bp.booking_id = br.booking_id
      WHERE bp.stripe_payment_intent_id = $1
      LIMIT 1
      `,
      [req.params.paymentIntentId]
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking record was not found for this payment intent.",
      });
    }

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("Booking summary by payment intent error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch booking summary by payment intent.",
      error: error.message,
    });
  } finally {
    client.release();
  }
});

app.get("/api/booking-records/by-code/:bookingCode", async (req, res) => {
  const client = await pool.connect();

  try {
    const booking = await findBookingSummary(
      client,
      `
      SELECT
        booking_id,
        booking_code,
        hotel_name,
        hotel_address,
        check_in_date,
        check_out_date,
        total_days,
        adult_pax,
        child_pax,
        currency,
        total_amount,
        booking_registry_json
      FROM booking_records
      WHERE booking_code = $1
      LIMIT 1
      `,
      [req.params.bookingCode]
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking record was not found for this booking code.",
      });
    }

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("Booking summary by code error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch booking summary by booking code.",
      error: error.message,
    });
  } finally {
    client.release();
  }
});

/// BASE SERVER RUNNING

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
