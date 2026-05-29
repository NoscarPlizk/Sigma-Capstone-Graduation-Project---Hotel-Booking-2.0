import { useState } from "react";
import { Container } from "react-bootstrap";

import MainHotelInfomation from "./component/MainHotelInfomation";
import GuestnHotelDetailsPortal from "./SubPage/GuestnHotelDetailsPortal/GuestnHotelDetailsPortal";
import PaymentPortal from "./SubPage/PaymentPortal/PaymentPortal";
import StripePaymentPage from "./SubPage/StripePaymentPage/StripePaymentPage";
import './MainPurchasePortal.css';

const LoadingComponent = () => <div>Loading</div>;

export default function MainPurchasePortal({ BookedHotelNMainInfo }) {
  const [ subPage, setSubPage ] = useState('GuestnHotelDetailsPortal');

  const DisplayComponent = 
    subPage === 'GuestnHotelDetailsPortal' ? 
    GuestnHotelDetailsPortal :
    subPage === 'StripePaymentPage' ? 
    StripePaymentPage : 
    LoadingComponent;

  function RemakeDate(start_date, end_date) {
    function processing(date) {
      return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    }

    return {
      start_date: processing(start_date), 
      end_date: processing(end_date)
    }
  }

  function StarttoEndDateCalculate(start_date, end_date) {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    
    const diffMs = endDate - startDate;
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }

  const objectDateNCalculate = {
    RemakeDate, StarttoEndDateCalculate
  }

  return (
    <>
      <Container className="mt-4">
        <div className="MainPurchasePortalFrame">
          <div className="MainHotelInfomation">
            <MainHotelInfomation 
              BookedHotelNMainInfo={BookedHotelNMainInfo}
              objectDateNCalculate={objectDateNCalculate}
            />
          </div>
          <div className="RightPart">
            <DisplayComponent 
              BookedHotelNMainInfo={BookedHotelNMainInfo} 
              objectDateNCalculate={objectDateNCalculate}
              setSubPage={setSubPage}
            />
          </div>
        </div>
      </Container>
    </>
  )
}