export function pickFirst(...values) {
  return values.find(
    (value) => value !== undefined && value !== null && value !== ""
  );
}

export function makeUserRefCode(firebaseUid) {
  const cleanUid = String(firebaseUid)
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase();

  return `U${cleanUid.slice(0, 8)}`;
}

const MONTH_NAME_TO_NUMBER = {
  jan: "01",
  january: "01",
  feb: "02",
  february: "02",
  mar: "03",
  march: "03",
  apr: "04",
  april: "04",
  may: "05",
  jun: "06",
  june: "06",
  jul: "07",
  july: "07",
  aug: "08",
  august: "08",
  sep: "09",
  sept: "09",
  september: "09",
  oct: "10",
  october: "10",
  nov: "11",
  november: "11",
  dec: "12",
  december: "12",
};

export function toSqlDate(dateValue) {
  if (!dateValue) return null;

  const value = String(dateValue).trim();

  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }

  if (/^\d{8}$/.test(value) && value.startsWith("20")) {
    return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
  }

  if (/^\d{8}$/.test(value)) {
    return `${value.slice(4, 8)}-${value.slice(2, 4)}-${value.slice(0, 2)}`;
  }

  const monthNameDateMatch = value.match(
    /^(\d{1,2})[\s\-/]+([A-Za-z]{3,9})[\s\-/]+(\d{4})$/
  );

  if (monthNameDateMatch) {
    const [, day, monthName, year] = monthNameDateMatch;
    const month = MONTH_NAME_TO_NUMBER[monthName.toLowerCase()];

    if (month) {
      return `${year}-${month}-${String(day).padStart(2, "0")}`;
    }
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date value: ${dateValue}`);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatDateCode(sqlDate) {
  return String(sqlDate).replaceAll("-", "");
}

export function calculateTotalDays(checkInDate, checkOutDate) {
  if (!checkInDate || !checkOutDate) return null;

  const startDate = new Date(checkInDate);
  const endDate = new Date(checkOutDate);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return null;
  }

  return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
}

export function getMoneyAmountInSmallestUnit(value) {
  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) return 0;

  // If the value is already a Stripe/Postgres smallest-unit amount like 751845,
  // keep it as-is. If it is a normal amount like 7518.45, convert it to cents/sen.
  if (Number.isInteger(numberValue) && Math.abs(numberValue) > 10000) {
    return numberValue;
  }

  return Math.round(numberValue * 100);
}

export function parseHotelIdFromBookingCode(bookingRegistryCode) {
  const match = String(bookingRegistryCode ?? "").match(/^BK-(\d+)/i);
  return match?.[1] ?? null;
}

export function formatPhoneNumber(phoneData = {}) {
  const regionCode = pickFirst(phoneData?.region_code, phoneData?.regionCode);
  const phoneNumber = pickFirst(phoneData?.phone_number, phoneData?.phoneNumber);

  return [regionCode, phoneNumber].filter(Boolean).join(" ") || null;
}

export function stringifyObjectIfNeeded(value) {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export function extractBookingData(bookingRegistry) {
  const registry = pickFirst(
    bookingRegistry?.CustomerDetailsnBookingHotelData,
    bookingRegistry?.customerDetailsnBookingHotelData,
    bookingRegistry
  );

  const hotelData = pickFirst(
    registry?.main_hotel_booked,
    registry?.mainHotelBooked,
    registry?.mainHotelData,
    registry?.main_hotel_data,
    registry
  );

  const rawHotelData = pickFirst(
    hotelData?.rawjsondata,
    hotelData?.rawJsonData,
    hotelData?.raw_json_data,
    {}
  );

  const checkInOut = pickFirst(
    hotelData?.checking_start_end_time,
    hotelData?.checkingStartEndTime,
    registry?.check_in_out,
    registry?.checkInNOut,
    registry?.setCheckInNOut,
    hotelData?.check_in_out,
    hotelData?.checkInNOut,
    hotelData?.setCheckInNOut,
    {}
  );

  const guestPax = pickFirst(
    hotelData?.guest,
    registry?.guest_pax,
    registry?.guestPax,
    registry?.setGuestPax,
    hotelData?.guest_pax,
    hotelData?.guestPax,
    hotelData?.setGuestPax,
    {}
  );

  const selectedRooms = pickFirst(
    hotelData?.select_room_offers,
    hotelData?.selected_offer_room_data,
    hotelData?.selectedOfferRoomData,
    hotelData?.saveHouse,
    registry?.select_room_offers,
    registry?.selected_offer_room_data,
    registry?.selectedOfferRoomData,
    registry?.saveHouse,
    registry?.selectedRooms,
    []
  );

  const totalCostData = pickFirst(
    hotelData?.total_cost,
    hotelData?.totalCost,
    registry?.total_cost,
    registry?.totalCost,
    {}
  );

  const guestName = pickFirst(
    registry?.main_guest_name,
    registry?.mainGuestName,
    registry?.main_guest,
    registry?.mainGuest,
    registry?.guestData,
    registry?.guest_data,
    {}
  );

  const countryRegion = pickFirst(
    registry?.country_region,
    registry?.countryRegion,
    {}
  );

  const phoneData = pickFirst(registry?.phone, registry?.phone_data, {});
  const companyData = pickFirst(
    registry?.company?.company_data,
    registry?.company?.companyData,
    registry?.company_data,
    registry?.companyData,
    {}
  );

  const bookingRegistryCode = pickFirst(
    registry?.booking_registry_code,
    registry?.bookingRegistryCode,
    registry?.booking_code,
    registry?.bookingCode
  );

  const hotelId = pickFirst(
    hotelData?.main_hotel_id,
    hotelData?.hotel_id,
    hotelData?.hotelId,
    hotelData?.setHotelId,
    rawHotelData?.hotel_id,
    rawHotelData?.hotelId,
    rawHotelData?.id,
    registry?.hotel_id,
    registry?.hotelId,
    registry?.setHotelId,
    parseHotelIdFromBookingCode(bookingRegistryCode)
  );

  const hotelName = pickFirst(
    hotelData?.main_hotel_name,
    hotelData?.hotel_name,
    hotelData?.hotelName,
    hotelData?.setHotelName,
    rawHotelData?.hotel_name,
    rawHotelData?.hotelName,
    rawHotelData?.name,
    registry?.hotel_name,
    registry?.hotelName,
    registry?.setHotelName
  );

  const hotelAddress = pickFirst(
    hotelData?.main_hotel_address,
    hotelData?.address,
    hotelData?.hotel_address,
    hotelData?.hotelAddress,
    hotelData?.setHotelAddress,
    rawHotelData?.address,
    rawHotelData?.hotel_address,
    rawHotelData?.hotelAddress,
    registry?.hotel_address,
    registry?.hotelAddress,
    registry?.setHotelAddress
  );

  const checkInDate = toSqlDate(
    pickFirst(
      checkInOut?.start_date,
      checkInOut?.check_in_date,
      checkInOut?.checkInDate,
      registry?.start_date,
      registry?.check_in_date
    )
  );

  const checkOutDate = toSqlDate(
    pickFirst(
      checkInOut?.end_date,
      checkInOut?.check_out_date,
      checkInOut?.checkOutDate,
      registry?.end_date,
      registry?.check_out_date
    )
  );

  const totalDays = Number(
    pickFirst(
      checkInOut?.total_days,
      checkInOut?.totalDays,
      calculateTotalDays(checkInDate, checkOutDate),
      0
    )
  );

  const adultPax = Number(
    pickFirst(
      guestPax?.adults,
      guestPax?.adultPax,
      guestPax?.adult_pax,
      registry?.adultPax,
      registry?.adult_pax,
      0
    )
  );

  const childPax = Number(
    pickFirst(
      guestPax?.childs,
      guestPax?.children,
      guestPax?.childPax,
      guestPax?.child_pax,
      registry?.childPax,
      registry?.child_pax,
      0
    )
  );

  const currency = String(
    pickFirst(
      totalCostData?.currency,
      registry?.purchase_currency,
      registry?.currency,
      registry?.setCurrency,
      hotelData?.currency,
      hotelData?.setCurrency,
      "myr"
    )
  ).toLowerCase();

  const totalAmount = getMoneyAmountInSmallestUnit(
    pickFirst(
      totalCostData?.grand_total_cost_deceimal,
      totalCostData?.grand_total_cost_decimal,
      totalCostData?.grandTotalCostDecimal,
      registry?.purchase_total_amount,
      registry?.total_amount,
      registry?.totalAmount,
      hotelData?.purchase_total_amount,
      hotelData?.total_amount,
      totalCostData?.grand_total_cost,
      totalCostData?.grandTotalCost,
      0
    )
  );

  const bookingForType = pickFirst(
    guestName?.guest_booking_for_type,
    guestName?.guestBookingForType,
    registry?.booking_for_type,
    registry?.bookingForType,
    registry?.company?.is_Company_Business ? "company" : null,
    "mainGuest"
  );

  return {
    bookingRegistryCode,
    hotelId,
    hotelName,
    hotelAddress,
    checkInDate,
    checkOutDate,
    totalDays,
    adultPax,
    childPax,
    currency,
    totalAmount,

    guest: {
      firstName: pickFirst(
        guestName?.first_name,
        guestName?.firstName,
        registry?.first_name,
        registry?.firstName
      ),
      lastName: pickFirst(
        guestName?.last_name,
        guestName?.lastName,
        registry?.last_name,
        registry?.lastName
      ),
      email: pickFirst(
        registry?.email,
        guestName?.email,
        registry?.guest_email,
        registry?.guestEmail
      ),
      countryCode: pickFirst(
        countryRegion?.country_code,
        countryRegion?.countryCode,
        registry?.country_code,
        registry?.countryCode
      ),
      countryName: pickFirst(
        countryRegion?.country_name,
        countryRegion?.countryName,
        registry?.country_name,
        registry?.countryName
      ),
      countryRegion: pickFirst(
        phoneData?.region_country,
        phoneData?.region_country_code,
        phoneData?.regionCountry,
        phoneData?.regionCountryCode,
        countryRegion?.country_region,
        countryRegion?.countryRegion
      ),
      phoneNumber: pickFirst(
        formatPhoneNumber(phoneData),
        phoneData?.phone_number,
        phoneData?.phoneNumber,
        registry?.phone_number,
        registry?.phoneNumber
      ),
      bookingForType,
      companyName: pickFirst(
        companyData?.company_name,
        companyData?.companyName,
        registry?.company_name,
        registry?.companyName
      ),
      companyTaxId: pickFirst(
        companyData?.company_reg_num,
        companyData?.companyRegNum,
        companyData?.company_tax_id,
        companyData?.companyTaxId,
        registry?.company_tax_id,
        registry?.companyTaxId
      ),
      specialRequest: pickFirst(
        registry?.special_request,
        registry?.specialRequest
      ),
    },

    selectedRooms: Array.isArray(selectedRooms) ? selectedRooms : [],
  };
}

export function getRoomOffers(roomGroup) {
  const offers = pickFirst(
    roomGroup?.base_select_room,
    roomGroup?.baseSelectRoom,
    roomGroup?.selected_offers,
    roomGroup?.selectedOffers,
    []
  );

  return Array.isArray(offers) ? offers : [];
}

export function getOfferAmount(offer) {
  const amount = Number(
    pickFirst(
      offer?.amount,
      offer?.room_amount,
      offer?.roomAmount,
      1
    )
  );

  return Number.isFinite(amount) && amount > 0 ? amount : 1;
}

export function getRoomGroupDescription(roomGroup) {
  return pickFirst(
    roomGroup?.base_select_room_description?.total_same_rooms_name,
    roomGroup?.baseSelectRoomDescription?.totalSameRoomsName,
    roomGroup?.base_select_room_description,
    roomGroup?.baseSelectRoomDescription
  );
}

export function getOfferPricePerRoom(offer) {
  return getMoneyAmountInSmallestUnit(
    pickFirst(
      offer?.price_per_room,
      offer?.pricePerRoom,
      offer?.spec_room_data?.product_price_breakdown?.all_inclusive_amount?.value,
      offer?.spec_room_data?.product_price_breakdown?.gross_amount?.value,
      offer?.specRoomData?.productPriceBreakdown?.allInclusiveAmount?.value,
      offer?.specRoomData?.productPriceBreakdown?.grossAmount?.value,
      0
    )
  );
}

export function getOfferTotalPrice(offer) {
  const amount = getOfferAmount(offer);
  const pricePerRoom = getOfferPricePerRoom(offer);

  return amount * pricePerRoom;
}

export function getOfferMealPlan(offer) {
  return pickFirst(
    offer?.meal_plan,
    offer?.mealPlan,
    offer?.spec_room_data?.mealplan,
    offer?.spec_room_data?.meal_plan,
    offer?.specRoomData?.mealplan,
    offer?.specRoomData?.mealPlan
  );
}

export function getOfferCancellationPolicy(offer) {
  const cancellationPolicy = offer?.spec_room_data?.transactional_policy_data?.policies?.find(
    (policy) => policy?.type === "cancellation"
  );

  return pickFirst(
    offer?.cancellation_policy,
    offer?.cancellationPolicy,
    offer?.spec_room_data?.cancellation_policy,
    cancellationPolicy?.text,
    offer?.spec_room_data?.paymentterms?.cancellation?.type_translation,
    offer?.spec_room_data?.policy_display_details?.cancellation?.title_details?.translation
  );
}

export function getOfferPaymentType(offer) {
  const prepaymentPolicy = offer?.spec_room_data?.transactional_policy_data?.policies?.find(
    (policy) => policy?.type === "prepayment"
  );

  return pickFirst(
    offer?.payment_type,
    offer?.paymentType,
    offer?.spec_room_data?.payment_type,
    prepaymentPolicy?.text,
    offer?.spec_room_data?.paymentterms?.prepayment?.type_translation,
    offer?.spec_room_data?.policy_display_details?.prepayment?.title_details?.translation
  );
}


// export function pickFirst(...values) {
//   return values.find(
//     (value) => value !== undefined && value !== null && value !== ""
//   );
// }

// export function makeUserRefCode(firebaseUid) {
//   const cleanUid = String(firebaseUid)
//     .replace(/[^a-zA-Z0-9]/g, "")
//     .toUpperCase();

//   return `U${cleanUid.slice(0, 8)}`;
// }

// export function toSqlDate(dateValue) {
//   if (!dateValue) return null;

//   const value = String(dateValue).trim();

//   if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
//     return value.slice(0, 10);
//   }

//   if (/^\d{8}$/.test(value) && value.startsWith("20")) {
//     return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
//   }

//   if (/^\d{8}$/.test(value)) {
//     return `${value.slice(4, 8)}-${value.slice(2, 4)}-${value.slice(0, 2)}`;
//   }

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     throw new Error(`Invalid date value: ${dateValue}`);
//   }

//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");

//   return `${year}-${month}-${day}`;
// }

// export function formatDateCode(sqlDate) {
//   return sqlDate.replaceAll("-", "");
// }

// export function calculateTotalDays(checkInDate, checkOutDate) {
//   const startDate = new Date(checkInDate);
//   const endDate = new Date(checkOutDate);

//   return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
// }

// export function getMoneyAmountInSmallestUnit(value) {
//   const numberValue = Number(value);

//   if (Number.isNaN(numberValue)) return 0;

//   if (Number.isInteger(numberValue) && numberValue > 10000) {
//     return numberValue;
//   }

//   return Math.round(numberValue * 100);
// }

// export function extractBookingData(bookingRegistry) {
//   const hotelData = pickFirst(
//     bookingRegistry?.mainHotelData,
//     bookingRegistry?.main_hotel_data,
//     bookingRegistry?.main_hotel_booked,
//     bookingRegistry
//   );

//   const checkInOut = pickFirst(
//     bookingRegistry?.check_in_out,
//     bookingRegistry?.checkInNOut,
//     bookingRegistry?.setCheckInNOut,
//     hotelData?.check_in_out,
//     hotelData?.checkInNOut,
//     hotelData?.setCheckInNOut,
//     {}
//   );

//   const guestPax = pickFirst(
//     bookingRegistry?.guest_pax,
//     bookingRegistry?.guestPax,
//     bookingRegistry?.setGuestPax,
//     hotelData?.guest_pax,
//     hotelData?.guestPax,
//     hotelData?.setGuestPax,
//     {}
//   );

//   const guestData = pickFirst(
//     bookingRegistry?.main_guest,
//     bookingRegistry?.mainGuest,
//     bookingRegistry?.guestData,
//     bookingRegistry?.guest_data,
//     bookingRegistry
//   );

//   const selectedRooms = pickFirst(
//     bookingRegistry?.selected_offer_room_data,
//     bookingRegistry?.selectedOfferRoomData,
//     bookingRegistry?.saveHouse,
//     bookingRegistry?.selectedRooms,
//     hotelData?.selected_offer_room_data,
//     hotelData?.selectedOfferRoomData,
//     hotelData?.saveHouse,
//     []
//   );

//   const hotelId = pickFirst(
//     hotelData?.hotel_id,
//     hotelData?.hotelId,
//     hotelData?.setHotelId,
//     bookingRegistry?.hotel_id,
//     bookingRegistry?.hotelId,
//     bookingRegistry?.setHotelId
//   );

//   const hotelName = pickFirst(
//     hotelData?.hotel_name,
//     hotelData?.hotelName,
//     hotelData?.setHotelName,
//     bookingRegistry?.hotel_name,
//     bookingRegistry?.hotelName,
//     bookingRegistry?.setHotelName
//   );

//   const hotelAddress = pickFirst(
//     hotelData?.address,
//     hotelData?.hotel_address,
//     hotelData?.hotelAddress,
//     hotelData?.setHotelAddress,
//     bookingRegistry?.hotel_address,
//     bookingRegistry?.hotelAddress,
//     bookingRegistry?.setHotelAddress
//   );

//   const checkInDate = toSqlDate(
//     pickFirst(
//       checkInOut?.start_date,
//       checkInOut?.check_in_date,
//       checkInOut?.checkInDate,
//       bookingRegistry?.start_date,
//       bookingRegistry?.check_in_date
//     )
//   );

//   const checkOutDate = toSqlDate(
//     pickFirst(
//       checkInOut?.end_date,
//       checkInOut?.check_out_date,
//       checkInOut?.checkOutDate,
//       bookingRegistry?.end_date,
//       bookingRegistry?.check_out_date
//     )
//   );

//   const totalDays = Number(
//     pickFirst(
//       checkInOut?.total_days,
//       checkInOut?.totalDays,
//       calculateTotalDays(checkInDate, checkOutDate)
//     )
//   );

//   const adultPax = Number(
//     pickFirst(
//       guestPax?.adultPax,
//       guestPax?.adult_pax,
//       bookingRegistry?.adultPax,
//       bookingRegistry?.adult_pax,
//       0
//     )
//   );

//   const childPax = Number(
//     pickFirst(
//       guestPax?.childPax,
//       guestPax?.child_pax,
//       bookingRegistry?.childPax,
//       bookingRegistry?.child_pax,
//       0
//     )
//   );

//   const currency = String(
//     pickFirst(
//       bookingRegistry?.currency,
//       bookingRegistry?.setCurrency,
//       hotelData?.currency,
//       hotelData?.setCurrency,
//       "myr"
//     )
//   ).toLowerCase();

//   const totalAmount = getMoneyAmountInSmallestUnit(
//     pickFirst(
//       bookingRegistry?.purchase_total_amount,
//       bookingRegistry?.total_amount,
//       bookingRegistry?.totalAmount,
//       hotelData?.purchase_total_amount,
//       hotelData?.total_amount,
//       0
//     )
//   );

//   const guestName = pickFirst(
//     guestData?.main_guest_name,
//     guestData?.guest_name,
//     guestData?.guestName,
//     {}
//   );

//   return {
//     hotelId,
//     hotelName,
//     hotelAddress,
//     checkInDate,
//     checkOutDate,
//     totalDays,
//     adultPax,
//     childPax,
//     currency,
//     totalAmount,

//     guest: {
//       firstName: pickFirst(
//         guestName?.first_name,
//         guestName?.firstName,
//         guestData?.first_name,
//         guestData?.firstName
//       ),
//       lastName: pickFirst(
//         guestName?.last_name,
//         guestName?.lastName,
//         guestData?.last_name,
//         guestData?.lastName
//       ),
//       email: pickFirst(
//         guestData?.email,
//         guestData?.guest_email,
//         guestData?.guestEmail
//       ),
//       countryCode: pickFirst(
//         guestData?.country_code,
//         guestData?.countryCode
//       ),
//       countryName: pickFirst(
//         guestData?.country_name,
//         guestData?.countryName
//       ),
//       countryRegion: pickFirst(
//         guestData?.country_region,
//         guestData?.countryRegion
//       ),
//       phoneNumber: pickFirst(
//         guestData?.phone_number,
//         guestData?.phoneNumber
//       ),
//       bookingForType: pickFirst(
//         guestData?.booking_for_type,
//         guestData?.bookingForType
//       ),
//       companyName: pickFirst(
//         guestData?.company_name,
//         guestData?.companyName
//       ),
//       companyTaxId: pickFirst(
//         guestData?.company_tax_id,
//         guestData?.companyTaxId
//       ),
//       specialRequest: pickFirst(
//         guestData?.special_request,
//         guestData?.specialRequest
//       ),
//     },

//     selectedRooms: Array.isArray(selectedRooms) ? selectedRooms : [],
//   };
// }

// export function getRoomOffers(roomGroup) {
//   const offers = pickFirst(
//     roomGroup?.base_select_room,
//     roomGroup?.baseSelectRoom,
//     roomGroup?.selected_offers,
//     roomGroup?.selectedOffers,
//     []
//   );

//   return Array.isArray(offers) ? offers : [];
// }

// export function getOfferPricePerRoom(offer) {
//   return getMoneyAmountInSmallestUnit(
//     pickFirst(
//       offer?.price_per_room,
//       offer?.pricePerRoom,
//       offer?.spec_room_data?.product_price_breakdown?.all_inclusive_amount?.value,
//       offer?.spec_room_data?.product_price_breakdown?.gross_amount?.value,
//       0
//     )
//   );
// }

// export function getOfferTotalPrice(offer) {
//   const amount = Number(pickFirst(offer?.amount, 0));
//   const pricePerRoom = getOfferPricePerRoom(offer);

//   return amount * pricePerRoom;
// }