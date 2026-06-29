import { useContext, useEffect, useState } from 'react';
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
  // setMainHotelData,
  // setProfileFirstMainGuestNameRoom,
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

import MainHotelInfomation from '../../component/MainHotelInfomation';

function HotelRoomList({ bookingRegistry }) {
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

  const DifferenceMainRoomBundle = bookingRegistry.main_hotel_booked.select_room_offers;

  const childAgeString = useContext(BookedList).childAgeString;

  function CountAllTotalRooms() {
    let all_amount_room = 0;

    DifferenceMainRoomBundle.forEach(baseObj => {
      baseObj.base_select_room.forEach(MainRoom => {
        all_amount_room += Number(MainRoom.amount);
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
      <h4>Selected Rooms: {CountAllTotalRooms()}</h4>
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
                                        uniqueKey: uniqueKey,
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
        Settle Payment
      </button>
    </div>
  )
}


export default function GuestnHotelDetailsPortal({ bookingRegistry, setSubPage }) {
  const { userProfile } = useAuth();

  const BookingType = bookingRegistry.main_guest_name.guest_booking_for_type;

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
    country_region_name: false,
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

    return setSubPage('StripePaymentPage');
  }

  return (
    <div className='FormNInfomationFrame'>
      <div className="PurchaseInfoForm">
        <PurchaseInfoForm 
          userProfile={userProfile} 
          DetectedTouch={DetectedTouch}
          isError={isError}
          VarValueBeforeSubmitState={VarValueBeforeSubmitState}
        />
      </div>
      <div className="HotelRoomList">
        <HotelRoomList bookingRegistry={bookingRegistry} />
      </div>
      <div className='ButtonNextPaymentEndpoint'>
        <ButtonNextPaymentEndpoint 
          CheckBeforeGoSettlePayment={CheckBeforeGoSettlePayment}
        />
      </div>
    </div>
  )
}