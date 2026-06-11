import { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import {
  setMainHotelData,
  setProfileFirstMainGuestNameRoom,
} from './Redux/FinalBookingDataSlice';

import { useAuth } from "../../content/Firebase/AuthContext";

import { BookedList } from "../../content/data transfer/bookedListContent";

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

  const { adultPax, childPax } = useContext(BookedList);

  const { 
    hotelDetailsData, 
    selectedRooms, 
    checkInNOutDate, 
    currency 
  } = BookedHotelNMainInfo;

  const { start_date, end_date } = checkInNOutDate;

  const dispatch = useDispatch();
  const { userProfile } = useAuth();

  useEffect(() => {
    const remakeDate = RemakeDate(start_date, end_date);

    dispatch(setMainHotelData({
      setHotelName: hotelDetailsData.hotel_name,
      setHotelAddress: hotelDetailsData.address,
      setHotelId: hotelDetailsData.hotel_id,
      setCheckInNOut: {
        start_date: remakeDate.start_date,
        end_date: remakeDate.end_date,
        total_days: StarttoEndDateCalculate(start_date, end_date)
      },
      setGuestPax: {
        adultPax: adultPax,
        childPax: childPax
      },
      setSelectedOfferRoomData: selectedRooms,
      setCurrency: currency,
      setJSONDATA: hotelDetailsData
    }));

    if (userProfile) {
      dispatch(setProfileFirstMainGuestNameRoom({ 
        setMainGuestName: `${userProfile.name.first_name} ${userProfile.name.last_name}`
      }));
    }
  }, []);

  const bookingRegistry = useSelector(state => 
    state.PurchasePortal_FinalBookingData.CustomerDetailsnBookingHotelData
  );

  return (
    <>
      <Container className="mt-4">
        <div className="MainPurchasePortalFrame">
          <div className="MainHotelInfomation">
            <MainHotelInfomation 
              BookedHotelNMainInfo={BookedHotelNMainInfo}
              objectDateNCalculate={objectDateNCalculate}
              bookingRegistry={bookingRegistry}
            />
          </div>
          <div className="RightPart">
            <DisplayComponent 
              bookingRegistry={bookingRegistry}
              setSubPage={setSubPage}
            />
          </div>
        </div>
      </Container>
    </>
  )
}