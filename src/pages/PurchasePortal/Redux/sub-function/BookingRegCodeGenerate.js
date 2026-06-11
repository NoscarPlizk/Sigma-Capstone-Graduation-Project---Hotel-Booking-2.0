export default function BookingRegCodeGenerate(setHotelId, start_date, end_date) {
  const hotelId = setHotelId;
  const checkInDate = start_date;
  const checkOutDate = end_date;
  
  // console.log('BookingRegCodeGenerate InitialData:', { hotelId, checkInDate, checkOutDate });

  function formatDateForBookingCode(dateValue) {
    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "INVALIDDATE";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}${month}${year}`;
  }

  // function makeRandomCode(length = 5) {
  //   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  //   let result = "";

  //   for (let i = 0; i < length; i++) {
  //     result += chars[Math.floor(Math.random() * chars.length)];
  //   }

  //   return result;
  // }

  const checkInCode = formatDateForBookingCode(checkInDate);
  const checkOutCode = formatDateForBookingCode(checkOutDate);
  // const randomCode = makeRandomCode();


  const returnvalue = `BK-${hotelId}-${checkInCode}-${checkOutCode}`;

  console.log('BookingRegCodeGenerate:', returnvalue);
  return returnvalue;
}