import { useLocation } from "react-router-dom";
import { Container, Row, Col, Form } from 'react-bootstrap';
import './PurchasePortal.css';
import { useSelector, useDispatch } from "react-redux";
import { useContext } from 'react';
import { BookedList } from "../../content/data transfer/bookedListContent";

import { countryRegionOptions } from "../../content/countryRegionOptions";
import HaveChargeBreakfast from "../ViewHotel/component/PerksListRelatedFunction/SubComponent/HaveChargeBreakfast";
import SplitCancelationBoldText from "../ViewHotel/component/PerksListRelatedFunction/SubComponent/SplitCancelationBoldText";
import ChildAgeFreePolicy from "../ViewHotel/component/PerksListRelatedFunction/SubComponent/ChildAgeFreePolicy";
import PerksListColumn from "../ViewHotel/component/PerksListRelatedFunction/PerksListColumn";

function PurchaseInfoForm() {
  return (
    <div className="PurchaseInfoForm">
      <div className="mb-3">
        <Form>
          <h5>Booking Guest Details</h5>
          <div>
            <label className="mb-1"><strong>Are you Booking for?</strong></label>
            <div className="d-flex mb-3 gap-3">
              <div className="theCheckBoxStyle">
                <input type="checkbox" checked/>
                <label>I'm the main guest</label>
              </div>            
              <div className="theCheckBoxStyle">
                <input type="checkbox" />
                <label>I'm booking for someone else</label>
              </div>            
              <div className="theCheckBoxStyle">
                <input type="checkbox" />
                <label>Under Company / Business</label>
              </div>
            </div>
          </div>
          <Form.Group className="GuestDetailsGroup">
            <div>
              <Form.Label>First Name</Form.Label>
              <Form.Control />
            </div>
            <div>
              <Form.Label>Last Name</Form.Label>
              <Form.Control />
            </div>
            <div>
              <Form.Label>Country / Region</Form.Label>
              <select className="CountryRegion" defaultValue="">
                <option value="" disabled>
                  Select country/region
                </option>
                {countryRegionOptions.map((country) => (
                  <option key={country.name} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </Form.Group>
        </Form>
      </div>
      <div className="mb-3">
        <Form>
          <h5>Contact</h5>
          <Form.Group className="GuestDetailsGroup">
            <div>
              <Form.Label>Email Address</Form.Label>
              <Form.Control />
            </div>
            <div>
              <Form.Label>Phone</Form.Label>
              <div className="d-flex me-3">
                <select className="CountryTeleCode" defaultValue="">
                  <option value="" disabled>
                    Phone
                  </option>
                  {countryRegionOptions.map((country) => (
                    <option key={country.code} value={country.phoneCode}>
                      {country.phoneCode} {country.name}
                    </option>
                  ))}
                </select>
                <Form.Control />
              </div>
            </div>
          </Form.Group>
        </Form>
          {/* <p>Input phone number exclude initial digit 0 like 0/13-323-1323</p> */}
      </div>
    </div>
  )
}

function MainHotelInfomation({ 
  PuchaseHotelRoomNMainInfo, RemakeDate, StarttoEndDateCalculate 
}) {

  const { start_date, end_date } = RemakeDate;

  const adultPax = useContext(BookedList).adultPax;
  const childPax = useContext(BookedList).childPax;
  
  const hotelDetailsData = PuchaseHotelRoomNMainInfo?.hotelDetailsData;
  const AllImageStore = PuchaseHotelRoomNMainInfo?.hotelPhotoData;
  const MainIMG = AllImageStore[0].url;

  const BookedRooms = PuchaseHotelRoomNMainInfo?.saveHouse;

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

function HotelRoomList({ PuchaseHotelRoomNMainInfo }) {

  const childAgeString = useContext(BookedList).childAgeString;
  const BookedRooms = PuchaseHotelRoomNMainInfo?.saveHouse;

  
  function CountTotalRooms() {
    let all_amount_room = 0;

    BookedRooms.forEach(baseObj => {
      baseObj.base_select_room.forEach(MainRoom => {
        all_amount_room += MainRoom.amount;
      });
    });

    return all_amount_room;
  }

  function getOrdinal(n) {
    if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;

    switch (n % 10) {
      case 1: return `${n}st`;
      case 2: return `${n}nd`;
      case 3: return `${n}rd`;
      default: return `${n}th`;
    }
  }
  
  return (
    <div className="HotelRoomList">
      <h4>Selected Rooms: {CountTotalRooms()}</h4>
      <div className="border rounded-3">
      {BookedRooms.length > 0 
        && BookedRooms.map((MainRoom, index) => {

          const ContinueSequenceRoom = MainRoom.base_select_room.flatMap((offer) =>
            Array.from({ length: offer.amount }, (_, repeatIndex) => ({
              offer,
              repeatIndex,
              uniqueKey: `${offer.block_id}-${repeatIndex}`
            }))
          );
          
          console.log("ContinueSequenceRoom:", ContinueSequenceRoom);
          
          return (
            <div key={index} className="SelectedRoomBox">
              <h5 className="">{MainRoom.base_room_name ?? ''}</h5>
              <div className="d-flex flex-column gap-3">
                {ContinueSequenceRoom.map(({ offer, uniqueKey }, index) => {
                  
                  // console.log("offers:", offers);

                  // const RoomAmount = offers?.amount;

                  const OfferSpecRoomData = offer?.spec_room_data;
                  // console.log("OfferSpecRoomData", OfferSpecRoomData);

                  const BreakfastString = OfferSpecRoomData?.
                    block_text.policies[2]?.content ?? '';
                  const CancelationString = OfferSpecRoomData?.policy_display_details?.
                    cancellation?.title_details?.translation ?? '';
                  
                  const amount_adults = OfferSpecRoomData?.nr_adults;
                  const amount_childs = OfferSpecRoomData?.nr_children;

                  const OfferPriceCurrency = OfferSpecRoomData?.
                    product_price_breakdown?.all_inclusive_amount?.currency ?? 'N/A';

                  const OfferPriceTaxInclude = OfferSpecRoomData?.
                    product_price_breakdown?.all_inclusive_amount?.value?.toFixed(2) ?? '';

                  return (
                    <div key={uniqueKey} className="SelectedRoomBox-InnerBox">
                      <div>
                        <div>{getOrdinal(index + 1)}</div>
                      </div>
                      <div className="d-flex flex-column w-100 gap-3">
                        <div className="">
                          <PerksListColumn 
                            offer={OfferSpecRoomData} 
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
                              <label>Main Guest: </label>
                              <div>
                                <button>Type Name</button>
                              </div>
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


export default function PurchasePortal() {
  const { state } = useLocation();
  const PuchaseHotelRoomNMainInfo = state;

  // {
  //   hotelDetailsData: hotelDetailsData.data,
  //   hotelPhotoData: hotelPhotoData.data,
  //   saveHouse: saveHouse
  // }
      
  console.log("PuchaseHotelRoomNMainInfo:", PuchaseHotelRoomNMainInfo);
  const start_date = useContext(BookedList).initialDate;
  const end_date = useContext(BookedList).dueDate;
  
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

  console.log()
  return (
    <>
      <Container className="mt-4">
        <div className="FormNInfomationFrame">
          <div className="LeftPurchaseInfoForm">
            <PurchaseInfoForm />
          </div>
          <div className="LeftHotelRoomList">
            <HotelRoomList PuchaseHotelRoomNMainInfo={PuchaseHotelRoomNMainInfo} />
          </div>
          <div className="RightMainHotelInfomation">
            <MainHotelInfomation 
              PuchaseHotelRoomNMainInfo={PuchaseHotelRoomNMainInfo}
              RemakeDate={RemakeDate()} 
              StarttoEndDateCalculate={StarttoEndDateCalculate}
            />  
          </div>
        </div>
      </Container>
    </>
  )
}