import { useContext, useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";

import {
  setBookingForType,
  setProfileFirstName, 
  setProfileLastName,
  setProfileCountryRegion,
  setCompanyName,
  setCompanyRegNum,
  setProfileEmail,
  setProfileTelRegCode,
  setProfileTelephone,
  setMainHotelData,
  setProfileFirstMainGuestNameRoom,
  setMainGuestName
} from './Redux/FinalBookingDataSlice';

import { useAuth } from '../../content/Firebase/AuthContext';

import './PurchasePortal.css';
import { BookedList } from "../../content/data transfer/bookedListContent";

import { countryRegionOptions } from "../../content/countryRegionOptions";
import HaveChargeBreakfast from "../ViewHotel/component/PerksListRelatedFunction/SubComponent/HaveChargeBreakfast";
import SplitCancelationBoldText from "../ViewHotel/component/PerksListRelatedFunction/SubComponent/SplitCancelationBoldText";
import ChildAgeFreePolicy from "../ViewHotel/component/PerksListRelatedFunction/SubComponent/ChildAgeFreePolicy";
import PerksListColumn from "../ViewHotel/component/PerksListRelatedFunction/PerksListColumn";


function OneCheckedOnly({ bookingForTypeReg }) {
  const dispatch = useDispatch();

  return (
    <div>
      <label className="mb-1"><strong>Are you Booking for?</strong></label>
      <div className="d-flex mb-3 gap-3">
        <div className="theCheckBoxStyle">
          <label>
            <input 
              type="radio" 
              value='mainGuest' 
              checked={bookingForTypeReg === 'mainGuest'}
              onChange={(e) => dispatch(setBookingForType(e.target.value))}
            />
            I'm the main guest
          </label>
        </div>            
        <div className="theCheckBoxStyle">
          <label>
            <input 
              type="radio" 
              value='someoneElse'
              checked={bookingForTypeReg === 'someoneElse'}
              onChange={(e) => dispatch(setBookingForType(e.target.value))}
            />
            I'm booking for someone else
          </label>
        </div>            
        <div className="theCheckBoxStyle">
          <label>
            <input 
              type="radio" 
              value='company'
              checked={bookingForTypeReg === 'company'}
              onChange={(e) => dispatch(setBookingForType(e.target.value))}
            />
            Under Company / Business
          </label>
        </div>
      </div>
    </div>
  )
}


function PurchaseInfoForm({ userProfile }) {
  const dispatch = useDispatch();
  
  const bookingRegistry = useSelector(state => state.PurchasePortal_FinalBookingData.CustomerDetailsnBookingHotelData);
  console.log("bookingRegistry:", bookingRegistry);
  const bookingForTypeReg = bookingRegistry?.main_guest_name?.guest_booking_for_type ?? 'mainGuest';
  const firstNameReg = bookingRegistry?.main_guest_name?.first_name ?? '';
  const lastNameReg = bookingRegistry?.main_guest_name?.last_name ?? '';
  const isUnderCompanyBusinessReg = bookingRegistry?.company?.is_Company_Business ?? '';
  const companyNameReg = bookingRegistry?.company?.company_data.company_name ?? '';
  const companyRegNumReg = bookingRegistry?.company?.company_data.company_reg_num ?? '';
  const emailReg = bookingRegistry?.email ?? '';
  const telephoneRegionCodeReg = bookingRegistry?.phone?.country_region ?? '';
  const telephoneNumberReg = bookingRegistry?.phone?.phone_number ?? '';

  const InputCompanyName = useRef(null);
  const InputCompanyRegNum = useRef(null);

  const { firebaseUser } = useAuth();

  useEffect(() => {
    if (userProfile) {
      dispatch(setProfileFirstName({ setFirstName: userProfile.name.first_name }));
      dispatch(setProfileLastName({ setLastName: userProfile.name.last_name }));
      dispatch(setProfileEmail({ setEmail: userProfile.email }));
      dispatch(setProfileTelRegCode({ setTeleCountryRegion: userProfile.phone.region_code }));
      dispatch(setProfileTelephone({ setTelephoneNumber: userProfile.phone.telephone_number }));

    }
  }, [])

  return (
    <div className="PurchaseInfoForm">
      <div className="mb-3">
        <div className='d-flex justify-content-between'>
          <h5>Booking Guest Details</h5>
          <div>
            {!!firebaseUser && 
              <div className='border'>
                You Had Signed In:
                <strong>
                  {firebaseUser.email}
                </strong>
              </div>
            }
          </div>
        </div>
        <OneCheckedOnly bookingForTypeReg={bookingForTypeReg} />
        {bookingForTypeReg === 'someoneElse' && 
          <div className='border'>
            Make sure you set the <strong>guest name</strong> and <strong>contact details</strong> is for who will be live to the hotel.
          </div>
        }
        <div className="GuestDetailsGroup">
          <div>
            <label>
              First Name 
              <input 
                value={firstNameReg ?? ''} 
                onChange={(e) => dispatch(setProfileFirstName({ setFirstName: e.target.value }))}
              />
            </label>
          </div>
          <div>
            <label>
              Last Name 
              <input 
                value={lastNameReg ?? ''} 
                onChange={(e) => dispatch(setProfileLastName({ setLastName: e.target.value }))}
              />
            </label>
          </div>
          <div>
            <label>
              Country / Region
              <select 
                className="CountryRegion" 
                defaultValue=""
                onChange={(e) => {                  
                  const country_code = e.target.value;
                  const country_name = countryRegionOptions.find(
                    (country) => country.code === country_code
                  );

                  dispatch(
                    setProfileCountryRegion({ 
                      setCountryCode: country_code,
                      setCountryName: country_name
                  })
                )}}
              >
                <option value="" disabled>
                  Select country/region
                </option>
                {countryRegionOptions.map((country) => (
                  <option key={country.name} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        { isUnderCompanyBusinessReg === true &&
          <div className='d-flex'>
            <div>
              <div>Company Name</div>                
              <div>
                <input 
                  type='text' 
                  value={companyNameReg ?? ''}
                  onChange={(e) => dispatch(setCompanyName({ setCompanyName: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <div>Company Registration Number</div>
              <label>
                <input 
                  type='text' 
                  value={companyRegNumReg ?? ''}
                  onChange={(e) => dispatch(setCompanyRegNum({ setCompanyRegNum: e.target.value }))}
                />
              </label>
            </div>
          </div>
        }
      </div>
      <div className="mb-3">
        <div>
          <h5>Contact</h5>
          <div className="GuestDetailsGroup">
            <div>
              <div>Email Address</div>
              <input 
                type="text" 
                value={emailReg ?? ''}
                onChange={(e) => dispatch(setProfileEmail({ setEmail: e.target.value }))}
              />
            </div>
            <div>
              <div>Phone</div>
              <div className="d-flex me-3">
                <select 
                  className="CountryTeleCode" 
                  value={telephoneRegionCodeReg ?? ''}
                  onChange={(e) => dispatch(setProfileTelRegCode({ setTeleCountryRegion: e.target.value }))}
                >
                  <option value="" disabled>
                    Phone
                  </option>
                  {countryRegionOptions.map((country) => (
                    <option key={country.code} value={country.phoneCode}>
                      {country.phoneCode} {country.name}
                    </option>
                  ))}
                </select>
                <input 
                  type="text" 
                  value={telephoneNumberReg ?? ''}
                  onChange={(e) => dispatch(setProfileTelephone({ setTelephoneNumber: e.target.value }))}
                />
              </div>
            </div>
          </div>
        </div>
          {/* <p>Input phone number exclude initial digit 0 like 0/13-323-1323</p> */}
      </div>
    </div>
  )
}

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

function ButtonNextPaymentEndpoint() {
  const bookingRegistry = useSelector(state => 
    state.PurchasePortal_FinalBookingData.CustomerDetailsnBookingHotelData);
  
  function CheckBeforeGoSettlePayment() {
    
  }

  return (
    <div>
      <button onClick={() => CheckBeforeGoSettlePayment()} >
        Next: Settle Payment
      </button>
    </div>
  )
}


export default function PurchasePortal({ BookedHotelNMainInfo }) {
  const { userProfile } = useAuth();
  const dispatch = useDispatch();
  
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

  console.log()
  return (
    <>
      <Container className="mt-4">
        <div className="FormNInfomationFrame">
          <div className="LeftPurchaseInfoForm">
            <PurchaseInfoForm userProfile={userProfile} />
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
            <ButtonNextPaymentEndpoint />
          </div>
        </div>
      </Container>
    </>
  )
}