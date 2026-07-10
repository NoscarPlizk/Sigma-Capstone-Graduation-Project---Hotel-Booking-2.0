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
import StripePaymentPage from "./SubPage/StripePaymentPage/StripePaymentPage";
import './MainPurchasePortal.css';

const LoadingComponent = () => <div>Loading</div>;

const STEP_ITEMS = [
  {
    id: "GuestnHotelDetailsPortal",
    label: "Guest details",
    description: "Guest names and contact details",
  },
  {
    id: "StripePaymentPage",
    label: "Payment",
    description: "Secure final payment",
  },
];

function PurchaseStepTracker({ activeStepId }) {
  const activeIndex = STEP_ITEMS.findIndex((item) => item.id === activeStepId);

  return (
    <div className="purchase-stepper" aria-label="Booking progress">
      {STEP_ITEMS.map((item, index) => {
        const isActive = item.id === activeStepId;
        const isComplete = activeIndex > index;

        return (
          <div
            key={item.id}
            className={`purchase-step ${isActive ? "is-active" : ""} ${isComplete ? "is-complete" : ""}`.trim()}
          >
            <div className="purchase-step-marker">
              {isComplete ? "✓" : index + 1}
            </div>
            <div className="purchase-step-copy">
              <strong>{item.label}</strong>
              <span>{item.description}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

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
    <div className="purchase-portal-page">
      <Container className="purchase-portal-container">
        <header className="purchase-portal-hero">
          <div>
            <p className="purchase-eyebrow">Final booking step</p>
            <h1>Complete your hotel reservation</h1>
            <p className="purchase-hero-copy">
              Review the stay details from the hotel page, assign guest names,
              and confirm a payment method before the booking record is saved.
            </p>
          </div>
        </header>

        <PurchaseStepTracker activeStepId={subPage} />

        <div className="purchase-portal-layout">
          <aside className="purchase-portal-sidebar">
            <MainHotelInfomation 
              BookedHotelNMainInfo={BookedHotelNMainInfo}
              objectDateNCalculate={objectDateNCalculate}
              bookingRegistry={bookingRegistry}
            />
          </aside>

          <section className="purchase-portal-main">
            <DisplayComponent 
              bookingRegistry={bookingRegistry}
              setSubPage={setSubPage}
            />
          </section>
        </div>
      </Container>
    </div>
  )
}
