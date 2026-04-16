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

function PurchaseInfoForm() {
  return (
    <div className="PurchaseInfoForm">
      <div className="mb-3">
        <Form>
          <h5>Guest Details</h5>
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
          <h5>Booking Contact</h5>
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
      <div>
        <div>
          <h5>Who are you Booking for?</h5>
          <p>I'm the main guest</p>
          <p>I'm booking for someone else</p>
          <p>Special Request Description</p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  )
}

function MainHotelInfomation({ 
  PuchaseHotelRoomNMainInfo, dateObject, StarttoEndDateCalculate 
}) {
  const childAgeString = useContext(BookedList).childAgeString;
  // console.log("childAgeString:", childAgeString);
  
  const hotelDetailsData = PuchaseHotelRoomNMainInfo?.hotelDetailsData;
  const AllImageStore = PuchaseHotelRoomNMainInfo?.hotelPhotoData;
  const MainIMG = AllImageStore[0].url;

  const BookedRooms = PuchaseHotelRoomNMainInfo?.saveHouse;

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
            <h4>Total Days Lengths</h4>
            <div className="d-flex gap-5">
              <div>
                <p>Check In</p>
                {dateObject.start_date}
              </div>
              <div>
                <p>Check In</p>
                {dateObject.end_date}         
              </div>
              <div>
                <p>Total Day</p>
                {StarttoEndDateCalculate()} Days
              </div>
            </div>
          </div>
          <div className="border rounded-2 p-3">
            <h4>Total Price Summary</h4>
            <div>

            </div>
          </div>
          <div className="border rounded-2 p-3">
            <h4>Selected Rooms</h4>
            <div className="border rounded-3">
              {BookedRooms.length > 0 
                ? BookedRooms.map((MainRoom, index) => (
                  <div key={index} className="SelectedRoomBox">
                    <h5>{MainRoom.base_room_name ?? ''}: {}</h5>
                    <div className="d-flex flex-column gap-2">
                      {MainRoom.base_select_room.map((offers, index) => {
                        console.log("offers:", offers);
                        const OfferSpecRoomData = offers?.spec_room_data;

                        const BreakfastString = OfferSpecRoomData?.block_text.policies[2]?.content;
                        const CancelationString = OfferSpecRoomData?.policy_display_details?.cancellation?.title_details?.translation
                        
                        return (
                          <div key={index} className="SelectedRoomBox-InnerBox">
                            <div>
                              <div>
                                {HaveChargeBreakfast(BreakfastString)}
                              </div>
                              <div>
                                {SplitCancelationBoldText(CancelationString)}
                              </div>
                              <div>
                                {ChildAgeFreePolicy(childAgeString, offers) ?? ''}
                              </div>
                            </div>
                            <div className="d-flex flex-column">
                              <div></div>
                              <div></div>
                            </div>
                          </div>
                        )})}
                    </div>
                  </div>
                )) 
                : null
              }
            </div>
          </div>
        </div>
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
  

  const dateObject = {
    start_date: start_date, end_date: end_date
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
          <div className="RightMainHotelInfomation">
            <MainHotelInfomation 
              PuchaseHotelRoomNMainInfo={PuchaseHotelRoomNMainInfo}
              dateObject={dateObject} 
              StarttoEndDateCalculate={StarttoEndDateCalculate}
            />  
          </div>
        </div>
      </Container>
    </>
  )
}