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

    const existingBookingResult = await client.query(
      `
      SELECT
        bp.booking_id,
        br.booking_code
      FROM booking_payments bp
      INNER JOIN booking_records br
        ON br.booking_id = bp.booking_id
      WHERE bp.stripe_payment_intent_id = $1
      LIMIT 1
      `,
      [paymentIntent.id]
    );

    if (existingBookingResult.rowCount > 0) {
      const existingBooking = existingBookingResult.rows[0];

      return res.json({
        success: true,
        message: "Booking data already exists for this Stripe payment intent",
        bookingId: existingBooking.booking_id,
        bookingCode: existingBooking.booking_code,
        firebaseUid,
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

/// BASE SERVER RUNNING

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import Stripe from "stripe";
// import process from "node:process";
// import pg from 'pg';

// import {
//   pickFirst,
//   makeUserRefCode,
//   extractBookingData,
//   formatDateCode,
//   getRoomOffers,
//   getOfferPricePerRoom,
//   getOfferTotalPrice,
// } from "./bookingDbHelpers.js";

// dotenv.config({ path: "./backend.env" });

// const app = express();
// const PORT = process.env.PORT || 5000;
// const SERVER_LINK = `http://localhost:${PORT}`;
// const { Pool } = pg;

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// app.use(cors({ origin: "http://localhost:5173" }));
// app.use(express.json({ limit: "10mb" }));

// /// STRIPE

// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "Stripe backend server is running" 
//   });
// });

// app.post("/api/create-payment-intent", async (req, res) => {
//   try {
//     const { 
//       purchase_total_amount, 
//       purchase_currency,
//       booking_Id,
//       bookingRegistry
//     } = req.body;

//     if (!purchase_total_amount || purchase_total_amount <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid amount"
//       });
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: purchase_total_amount,
//       currency: purchase_currency,
//       automatic_payment_methods: { enabled: true, },
//       metadata: { booking_Id, },
//     });

//     res.json({
//       success: true,
//       clientSecret: paymentIntent.client_secret,
//       paymentIntentId: paymentIntent.id,
//     });
    
//   } catch (error) {
//     console.error("PaymentIntent error:", error.message);

//     res.status(500).json({
//       success: false,
//       message: "Failed to create payment intent"
//     });
//   }
// });

// /// NEON POSTGRES DATABASE

// const pool = new Pool({
//   connectionString: process.env.NEON_PG_SQL_DATABASE_URL,
//   ssl: { require: true }
// });

// async function getPostgresVersion() {
//   const client = await pool.connect();
//   try {
//     const response = await client.query("SELECT version()");
//     console.log(response.rows[0]);
//   } finally {
//     client.release();
//   }
// }

// getPostgresVersion();

// app.post("/api/start-setting-registry-data-in-db", async (req, res) => {
//   const client = await pool.connect();

//   try {
//     const {
//       firebaseUser,
//       bookingRegistry,
//       stripePaymentIntentId
//     } = req.body;

//     if (!firebaseUser?.firebase_uid) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing firebaseUser.firebase_uid",
//       });
//     }

//     if (!bookingRegistry) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing bookingRegistry",
//       });
//     }

//     if (!stripePaymentIntentId) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing stripePaymentIntentId",
//       });
//     }

//     const firebaseUid = firebaseUser.firebase_uid;
//     const userRefCode = makeUserRefCode(firebaseUid);

//     const bookingData = extractBookingData(bookingRegistry);

//     if (!bookingData.hotelId) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing hotel_id inside bookingRegistry",
//       });
//     }

//     if (!bookingData.checkInDate || !bookingData.checkOutDate) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing check-in or check-out date inside bookingRegistry",
//       });
//     }

//     // Verify Stripe payment before saving booking.
//     const paymentIntent = await stripe.paymentIntents.retrieve(
//       stripePaymentIntentId,
//       {
//         expand: ["latest_charge"],
//       }
//     );

//     if (paymentIntent.status !== "succeeded") {
//       return res.status(400).json({
//         success: false,
//         message: "Stripe payment is not completed yet",
//         paymentStatus: paymentIntent.status,
//       });
//     }

//     await client.query("BEGIN");

//     // 1. Insert or update Firebase user record
//     const firebaseUserResult = await client.query(
//       `
//       INSERT INTO firebase_users (
//         firebase_uid,
//         email,
//         display_name,
//         phone_number,
//         photo_url,
//         user_ref_code,
//         updated_at
//       )
//       VALUES ($1, $2, $3, $4, $5, $6, NOW())
//       ON CONFLICT (firebase_uid)
//       DO UPDATE SET
//         email = EXCLUDED.email,
//         display_name = EXCLUDED.display_name,
//         phone_number = EXCLUDED.phone_number,
//         photo_url = EXCLUDED.photo_url,
//         updated_at = NOW()
//       RETURNING firebase_uid, user_ref_code
//       `,
//       [
//         firebaseUid,
//         firebaseUser.email ?? null,
//         firebaseUser.display_name ?? null,
//         firebaseUser.phone_number ?? null,
//         firebaseUser.photo_url ?? null,
//         userRefCode,
//       ]
//     );

//     const savedUserRefCode = firebaseUserResult.rows[0].user_ref_code;

//     // 2. Generate booking sequence
//     const sequenceResult = await client.query(
//       `
//       INSERT INTO booking_code_counters (
//         firebase_uid,
//         hotel_id,
//         check_in_date,
//         check_out_date,
//         last_sequence
//       )
//       VALUES ($1, $2, $3, $4, 1)
//       ON CONFLICT (
//         firebase_uid,
//         hotel_id,
//         check_in_date,
//         check_out_date
//       )
//       DO UPDATE SET
//         last_sequence = booking_code_counters.last_sequence + 1,
//         updated_at = NOW()
//       RETURNING last_sequence
//       `,
//       [
//         firebaseUid,
//         bookingData.hotelId,
//         bookingData.checkInDate,
//         bookingData.checkOutDate,
//       ]
//     );

//     const sequenceNo = sequenceResult.rows[0].last_sequence;
//     const sequenceCode = String(sequenceNo).padStart(4, "0");

//     const checkInCode = formatDateCode(bookingData.checkInDate);
//     const checkOutCode = formatDateCode(bookingData.checkOutDate);

//     const bookingCode = `BK-${bookingData.hotelId}-${savedUserRefCode}-${checkInCode}-${checkOutCode}-${sequenceCode}`;

//     // 3. Insert main booking record
//     const bookingResult = await client.query(
//       `
//       INSERT INTO booking_records (
//         booking_code,
//         firebase_uid,
//         hotel_id,
//         hotel_name,
//         hotel_address,
//         check_in_date,
//         check_out_date,
//         total_days,
//         adult_pax,
//         child_pax,
//         currency,
//         total_amount,
//         booking_status,
//         payment_status,
//         booking_registry_json
//       )
//       VALUES (
//         $1, $2, $3, $4, $5,
//         $6, $7, $8, $9, $10,
//         $11, $12, 'confirmed',
//         'paid', $13::jsonb
//       )
//       RETURNING booking_id, booking_code
//       `,
//       [
//         bookingCode,
//         firebaseUid,
//         bookingData.hotelId,
//         bookingData.hotelName,
//         bookingData.hotelAddress,
//         bookingData.checkInDate,
//         bookingData.checkOutDate,
//         bookingData.totalDays,
//         bookingData.adultPax,
//         bookingData.childPax,
//         paymentIntent.currency,
//         paymentIntent.amount,
//         JSON.stringify(bookingRegistry),
//       ]
//     );

//     const bookingId = bookingResult.rows[0].booking_id;

//     // 4. Insert guest information
//     await client.query(
//       `
//       INSERT INTO booking_guests (
//         booking_id,
//         first_name,
//         last_name,
//         email,
//         country_code,
//         country_name,
//         country_region,
//         phone_number,
//         booking_for_type,
//         company_name,
//         company_tax_id,
//         special_request
//       )
//       VALUES (
//         $1, $2, $3, $4,
//         $5, $6, $7, $8,
//         $9, $10, $11, $12
//       )
//       `,
//       [
//         bookingId,
//         bookingData.guest.firstName,
//         bookingData.guest.lastName,
//         bookingData.guest.email,
//         bookingData.guest.countryCode,
//         bookingData.guest.countryName,
//         bookingData.guest.countryRegion,
//         bookingData.guest.phoneNumber,
//         bookingData.guest.bookingForType,
//         bookingData.guest.companyName,
//         bookingData.guest.companyTaxId,
//         bookingData.guest.specialRequest,
//       ]
//     );

//     // 5. Insert selected room groups and offers
//     for (const roomGroup of bookingData.selectedRooms) {
//       const roomOffers = getRoomOffers(roomGroup);

//       const totalRoomAmount = roomOffers.reduce((total, offer) => {
//         return total + Number(pickFirst(offer?.amount, 0));
//       }, 0);

//       const roomGroupResult = await client.query(
//         `
//         INSERT INTO booking_room_groups (
//           booking_id,
//           base_room_id,
//           base_room_name,
//           base_room_surface_m2,
//           base_main_photo,
//           base_select_room_total_amount,
//           base_select_room_description
//         )
//         VALUES (
//           $1, $2, $3, $4, $5, $6, $7
//         )
//         RETURNING room_group_id
//         `,
//         [
//           bookingId,
//           pickFirst(roomGroup?.base_room_id, roomGroup?.baseRoomId),
//           pickFirst(roomGroup?.base_room_name, roomGroup?.baseRoomName),
//           pickFirst(
//             roomGroup?.base_room_surface_m2,
//             roomGroup?.baseRoomSurfaceM2
//           ),
//           pickFirst(
//             roomGroup?.base_main_photos,
//             roomGroup?.base_main_photo,
//             roomGroup?.baseMainPhoto
//           ),
//           pickFirst(
//             roomGroup?.base_select_room_total_amount,
//             roomGroup?.baseSelectRoomTotalAmount,
//             totalRoomAmount
//           ),
//           pickFirst(
//             roomGroup?.base_select_room_description,
//             roomGroup?.baseSelectRoomDescription
//           ),
//         ]
//       );

//       const roomGroupId = roomGroupResult.rows[0].room_group_id;

//       for (const offer of roomOffers) {
//         const amount = Number(pickFirst(offer?.amount, 0));
//         const pricePerRoom = getOfferPricePerRoom(offer);
//         const totalOfferPrice = getOfferTotalPrice(offer);

//         await client.query(
//           `
//           INSERT INTO booking_room_offers (
//             room_group_id,
//             offer_id,
//             offer_name,
//             amount,
//             price_per_room,
//             total_offer_price,
//             currency,
//             meal_plan,
//             cancellation_policy,
//             payment_type,
//             offer_json
//           )
//           VALUES (
//             $1, $2, $3,
//             $4, $5, $6,
//             $7, $8, $9, $10,
//             $11::jsonb
//           )
//           `,
//           [
//             roomGroupId,
//             pickFirst(
//               offer?.offer_id,
//               offer?.offerId,
//               offer?.block_id,
//               offer?.room_id,
//               offer?.spec_room_data?.block_id
//             ),
//             pickFirst(
//               offer?.offer_name,
//               offer?.offerName,
//               offer?.name,
//               offer?.spec_room_data?.name
//             ),
//             amount,
//             pricePerRoom,
//             totalOfferPrice,
//             paymentIntent.currency,
//             pickFirst(
//               offer?.meal_plan,
//               offer?.mealPlan,
//               offer?.spec_room_data?.meal_plan
//             ),
//             pickFirst(
//               offer?.cancellation_policy,
//               offer?.cancellationPolicy,
//               offer?.spec_room_data?.cancellation_policy
//             ),
//             pickFirst(
//               offer?.payment_type,
//               offer?.paymentType,
//               offer?.spec_room_data?.payment_type
//             ),
//             JSON.stringify(offer),
//           ]
//         );
//       }
//     }

//     // 6. Insert Stripe payment record
//     const latestCharge =
//       typeof paymentIntent.latest_charge === "object"
//         ? paymentIntent.latest_charge
//         : null;

//     await client.query(
//       `
//       INSERT INTO booking_payments (
//         booking_id,
//         stripe_payment_intent_id,
//         stripe_client_secret,
//         amount,
//         currency,
//         payment_status,
//         payment_method,
//         receipt_url,
//         stripe_response_json
//       )
//       VALUES (
//         $1, $2, $3,
//         $4, $5,
//         $6, $7, $8,
//         $9::jsonb
//       )
//       `,
//       [
//         bookingId,
//         paymentIntent.id,
//         paymentIntent.client_secret,
//         paymentIntent.amount,
//         paymentIntent.currency,
//         paymentIntent.status,
//         typeof paymentIntent.payment_method === "string"
//           ? paymentIntent.payment_method
//           : null,
//         latestCharge?.receipt_url ?? null,
//         JSON.stringify(paymentIntent),
//       ]
//     );

//     await client.query("COMMIT");

//     res.json({
//       success: true,
//       message: "Booking data inserted into Neon PostgreSQL successfully",
//       bookingId,
//       bookingCode,
//       firebaseUid,
//       stripePaymentIntentId: paymentIntent.id,
//     });
//   } catch (error) {
//     await client.query("ROLLBACK");

//     console.error("Database insert error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to insert booking data into Neon PostgreSQL",
//       error: error.message,
//     });
//   } finally {
//     client.release();
    
//   }
// });

// /// BASE SERVER RUNNING

// app.listen(PORT, () => {
//   console.log(`Backend server running on http://localhost:${PORT}`);
// });
