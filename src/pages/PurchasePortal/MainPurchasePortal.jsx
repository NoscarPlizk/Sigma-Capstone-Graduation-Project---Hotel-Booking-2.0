import { useState } from "react";

import GuestnHotelDetailsPortal from "./SubPage/GuestnHotelDetailsPortal/GuestnHotelDetailsPortal";
import PaymentPortal from "./SubPage/PaymentPortal/PaymentPortal";

export default function MainPurchasePortal({ BookedHotelNMainInfo }) {
  const [ subPage, setSubPage ] = useState('GuestnHotelDetailsPortal');

  if (subPage === 'GuestnHotelDetailsPortal') {
    return (
      <>
        <GuestnHotelDetailsPortal 
          BookedHotelNMainInfo={BookedHotelNMainInfo} 
          setSubPage={setSubPage}
        />
      </>
    )
  } 

  if (subPage === 'PaymentPortal') {
    return (
      <>
        <PaymentPortal />
      </>
    )
  } 

}