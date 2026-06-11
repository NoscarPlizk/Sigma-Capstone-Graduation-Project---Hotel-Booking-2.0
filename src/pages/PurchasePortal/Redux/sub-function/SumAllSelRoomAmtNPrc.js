// export default function SumAllSelRoomAmtNPrc(setSelectedOfferRoomData) {
//   let cal_totalprice = 0;

//   setSelectedOfferRoomData.forEach(baseObj => {        
//     baseObj.base_select_room.forEach(baseOff => {
//       const valueofPrice = baseOff.amount * Number(
//         baseOff?.
//         spec_room_data?.
//         product_price_breakdown?.
//         all_inclusive_amount?.
//         value?.
//         toFixed(2)
//       );

//       cal_totalprice += valueofPrice;
//     });
//   });

//   const finalTotal = Number(cal_totalprice.toFixed(2));

//   console.log('finalTotal', finalTotal);
//   return finalTotal;
// }

export default function SumAllSelRoomAmtNPrc(setSelectedOfferRoomData) {
  let cal_totalprice = 0;

  setSelectedOfferRoomData.forEach(baseObj => {        
    baseObj.base_select_room.forEach(baseOff => {
      const roomPrice = Number(
        baseOff?.
        spec_room_data?.
        product_price_breakdown?.
        all_inclusive_amount?.
        value ?? 0
      );

      const roundedRoomPrice = Number(roomPrice.toFixed(2));

      const valueofPrice = baseOff.amount * roundedRoomPrice;

      cal_totalprice += valueofPrice;
    });
  });

  const finalTotal = Number(cal_totalprice.toFixed(2));

  // console.log('cal_totalprice', finalTotal);
  return finalTotal;
}