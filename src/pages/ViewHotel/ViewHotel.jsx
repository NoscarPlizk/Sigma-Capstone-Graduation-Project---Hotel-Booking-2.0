import { Row, Col, Container, Button, Modal, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { storeBookRoom } from "./Redux/StoreBookingRoom/BookingSlice_ViewHotel.js";
// import { openModal, closeModal } from './Redux/ShowModal/ModalShowSlice.js'

import "./ViewHotel.css";
import { BookedList } from '../../content/data transfer/bookedListContent';
import getHotelDetails from '../../content/api/GetHotelDetails';
import getHotelPhoto from '../../content/api/GetHotelPhoto';
import getRoomList from "../../content/api/GetRoomList";
import getDescriptionAndInfo from "../../content/api/GetDescriptionAndInfo";

import * as Falcons from "react-icons/fa";
import { FaChair, FaCheck, FaHeart, FaMoneyBill1Wave, FaPerson, FaPlane, FaShare, FaWifi } from "react-icons/fa6";
import { FaChild } from "react-icons/fa";

import PurchasePortal from "../PurchasePortal/PurchasePortal.jsx";

import AvaliableFacilitiesLabel from './component/AvaliableFacilitiesLabel.jsx'
import SelectMenu from '../../component/SelectMenu/SelectMenu.jsx';
import DescriptionDetails from './component/DescriptionDetails.jsx';
import HotelGallery from './component/HotelGallery.jsx';
import PerksListColumn from "./component/PerksListRelatedFunction/PerksListColumn.jsx";

import ConvertToFarKey from './component/Sub-Function/ConvertToFarKey.js';
import HaveChargeBreakfast from "./component/PerksListRelatedFunction/SubComponent/HaveChargeBreakfast.jsx";
import SplitCancelationBoldText from "./component/PerksListRelatedFunction/SubComponent/SplitCancelationBoldText.jsx";
import ChildAgeFreePolicy from "./component/PerksListRelatedFunction/SubComponent/ChildAgeFreePolicy.jsx";
import SplitNoPaymentBoldText from "./component/PerksListRelatedFunction/SubComponent/SplitNoPaymentBoldText.jsx";
import AdultorChildIcon from "./component/AdultorChildIcon.jsx";

  function HighlightsPill({ iconKey, label }) {
    // console.log({iconKey: iconKey});
    // console.log({label: label});

    const farKey = ConvertToFarKey(iconKey); 
    // console.log({farKey: farKey});
    const Icon = Falcons[farKey];
    // console.log({Icon: Icon});

    if (!Icon) {
      // console.log({NoIcon: Icon}); 
      return(
      <span className="highlights-pill">{label}</span>
    )};

    return (
      <span className="highlights-pill">
        <Icon className="pill-icon" aria-hidden="true" />
        {label}
      </span>
    )
  };

  function PurchaseEndPoint({ saveHouse, currency, setOpenModalPurchasePortal }) {
    // const dispatch = useDispatch(); 
    // console.log("EndPoint:", saveHouse);
    
    function SumAllSelRoomAmtNPrc() {
      let cal_allamount = 0;
      let cal_totalprice = 0;

      saveHouse.forEach(baseObj => {        
        baseObj.base_select_room.forEach(baseOff => {
          cal_allamount += baseOff.amount;
        });
      });

      saveHouse.forEach(baseObj => {        
        baseObj.base_select_room.forEach(baseOff => {
          const valueofPrice = baseOff.amount * Number(
            baseOff?.
            spec_room_data?.
            product_price_breakdown?.
            all_inclusive_amount?.
            value?.
            toFixed(2)
          );

          cal_totalprice += valueofPrice;
        });
      });

      const nested_object = {
        cal_allamount: cal_allamount,
        cal_totalprice: cal_totalprice
      }

      return nested_object;
    }

    const SumedAmountnPrc = SumAllSelRoomAmtNPrc();
    // console.log("SumedAmountnPrc:", SumedAmountnPrc);

    return (
      <>
        <div>
          {SumedAmountnPrc.cal_allamount 
            ? <div>            
                <h5 id="amount_of_rooms">
                  <strong>
                  {SumedAmountnPrc.cal_allamount} rooms for 
                  </strong>
                </h5>
                <div className="ep-TotalPricePurchase">
                  {currency}{' '}{SumedAmountnPrc.cal_totalprice.toFixed(2)}
                </div>
              <button 
                className="finalpurchase_Button"
                onClick={() => setOpenModalPurchasePortal(true)}
              >
                I'll reserve
              </button>
              </div>
            : <div>
                <h5>Please select the rooms to book.</h5>
              </div>
          }

        </div>
        <div>
          {saveHouse.length > 0 
          ? saveHouse.map((baseObj, index) => (
              <div key={index} className="ep-mainroomframe">
                <div className="ep-offroomtitle">
                  <img 
                    src={baseObj?.base_main_photos ?? ''} 
                    alt={`image of ${baseObj?.base_room_name ?? 'n/a'}`}
                    width='60' height='60'
                  />
                  <h5>{baseObj?.base_room_name ?? 'n/a'}</h5>
                </div>
                <div>
                  {baseObj.base_select_room.map((baseOff, index) => 
                    <div key={index} className="ep-offroomlist">
                      <div className="pax-co">
                        <AdultorChildIcon
                          amount_adults={baseOff.spec_room_data?.nr_adults}
                          amount_child={baseOff.spec_room_data?.nr_children}
                        />
                      </div>
                      <div className="room_amt-co">
                        {baseOff?.amount} X rooms
                      </div>  
                      <div className="price-co">
                        {baseOff?.spec_room_data?.product_price_breakdown?.
                            all_inclusive_amount?.currency ?? ''}
                        {' '}
                        { baseOff.amount > 1 
                          ? baseOff?.spec_room_data?.product_price_breakdown?.
                            all_inclusive_amount?.value?.toFixed(2) * baseOff.amount
                          : baseOff?.spec_room_data?.product_price_breakdown?.
                            all_inclusive_amount?.value?.toFixed(2) 
                        }
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          : ''}
        </div>  
      </>
    )
  }

  function HotelRoomType({ roomList, childAgeString, currency, setOpenModalPurchasePortal }) {

    const dispatch = useDispatch();
    const saveHouse = useSelector(state => state.viewhotel_selectbooking.saveHouse);

    if (!roomList) return <div>Loading....</div>;
    console.log("roomList", roomList);
    console.log({ room_photo: roomList?.data?.rooms });
    const rooms = roomList?.data?.block;
    const rooms_data = roomList?.data?.rooms;

    console.log("rooms_in_SingleListRoomsBox:", rooms);
    function processingAllOption(rooms, rooms_data) {
      if (!rooms || !rooms_data) return [];
      const map = new Map();
      for (const room of rooms) {
        const roomId = room.room_id;
        if (!map.has(roomId)) map.set(roomId, []);
        map.get(roomId).push(room);
      }
      console.log("First_map:", map);
      const data = Array.from(map, ([roomId, roomSelection]) => {
        const base = roomSelection[0];
        return {
          room_id: roomId,
          room_name: base.room_name,
          room_surface_in_m2: base.room_surface_in_m2,
          room_data: rooms_data[roomId],
          offers: roomSelection,
        }
      })

      return data;
    }
  
    const Rooms_AllOptions = processingAllOption(rooms, rooms_data);
    
    console.log("Rooms_AllOptions:", Rooms_AllOptions);

    console.log("saveHouse:", saveHouse);

    return (
      <div className="border">
        <div className="ha-tablehead">
          <h3><strong>Room Type</strong></h3>
          <h3><strong>Purchase for</strong></h3>
        </div>
        <div className="ha">
          <div className="ha-hotelinfosec">
            {Rooms_AllOptions.map((everyRoom, index) => 
              (
                <div key={index}>
                  <div className="hotelnreserveboxsec">
                    <h4>{everyRoom.room_name}</h4>
                    <div className="ct">
                      <div className="ct-left">
                        <img 
                          className="ha-hoinsecimage"
                          src={everyRoom?.room_data?.photos[0]?.url_original ?? []}
                        />
                        <div>
                          <div>
                          {everyRoom?.room_data?.bed_configurations[0]?.bed_types.map((label, index) => (
                            <div key={index}>
                              <p><strong>{label.name_with_count}</strong></p>
                            </div>
                          ))}
                          </div>
                          <div className="my-3">
                            {everyRoom?.room_data?.description}
                          </div>
                          <div className="my-3">
                            {everyRoom?.room_data?.highlights?.map((label, index) => (
                              <HighlightsPill 
                                key={index} 
                                iconKey={label.icon} 
                                label={label.translated_name}
                              />
                            ))}
                          </div>
                          <div className="my-3">
                            {everyRoom?.room_data?.facilities?.map((label, index) => (
                              <span key={index} className="facilities-pill">
                                <Falcons.FaCheck />
                                {label.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="ct-right">
                        <div className="inside-table-header">
                          <p className="ith-guest">Number of Guests</p>
                          <p className="ith-perks">Your Perks</p>
                          <p className="ith-price">Price</p>
                          <p className="ith-rooms">Select Rooms</p>
                        </div>
                        <div>
                          {everyRoom.offers.map((offer, index) => (
                            <div key={index} className="inside-table">
                              <div className="it-guest-co table-content-row">
                                  <AdultorChildIcon 
                                    amount_adults={offer?.nr_adults}
                                    amount_child={offer?.nr_children}
                                  />
                              </div>
                              <div className="it-perks-co table-content-row">
                                <PerksListColumn 
                                  offer={offer} 
                                  childAgeString={childAgeString} 
                                />
                              </div>
                              <div className="it-price-co table-content-row">
                                <div>
                                  <p>Total Price</p>
                                  {offer?.product_price_breakdown?.all_inclusive_amount?.currency ?? ''}                
                                  <h5>
                                    {offer?.product_price_breakdown?.all_inclusive_amount?.value.toFixed(2)}
                                  </h5>  
                                </div>
                                <div>
                                  <p>Per Night Price</p>
                                  {offer?.product_price_breakdown?.gross_amount_per_night?.currency ?? ''}
                                  <h5>
                                    {offer?.product_price_breakdown?.gross_amount_per_night?.value.toFixed(2)}
                                  </h5>
                                </div>
                              </div>
                              <div className="it-rooms-co table-content-button">
                                <select 
                                  name="room_number" 
                                  id="room_number" 
                                  onChange={(e) => 
                                    dispatch(
                                      storeBookRoom({
                                        mainRoomInfo: everyRoom, 
                                        offer, 
                                        roomAmount: e.target.value,
                                      })
                                  )}
                                >
                                  <option value="0">0</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                                </select>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="hotelnreserveboxsec ha-reservesec">
            <PurchaseEndPoint 
              saveHouse={saveHouse} 
              currency={currency}
              setOpenModalPurchasePortal={setOpenModalPurchasePortal}
            />
          </div>
        </div>
      </div>
    );  
  }

  
export default function ViewHotel() {
  const APIurl = useContext(BookedList).APIurl;
  // const token = useContext(BookedList).token;
  const currency = useContext(BookedList).currency;
  const start_date = useContext(BookedList).initialDate;
  const end_date = useContext(BookedList).dueDate;
  const adult_pax = useContext(BookedList).adultPax;
  const childAgeString = useContext(BookedList).childAgeString;
  const roomAmount = useContext(BookedList).roomAmount;
  const { state } = useLocation();

  const hotelsData = state?.hotels;
  console.log("hotelsData", hotelsData);

  // const checkToken = () => {
  //   if (token.length === null) redirect('/userauth');
  // }

  const [ openModalPurchasePortal, setOpenModalPurchasePortal ] = useState(false);

  const [ hotelPhotoData, setHotelPhotoData ] = useState(null);
  const [ hotelDetailsData, setHotelDetailsData ] = useState(null);
  const [ hotelDescriptionData, setHotelDescriptionData ] = useState(null);
  const [ roomList, setRoomList ] = useState(null);

  const facilities = hotelDetailsData?.data?.facilities_block?.facilities ?? [];
  console.log("facilities:", facilities);
  const hotelId = state?.hotels?.hotel_id;
  console.log("hotelId", hotelId);

  useEffect(() => {
    async function load() {
      const [ photos, details, roomlists, description ] = await Promise.all(
        [
          getHotelPhoto(hotelsData),
          getHotelDetails(hotelsData, start_date, end_date, adult_pax, childAgeString, roomAmount, currency),
          getRoomList(hotelsData, start_date, end_date, adult_pax, childAgeString, roomAmount, currency),
          getDescriptionAndInfo(hotelId)
        ]
      );

      setHotelPhotoData(photos);
      setHotelDetailsData(details);
      setRoomList(roomlists);
      setHotelDescriptionData(description);
    }

    load();

  }, []);

  console.log("hotelPhotoData:", hotelPhotoData?.data[0]?.url);
  console.log("hotelDetailsData:", hotelDetailsData);
  console.log("roomList:", roomList);
  console.log("hotelDescriptionData:", hotelDescriptionData);

  const BookedHotelNMainInfo = {
    hotelDetailsData: hotelDetailsData?.data,
    hotelPhotoData: hotelPhotoData?.data,
    selectedRooms: useSelector(state => state.viewhotel_selectbooking.saveHouse),
    checkInNOutDate: {
      start_date: start_date,
      end_date: end_date
    }
  }
    
  return (
    <>        
      <Modal 
        dialogClassName="ModalPurchasePortal"
        show={openModalPurchasePortal} 
        onHide={() => setOpenModalPurchasePortal(false)}
      >
        <Modal.Body>
          <div className="d-flex justify-content-end">
            <button onClick={() => setOpenModalPurchasePortal(false)}> x </button>
          </div>
          <PurchasePortal BookedHotelNMainInfo={BookedHotelNMainInfo} />
        </Modal.Body>
      </Modal>
      <Container className="Shell">
        <div className="SelectMenu-Resize">
          <SelectMenu />
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <div className="mt-2 mb-2">
              {hotelDetailsData?.data?.rawData?.accuratePropertyClass
                &&  Array.from({ length: hotelDetailsData?.data?.rawData?.accuratePropertyClass },
                    (_, index) => (
                      <span key={index}>⭐</span>
                    ))
              }
            </div>
            <h3>{hotelDetailsData?.data?.hotel_name ?? ''}</h3>
            <p>{hotelDetailsData?.data?.address ?? ''}</p>
          </div>
          <div>
            <div>
              <FaHeart />
              <FaShare />
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <h5 className="me-2">{hotelDetailsData?.data?.rawData?.reviewScoreWord}</h5>
              <div className="">
                {hotelDetailsData?.data?.rawData?.reviewScore}
              </div>
            </div>
          </div>
        </div>
        <HotelGallery hotelPhotoData={hotelPhotoData} />
        <AvaliableFacilitiesLabel facilities={facilities} />
        <DescriptionDetails hotelDescriptionData={hotelDescriptionData} />
        <Row>
          <h3>Avalibility</h3>
          <HotelRoomType
            roomList={roomList} 
            childAgeString={childAgeString} 
            currency={currency} 
            setOpenModalPurchasePortal={setOpenModalPurchasePortal}
          />
        </Row>
      </Container>
    </>
  );
}