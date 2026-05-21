import { useContext, useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";

import {
  // setBookingForType,
  // setProfileFirstName, 
  // setProfileLastName,
  // setProfileCountryRegion,
  // setCompanyName,
  // setCompanyRegNum,
  // setProfileEmail,
  // setProfileTelRegCode,
  // setProfileTelephone,
  setMainHotelData,
  setProfileFirstMainGuestNameRoom,
  setMainGuestName
} from '../../Redux/FinalBookingDataSlice';

import { useAuth } from '../../../../content/Firebase/AuthContext';

import './GuestnHotelDetailsPortal.css';
import { BookedList } from "../../../../content/data transfer/bookedListContent";

import HaveChargeBreakfast from "../../../ViewHotel/component/PerksListRelatedFunction/SubComponent/HaveChargeBreakfast";
import SplitCancelationBoldText from "../../../ViewHotel/component/PerksListRelatedFunction/SubComponent/SplitCancelationBoldText";
import ChildAgeFreePolicy from "../../../ViewHotel/component/PerksListRelatedFunction/SubComponent/ChildAgeFreePolicy";
import PerksListColumn from "../../../ViewHotel/component/PerksListRelatedFunction/PerksListColumn";
import PurchaseInfoForm from './component/PurchaseInfoForm';

function MainHotelInfomation({ 
  hotelDetailsData, 
  hotelPhotoData, 
  selectedRooms, 
  RemakeDate, 
  StarttoEndDateCalculate 
}) {

  const { start_date, end_date } = RemakeDate;

  const adultPax = useContext(BookedList).adultPax;
  const childPax = useContext(BookedList).childPax;
  
  const MainIMG = hotelPhotoData[0].url;

  const BookedRooms = selectedRooms;

  function CountTotalPrice() {
    let all_price_room = 0;
    let currency = '';

    BookedRooms.forEach(baseObj => {
      baseObj.base_select_room.forEach(baseOff => {
        const valueofPrice = baseOff.amount * Number(
          baseOff?.
          spec_room_data?.
          product_price_breakdown?.
          all_inclusive_amount?.
          value?.
          toFixed(2));

        const thecurrency = 
          baseOff?.
          spec_room_data?.
          product_price_breakdown?.
          all_inclusive_amount?.currency

          
        currency = thecurrency;
        all_price_room += valueofPrice;
      });
    });

    const object = {
      currency: currency,
      all_price_room: all_price_room
    }

    return object;
  }

  const RoomNPrice = CountTotalPrice();

  console.log('RoomNPrice:', RoomNPrice);

  return (
    <div className="MainHotelInfomation">
      <img src={MainIMG} className="MainHotelImg" />
      <div className="p-2">
        <div>
          <div className="mt-2 mb-2">
            {hotelDetailsData?.rawData?.accuratePropertyClass
              &&  Array.from({ length: hotelDetailsData?.rawData?.accuratePropertyClass },
                  (_, index) => (
                    <span key={index}>⭐</span>
                  ))
            }
          </div>
          <h4>{hotelDetailsData?.hotel_name ?? ''}</h4>
          <p>
            {hotelDetailsData?.address ?? ''}
            , {hotelDetailsData?.zip} {hotelDetailsData?.city}
            , {hotelDetailsData?.country_trans}
          </p>
        </div>
        <div className="d-flex flex-column gap-2">
          <div className="border rounded-2 p-3">
            <h5>The Booking Details</h5>
            <div className="d-flex gap-5">
              <div>
                <p>Check In</p>
                {start_date}
              </div>
              <div>
                <p>Check Out</p>
                {end_date}         
              </div>
              <div>
                <p>Total Day</p>
                {StarttoEndDateCalculate()} Days
              </div>
            </div>
            <hr/>
              <div>
                <p>Living Guest For:</p>
                <div className="d-flex gap-2">
                  <div>
                    {adultPax} Adults
                  </div>
                  <div>
                    {childPax} Childs
                  </div>
                </div>    
              </div>
            <hr/>
            <div>
              <p><strong>Our Selected Plan for {StarttoEndDateCalculate()} Days</strong></p>
              {BookedRooms.map((baseObj, index) => {
                const MainRoomName = baseObj.base_room_name;
                const TotalRoomAmount = baseObj.base_select_room.reduce(
                  (sum, room) => sum + room.amount, 0
                );

                return (
                  <div key={index} className="d-flex gap-2">
                    <div>{TotalRoomAmount}</div>
                    <div>X</div>
                    <div>{MainRoomName}</div>
                  </div>
                )
                })
              }
            </div>
            <hr/>
            <div>
              <p><strong>The Price Summary</strong></p>
              <div className="d-flex justify-content-between">
                  <h3>Price: </h3>
                <h3>{RoomNPrice.currency} {RoomNPrice.all_price_room}</h3>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HotelRoomList({ selectedRooms }) {
  const dispatch = useDispatch();

  const [ blockIdFirst, setBlockIdFirst ] = useState('');
  const [ newMainGuestName, setNewMainGuestName ] = useState('');

  function StartSetMainGuestName({ uniqueKey }) {
    setBlockIdFirst(uniqueKey);
  };

  function SaveMainGuestName({ baseRoomId, uniqueKey, newMainGuestName }) {
    dispatch(
      setMainGuestName({
        baseRoomId: baseRoomId,
        uniqueKey:   uniqueKey,
        newMainGuestName: newMainGuestName,
      })
    )
    setBlockIdFirst('');
  };

  function cancelEditMainGuestName() {
    setBlockIdFirst('');
    setNewMainGuestName('');
  };

  const DifferenceMainRoomBundle = useSelector(state => 
    state.PurchasePortal_FinalBookingData.CustomerDetailsnBookingHotelData).
    main_hotel_booked.select_room_offers;

  const childAgeString = useContext(BookedList).childAgeString;
  const BookedRooms = selectedRooms;

  function CountTotalRooms() {
    let all_amount_room = 0;

    BookedRooms.forEach(baseObj => {
      baseObj.base_select_room.forEach(MainRoom => {
        all_amount_room += MainRoom.amount;
      });
    });

    return all_amount_room;
  };

  function getOrdinal(n) {
    if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;

    switch (n % 10) {
      case 1: return `${n}st`;
      case 2: return `${n}nd`;
      case 3: return `${n}rd`;
      default: return `${n}th`;
    }
  };
  
  return (
    <div className="HotelRoomList">
      <h4>Selected Rooms: {CountTotalRooms()}</h4>
      <div className="border rounded-3">
      {DifferenceMainRoomBundle.length > 0 
        && DifferenceMainRoomBundle.map((MainRoom, index) => {
          const { base_room_name, base_select_room } = MainRoom;
          
          return (
            <div key={index} className="SelectedRoomBox">
              <h5 className="">{base_room_name ?? ''}</h5>
              <div className="d-flex flex-column gap-3">
                {base_select_room.map(({ spec_room_data, main_guest_name, uniqueKey }, index) => {
                  
                  // const OfferSpecRoomData = offer?.spec_room_data;
                  // console.log("OfferSpecRoomData", OfferSpecRoomData);

                  const BreakfastString = spec_room_data?.
                    block_text.policies[2]?.content ?? '';
                  const CancelationString = spec_room_data?.policy_display_details?.
                    cancellation?.title_details?.translation ?? '';
                  
                  const amount_adults = spec_room_data?.nr_adults;
                  const amount_childs = spec_room_data?.nr_children;

                  const OfferPriceCurrency = spec_room_data?.
                    product_price_breakdown?.all_inclusive_amount?.currency ?? 'N/A';

                  const OfferPriceTaxInclude = spec_room_data?.
                    product_price_breakdown?.all_inclusive_amount?.value?.toFixed(2) ?? '';

                  return (
                    <div key={uniqueKey} className="SelectedRoomBox-InnerBox">
                      <div>
                        <div>{getOrdinal(index + 1)}</div>
                      </div>
                      <div className="d-flex flex-column w-100 gap-3">
                        <div className="">
                          <PerksListColumn 
                            offer={spec_room_data} 
                            childAgeString={childAgeString}
                          />
                        </div>
                        <div className="d-flex justify-content-between">
                          <div>
                            <div id="guest" className="d-flex gap-1">
                              <label>Guest: </label>
                              <label>{amount_adults} Adult </label>
                              <label>{amount_childs > 0 && amount_childs} Child</label>
                            </div>
                            <div className="d-flex gap-1">
                              <label>
                                Main Guest:
                                {' '}
                                {blockIdFirst === uniqueKey 
                                  ? <div>
                                      <input 
                                        type='text' 
                                        placeholder={main_guest_name || "Type Name"}
                                        value={newMainGuestName}
                                        onChange={(e) => setNewMainGuestName(e.target.value)}
                                      />
                                      <button onClick={() => SaveMainGuestName({
                                        baseRoomId: MainRoom.base_room_id,
                                        uniqueKey:   uniqueKey,
                                        newMainGuestName: newMainGuestName,
                                      })}>
                                        Save
                                      </button>
                                      <button
                                        onClick={() => cancelEditMainGuestName()}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  : <a 
                                      className='EditGuestNameHyperlink'
                                      onClick={() => StartSetMainGuestName({ 
                                        uniqueKey: uniqueKey
                                      })}
                                    >
                                      {main_guest_name || "Type Name"} ✎
                                    </a> 
                                }
                              </label>
                            </div>
                          </div>
                          <div>
                            <h4>{OfferPriceCurrency} {OfferPriceTaxInclude}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  )})}
              </div>
            </div>
          )}) 
      }
      </div>
    </div>
  )
}

function ButtonNextPaymentEndpoint({ CheckBeforeGoSettlePayment }) {
  return (
    <div>
      <button onClick={() => CheckBeforeGoSettlePayment()} >
        Next: Settle Payment
      </button>
    </div>
  )
}


export default function GuestnHotelDetailsPortal({ BookedHotelNMainInfo, setSubPage }) {
  const { userProfile } = useAuth();
  const dispatch = useDispatch();

  const BookingType = useSelector(state => 
    state.PurchasePortal_FinalBookingData.CustomerDetailsnBookingHotelData)
    .main_guest_name.guest_booking_for_type;
  
  const adultPax = useContext(BookedList).adultPax;
  const childPax = useContext(BookedList).childPax;

  const { 
    hotelDetailsData, 
    hotelPhotoData, 
    selectedRooms, 
    checkInNOutDate
  } = BookedHotelNMainInfo;

  const { start_date, end_date } = checkInNOutDate;
      
  console.log("BookedHotelNMainInfo:", BookedHotelNMainInfo);

  function RemakeDate() {
    const processing = (date) => {
      return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    }

    const StartDate = processing(start_date);
    const EndDate = processing(end_date);

    const dateObject = {
      start_date: StartDate, end_date: EndDate
    }

    return dateObject;
  }

  const StarttoEndDateCalculate = () => {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    
    const diffMs = endDate - startDate;
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }

  useEffect(() => {
    dispatch(setMainHotelData({
      setHotelName: hotelDetailsData.hotel_name,
      setHotelAddress: hotelDetailsData.address,
      setCheckInNOut: {
        start_date: RemakeDate().start_date,
        end_date: RemakeDate().end_date,
        total_days: StarttoEndDateCalculate()
      },
      setGuestPax: {
        adultPax: adultPax,
        childPax: childPax
      },
      setSelectedOfferRoomData: selectedRooms
    }));

    if (userProfile) {
      dispatch(setProfileFirstMainGuestNameRoom({ 
        setMainGuestName: `${userProfile.name.first_name} ${userProfile.name.last_name}`
      }));
    }
  }, []);

  const [ isTouched, setIsTouched ] = useState({
    first_name: false,
    last_name: false,
    country_region_code: false,
    email: false,
    phone_country_region: false,
    phone_number: false,
    company_name: false,
    company_reg_num: false,
  });

  const [ hadvaluebeforeSubmit, SethadvaluebeforeSubmit ] = useState({
    first_name: false,
    last_name: false,
    country_region_code: false,
    email: false,
    phone_country_region: false,
    phone_number: false,
    company_name: false,
    company_reg_num: false
  });

  const VarValueBeforeSubmitState = {
    hadvaluebeforeSubmit,
    SethadvaluebeforeSubmit
  };

  function DetectedTouch({ name }) {
    setIsTouched((prev) => ({ ...prev, [name]: true }));
  }

  function isEmpty(value) {
    return value.trim() === '';
  }

  function isError(ActualState, StateKey) {
    if (
      ( isEmpty(ActualState) && isTouched[StateKey] === false ) || 
      ( !isEmpty(ActualState) && isTouched[StateKey] === true )
    ) {
      return false;
    } else if ( isEmpty(ActualState) && isTouched[StateKey] === true ) {
      return true
    } 
  }

  const CheckBeforeGoSettlePayment = () => {
    console.log("BookingType:", BookingType);

    function isAllRequiredHadValue() {
      const companyFields = ["company_name", "company_reg_num"];

      const A = Object.entries(hadvaluebeforeSubmit)
        .filter(([key]) => {
          if (BookingType === "company") return true;
          return !companyFields.includes(key);
        })

      console.log("A:", A);

      const B = A.every(([key, value]) => value === true);
      return B;
    }
    
    const hadError = isAllRequiredHadValue();

    if (!hadError) {
      console.log("Some required field is still false");
      return;
    }

    return setSubPage('PaymentPortal');
  }

  return (
    <>
      <Container className="mt-4">
        <div className="FormNInfomationFrame">
          <div className="LeftPurchaseInfoForm">
            <PurchaseInfoForm 
              userProfile={userProfile} 
              DetectedTouch={DetectedTouch}
              isError={isError}
              VarValueBeforeSubmitState={VarValueBeforeSubmitState}
            />
          </div>
          <div className="LeftHotelRoomList">
            <HotelRoomList selectedRooms={selectedRooms} />
          </div>
          <div className="RightMainHotelInfomation">
            <MainHotelInfomation 
              hotelDetailsData={hotelDetailsData}
              hotelPhotoData={hotelPhotoData}
              selectedRooms={selectedRooms}
              RemakeDate={RemakeDate()} 
              StarttoEndDateCalculate={StarttoEndDateCalculate}
            />  
          </div>
          <div className='RightButtonNextPaymentEndpoint'>
            <ButtonNextPaymentEndpoint 
              CheckBeforeGoSettlePayment={CheckBeforeGoSettlePayment}
            />
          </div>
        </div>
      </Container>
    </>
  )
}