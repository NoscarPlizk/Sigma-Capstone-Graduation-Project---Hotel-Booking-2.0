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
  return sqlDate.replaceAll("-", "");
}

export function calculateTotalDays(checkInDate, checkOutDate) {
  const startDate = new Date(checkInDate);
  const endDate = new Date(checkOutDate);

  return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
}

export function getMoneyAmountInSmallestUnit(value) {
  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) return 0;

  if (Number.isInteger(numberValue) && numberValue > 10000) {
    return numberValue;
  }

  return Math.round(numberValue * 100);
}

export function extractBookingData(bookingRegistry) {
  const hotelData = pickFirst(
    bookingRegistry?.mainHotelData,
    bookingRegistry?.main_hotel_data,
    bookingRegistry?.main_hotel_booked,
    bookingRegistry
  );

  const checkInOut = pickFirst(
    bookingRegistry?.check_in_out,
    bookingRegistry?.checkInNOut,
    bookingRegistry?.setCheckInNOut,
    hotelData?.check_in_out,
    hotelData?.checkInNOut,
    hotelData?.setCheckInNOut,
    {}
  );

  const guestPax = pickFirst(
    bookingRegistry?.guest_pax,
    bookingRegistry?.guestPax,
    bookingRegistry?.setGuestPax,
    hotelData?.guest_pax,
    hotelData?.guestPax,
    hotelData?.setGuestPax,
    {}
  );

  const guestData = pickFirst(
    bookingRegistry?.main_guest,
    bookingRegistry?.mainGuest,
    bookingRegistry?.guestData,
    bookingRegistry?.guest_data,
    bookingRegistry
  );

  const selectedRooms = pickFirst(
    bookingRegistry?.selected_offer_room_data,
    bookingRegistry?.selectedOfferRoomData,
    bookingRegistry?.saveHouse,
    bookingRegistry?.selectedRooms,
    hotelData?.selected_offer_room_data,
    hotelData?.selectedOfferRoomData,
    hotelData?.saveHouse,
    []
  );

  const hotelId = pickFirst(
    hotelData?.hotel_id,
    hotelData?.hotelId,
    hotelData?.setHotelId,
    bookingRegistry?.hotel_id,
    bookingRegistry?.hotelId,
    bookingRegistry?.setHotelId
  );

  const hotelName = pickFirst(
    hotelData?.hotel_name,
    hotelData?.hotelName,
    hotelData?.setHotelName,
    bookingRegistry?.hotel_name,
    bookingRegistry?.hotelName,
    bookingRegistry?.setHotelName
  );

  const hotelAddress = pickFirst(
    hotelData?.address,
    hotelData?.hotel_address,
    hotelData?.hotelAddress,
    hotelData?.setHotelAddress,
    bookingRegistry?.hotel_address,
    bookingRegistry?.hotelAddress,
    bookingRegistry?.setHotelAddress
  );

  const checkInDate = toSqlDate(
    pickFirst(
      checkInOut?.start_date,
      checkInOut?.check_in_date,
      checkInOut?.checkInDate,
      bookingRegistry?.start_date,
      bookingRegistry?.check_in_date
    )
  );

  const checkOutDate = toSqlDate(
    pickFirst(
      checkInOut?.end_date,
      checkInOut?.check_out_date,
      checkInOut?.checkOutDate,
      bookingRegistry?.end_date,
      bookingRegistry?.check_out_date
    )
  );

  const totalDays = Number(
    pickFirst(
      checkInOut?.total_days,
      checkInOut?.totalDays,
      calculateTotalDays(checkInDate, checkOutDate)
    )
  );

  const adultPax = Number(
    pickFirst(
      guestPax?.adultPax,
      guestPax?.adult_pax,
      bookingRegistry?.adultPax,
      bookingRegistry?.adult_pax,
      0
    )
  );

  const childPax = Number(
    pickFirst(
      guestPax?.childPax,
      guestPax?.child_pax,
      bookingRegistry?.childPax,
      bookingRegistry?.child_pax,
      0
    )
  );

  const currency = String(
    pickFirst(
      bookingRegistry?.currency,
      bookingRegistry?.setCurrency,
      hotelData?.currency,
      hotelData?.setCurrency,
      "myr"
    )
  ).toLowerCase();

  const totalAmount = getMoneyAmountInSmallestUnit(
    pickFirst(
      bookingRegistry?.purchase_total_amount,
      bookingRegistry?.total_amount,
      bookingRegistry?.totalAmount,
      hotelData?.purchase_total_amount,
      hotelData?.total_amount,
      0
    )
  );

  const guestName = pickFirst(
    guestData?.main_guest_name,
    guestData?.guest_name,
    guestData?.guestName,
    {}
  );

  return {
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
        guestData?.first_name,
        guestData?.firstName
      ),
      lastName: pickFirst(
        guestName?.last_name,
        guestName?.lastName,
        guestData?.last_name,
        guestData?.lastName
      ),
      email: pickFirst(
        guestData?.email,
        guestData?.guest_email,
        guestData?.guestEmail
      ),
      countryCode: pickFirst(
        guestData?.country_code,
        guestData?.countryCode
      ),
      countryName: pickFirst(
        guestData?.country_name,
        guestData?.countryName
      ),
      countryRegion: pickFirst(
        guestData?.country_region,
        guestData?.countryRegion
      ),
      phoneNumber: pickFirst(
        guestData?.phone_number,
        guestData?.phoneNumber
      ),
      bookingForType: pickFirst(
        guestData?.booking_for_type,
        guestData?.bookingForType
      ),
      companyName: pickFirst(
        guestData?.company_name,
        guestData?.companyName
      ),
      companyTaxId: pickFirst(
        guestData?.company_tax_id,
        guestData?.companyTaxId
      ),
      specialRequest: pickFirst(
        guestData?.special_request,
        guestData?.specialRequest
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

export function getOfferPricePerRoom(offer) {
  return getMoneyAmountInSmallestUnit(
    pickFirst(
      offer?.price_per_room,
      offer?.pricePerRoom,
      offer?.spec_room_data?.product_price_breakdown?.all_inclusive_amount?.value,
      offer?.spec_room_data?.product_price_breakdown?.gross_amount?.value,
      0
    )
  );
}

export function getOfferTotalPrice(offer) {
  const amount = Number(pickFirst(offer?.amount, 0));
  const pricePerRoom = getOfferPricePerRoom(offer);

  return amount * pricePerRoom;
}