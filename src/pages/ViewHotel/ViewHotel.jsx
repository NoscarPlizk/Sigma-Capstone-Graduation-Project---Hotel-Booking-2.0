import { Row, Col, Container, Button, Modal, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import "./ViewHotel.css";
import { BookedList } from '../../content/data transfer/bookedListContent';
import getHotelDetails from '../../content/api/GetHotelDetails';
import getHotelPhoto from '../../content/api/GetHotelPhoto';
import getRoomList from "../../content/api/GetRoomList";
import getDescriptionAndInfo from "../../content/api/GetDescriptionAndInfo";

import * as Falcons from "react-icons/fa";
import { FaChair, FaCheck, FaMoneyBill1Wave, FaPerson } from "react-icons/fa6";
import { FaChild } from "react-icons/fa";

import AvaliableFacilitiesLabel from './component/AvaliableFacilitiesLabel.jsx'
import ConvertToFarKey from './component/Sub-Function/ConvertToFarKey.js';
import SelectMenu from '../../component/SelectMenu/SelectMenu.jsx';
import DescriptionDetails from './component/DescriptionDetails.jsx';
import HotelGallery from './component/HotelGallery.jsx';


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

  function AdultorChildIcon({ amount_adults, amount_child }) {
    const AdultIcon = FaPerson;
    const ChildIcon = FaChild;

    const AdultLength = Array.from({ length: amount_adults });
    const ChildLength = Array.from({ length: amount_child });
    
    return (
      <div className="d-flex flex-wrap">
        {amount_adults > 0 
          ? <div>
              {AdultLength.map((_, index) => (
                <AdultIcon key={index} />
              ))}
            </div>
          : <div>n/a</div>
        } 
        {amount_child > 0 
          && <div className="d-flex">
              <div>+</div>
              <div>
                {ChildLength.map((_, index) => (
                  <ChildIcon key={index} />
                ))}
              </div>
            </div>
        }
      </div>
    )
  }

  function PerksListColumn({ offer, childAgeString }) {

    const breakfastword = offer?.block_text.policies[2]?.content; 
    // Enjoy a convenient breakfast at the property for EUR 37 per person, per night. 
    // Enjoy a convenient lunch at the property for EUR 81 per person, per night. 
    // Enjoy a convenient dinner at the property for EUR 135 per person, per night.
    // Breakfast EUR 999 // length: 17-20
    // Breakfast included Lunch EUR 46 Dinner EUR 62
    // console.log("breakfastword:", breakfastword);
    function HaveChargeBreakfast(breakfastword) {
        if (breakfastword === "Breakfast included") {
          return breakfastword;
        } else if (breakfastword.includes(`Breakfast included`)) {
          const SplitedString = breakfastword.split(/\s+/);
          // console.log("SplitedString:", SplitedString);
          return `${SplitedString[0]} ${SplitedString[1]} (Except Other Meals)`; 
        } else if (!breakfastword.includes(`Enjoy a convenient`)) {
          return breakfastword;
        } 

        const WordArray = breakfastword.split('. ');

        const BreakfastString = WordArray[0];
        const LunchString = WordArray[1];
        const DinnerString = WordArray[2];

        function MealReformation(StringText) {
          const CurrencyNPrice = StringText.split(' for ')[1].split(' per person')[0].split(' ');
          const Currency = CurrencyNPrice[0];
          const Price = CurrencyNPrice[1];

          const Meals = StringText.split(' ').find(element => 
            element === 'breakfast' || element === 'lunch' || element === 'dinner'
          );

          return (
            `${Meals} ${Currency} ${Price}`
          )
        }

        const BreakfastPrice = MealReformation(BreakfastString);
        const LunchPrice = MealReformation(LunchString);
        const DinnerPrice = MealReformation(DinnerString);

        const MealsObject = {
          BreakfastPrice: BreakfastPrice,
          LunchPrice: LunchPrice,
          DinnerPrice: DinnerPrice
        }

        return MealsObject;
    }

    const MealsData = HaveChargeBreakfast(breakfastword);
    const BreakfastIcon = Falcons.FaCoffee;

    const originalcancelationword = offer?.policy_display_details?.
    cancellation?.title_details?.translation;    
    function CheckOrSplitForBoldText(originalcancelationword) {
      if (!originalcancelationword) { 
        return;
      } else if (originalcancelationword === "Non-refundable") {
        return originalcancelationword;
      } else if (originalcancelationword.includes('<b>Free cancellation</b>')) {
        return originalcancelationword.split(/<\/?b>/);
      } else if (originalcancelationword.includes('Costs first night to cancel')) {
        return originalcancelationword;
      } else {
        return originalcancelationword;
      }
    };

    const splitCanceltext = CheckOrSplitForBoldText(originalcancelationword);
    const CancelationValidIcon = 
      originalcancelationword === 'Non-refundable'
      ? Falcons.FaTimes 
      : originalcancelationword === 'Costs first night to cancel'
      ? FaMoneyBill1Wave
      : Falcons.FaCheck
    ;
    
    const ChildIcon = FaChild;
    function ChildAgeFreePolicy(childAgeString, offer) {
      if (!childAgeString) return;
      const checkChildAge = childAgeString.split(',');
      const fromYoungtoOldAge = checkChildAge.sort((a, b) =>  a - b);
      // console.log("fromYoungtoOldAge", fromYoungtoOldAge);

      const offerMaxAgeForFree = offer.max_children_free_age;
      const offerChildFreeSlot = offer.nr_children;

      if ((fromYoungtoOldAge[0] <= offerMaxAgeForFree) && (offerChildFreeSlot === 1)) {
        return `Free Charge for ${offerChildFreeSlot} of your children 
        (${fromYoungtoOldAge[0]} years old)` 
      } else if ((fromYoungtoOldAge.some(childElement => childElement <= offerMaxAgeForFree)) && 
        (offerChildFreeSlot === 2)
      ) {
        return `Free Charge for ${offerChildFreeSlot} for your children 
        (${fromYoungtoOldAge[0]} and ${fromYoungtoOldAge[1]} years old)`
      } else if (offerChildFreeSlot) {
        return `Free stay for ${offerChildFreeSlot} of your children`
      }
    };
    const childAgeFreeText = ChildAgeFreePolicy(childAgeString, offer);
    
    const ExtraPerks = offer?.bundle_extras?.highlighted_text ?? '';
    const TruePerks = Falcons.FaCheck;

    return (
      <>
        <div id='breakfast'>
          {MealsData === "Breakfast included" 
            ? <span style={{ color: 'green' }}>
                <BreakfastIcon /> {MealsData}
              </span> 
            : !MealsData.includes(`Enjoy a convenient`)
            ? <span>
                <BreakfastIcon /> {MealsData} (Per Person Per Night)
              </span> 
            : <span>
                <BreakfastIcon /> {MealsData.BreakfastPrice} (Per Person Per Night)
              </span> 
            }
        </div>
        <div id='Cancelation Policies' >
          {(splitCanceltext === "Non-refundable")
            ? <div>
                <CancelationValidIcon/>{' '}{splitCanceltext}
              </div>
            : ((splitCanceltext) && (originalcancelationword.includes('<b>Free cancellation</b>')))
            ? <span style={{ color: 'green' }}>
                <CancelationValidIcon/>{' '}<b>{splitCanceltext[1]}</b>{splitCanceltext[2]}
              </span>
            : ((splitCanceltext) && (originalcancelationword === 'Costs first night to cancel')) 
            ? <div>
                <CancelationValidIcon/>{' '}{splitCanceltext}
              </div>
            : <div>
                <CancelationValidIcon/>{' '}{splitCanceltext}
              </div>
          }
        </div>
        <div id="ChildAgeFreePolicy">
          {childAgeFreeText 
            ? <span style={{ color: 'green' }}>
                <ChildIcon /> {childAgeFreeText} 
              </span> 
            : ''}
        </div>
        {ExtraPerks 
          && <div id="ExtraBundle">
              <TruePerks /> {ExtraPerks}
             </div>
        }
      </>
    )
  }

  function PurchaseEndPoint({ saveHouse, redirectPurchase }) {

    console.log("EndPoint:", saveHouse);
    
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
    console.log("SumedAmountnPrc:", SumedAmountnPrc);

    return (
      <>
        <div>
          <h5 id="amount_of_rooms">
            <strong>
            {SumedAmountnPrc.cal_allamount} rooms for 
            </strong>
          </h5>
          <div>
            <div id="currency">{}</div>
            <div id="totalprice">{SumedAmountnPrc.cal_totalprice.toFixed(2)}</div>
          </div>
          <button 
            className="finalpurchase_Button"
            onClick={() => redirectPurchase()}
          >
            I'll reserve
          </button>
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

  function HotelRoomType({ roomList, childAgeString }) {
    const [ saveHouse, setSaveHouse ] = useState([]);
    const redirect = useNavigate();

    if (!roomList) return <div>Loading....</div>;
    console.log("roomList", roomList);
    console.log({ room_photo: roomList?.data?.rooms });
    const rooms = roomList?.data?.block;
    const rooms_data = roomList?.data?.rooms;

    const redirectPurchase = () => {
      redirect('/purchaseportal');
    }

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

    function storeBookRoom(mainRoomInfo, offer, room_amount) {
      const room_am = Number(room_amount);

      setSaveHouse(prev => {
        const specExistObj = prev?.find(baseObj => 
          baseObj.base_room_id === mainRoomInfo.room_id
        );

        const currentOffArray = (prev.length === 0) 
          ? prev 
          : (specExistObj 
            ? specExistObj?.base_select_room 
            : [])

        console.log("prev", prev);
        console.log("currentOffArray:", currentOffArray);

        const baseOff = {
          amount: room_am,
          block_id: offer.block_id,
          spec_room_data: offer,
        };

        const baseObject = {
          base_room_id: mainRoomInfo.room_id,
          base_room_name: mainRoomInfo.room_name,
          base_room_surface_m2: mainRoomInfo.room_surface_in_m2,
          base_main_photos: mainRoomInfo.room_data.photos[0].url_square60,
          base_select_room: [...currentOffArray, baseOff] 
        }

        const currentSpecOff = currentOffArray.find(currentOff => 
          currentOff.block_id === baseOff.block_id
        );


        console.log("currentSpecOff:", currentSpecOff);

        
        if (!specExistObj) {
          const addNewMainObj = baseObject;
          return [...prev, addNewMainObj];


        } else if (
          (currentOffArray.length >= 1) && 
          (currentSpecOff ? currentSpecOff.amount !== baseOff.amount : false)) {

          const updatedPrev = prev.map(baseObj => {
            if (baseObj.base_room_id !== baseObject.base_room_id) return baseObj;

            return {
              ...baseObj,
              base_select_room: baseObj.base_select_room.map(currentOff => 
                currentOff.block_id === baseOff.block_id 
                ? { ...currentOff, amount: baseOff.amount } 
                : currentOff
              )
            };
          });

          console.log("updatedPrev:", updatedPrev);
          
          const roomAmount = updatedPrev
            .find(baseObj => baseObj.base_room_id === baseObject.base_room_id).base_select_room
            .find(currentOff => currentOff.block_id === baseOff.block_id).amount;

          console.log('roomAmount:', roomAmount);



          if (roomAmount === 0) {
            let updatedRemoveSpecOff = updatedPrev.map(baseObj => {
              if (baseObj.base_room_id !== baseObject.base_room_id) return baseObj;
              
              return { 
                ...baseObj, 
                base_select_room: baseObj.base_select_room.filter(specOff => 
                  specOff.block_id !== baseOff.block_id
                )
              }
            })     
          
            console.log("updatedRemoveSpecOff", updatedRemoveSpecOff);

            const isOffZero = updatedRemoveSpecOff
              .find(baseObj => baseObj.base_room_id === baseObject.base_room_id)
              .base_select_room.length;

            if (isOffZero !== 0) {
              return updatedRemoveSpecOff;

            } else if (isOffZero === 0) {      
              return updatedRemoveSpecOff.filter(baseObj => 
                baseObj.base_room_id !== baseObject.base_room_id
              )
            }
          }

          return [...updatedPrev];


        } else if (currentOffArray.length >= 1 && !currentSpecOff) {

          const updatedAddNewSpecOff = prev.map(baseObj => {
            if (baseObj.base_room_id === baseObject.base_room_id) {
              return {
                ...baseObj,
                base_select_room: [...baseObj.base_select_room, baseOff]
              }
            }

            return baseObj;
          });
          
          return [...updatedAddNewSpecOff];


        }
      });        
    }

    console.log("saveHouse:", saveHouse);
    

    // const HotelSelectDataExample = 
    //   [
    //     {
    //       base_room_id: 234234,
    //       base_room_name: salmia_deluxe_suite,
    //       base_select_room: [
    //         {
    //           amount: 3,
    //           block_id: 3233_3232_32321,
    //           spec_room_data: [
    //             {
    //               amount: room_am,
    //               block_id: offer.block_id,
    //               spec_room_data: offer,
    //             },
    //             {
    //               amount: room_am,
    //               block_id: offer.block_id,
    //               spec_room_data: offer,
    //             },
    //           ]
    //         },              
    //         {
    //           amount: 2,
    //           block_id: 8929_2341_21244,
    //           spec_room_data: [
    //             {
    //               amount: room_am,
    //               block_id: offer.block_id,
    //               spec_room_data: offer,
    //             },
    //           ],
    //         },
    //       ] 
    //     },
    //     {
    //       base_room_id: 422341,
    //       base_room_name: salmia_royal_suite,
    //       base_select_room: [
    //         {
    //           amount: 1,
    //           block_id: 7912_8312_2212,
    //           spec_room_data: [
    //             {
    //               amount: room_am,
    //               block_id: offer.block_id,
    //               spec_room_data: offer,
    //             },
    //             {
    //               amount: room_am,
    //               block_id: offer.block_id,
    //               spec_room_data: offer,
    //             },
    //           ]
    //         },              
    //         {
    //           amount: 2,
    //           block_id: 6123_1233_8999,
    //           spec_room_data: [
    //             {
    //               amount: room_am,
    //               block_id: offer.block_id,
    //               spec_room_data: offer,
    //             },
    //           ],
    //         },
    //       ] 
    //     }
    //   ] 

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
                                <p>Total Price</p>
                                <h5 className="all-child">
                                  {offer?.product_price_breakdown?.all_inclusive_amount?.currency ?? ''}
                                  {' '}
                                  {offer?.product_price_breakdown?.all_inclusive_amount?.value.toFixed(2)}
                                </h5>
                                <p>Per Night Price</p>
                                <h5 className="all-child">
                                  {offer?.product_price_breakdown?.gross_amount_per_night?.currency ?? ''}
                                  {' '}
                                  {offer?.product_price_breakdown?.gross_amount_per_night?.value.toFixed(2)}
                                </h5>
                              </div>
                              <div className="it-rooms-co table-content-button">
                                <select 
                                  name="room_number" 
                                  id="room_number" 
                                  onChange={(e) => storeBookRoom(everyRoom, offer, e.target.value)}
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
              redirectPurchase={redirectPurchase} 
            />
          </div>
        </div>
      </div>
    );  
  }

  function HouseRules() {
    return (
      <>
      </>
    )
  }

export default function ViewHotel() {
  const [ showModal, setShowModal ] = useState(false);
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

  return (
    <>        
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>
          <Card>
            <Card.Body>
              <h2>You haven't choose your Date or Room Amount Yet.</h2>
              <Button onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
      <Container className="Shell">
        <div className="SelectMenu-Resize">
          <SelectMenu />
        </div>
        <div>
          <h3>{hotelDetailsData?.data?.hotel_name ?? ''}</h3>
          <p>{hotelDetailsData?.data?.address ?? ''}</p>
        </div>
        <HotelGallery hotelPhotoData={hotelPhotoData} />
        <AvaliableFacilitiesLabel facilities={facilities} />
        <DescriptionDetails hotelDescriptionData={hotelDescriptionData} />
        <Row>
          <h3>Avalibility</h3>
          <HotelRoomType roomList={roomList} childAgeString={childAgeString}/>
        </Row>
        <HouseRules />
      </Container>
    </>
  );
}