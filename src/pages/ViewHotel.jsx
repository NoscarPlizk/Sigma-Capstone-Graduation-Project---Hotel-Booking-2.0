import { Row, Col, Container, Button, Modal, Card } from "react-bootstrap";
import { useNavigate, useLocation, redirect } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BookedList } from '../content/data transfer/bookedListContent';
import getHotelDetails from '../content/api/GetHotelDetails';
import getHotelPhoto from '../content/api/GetHotelPhoto';
import getRoomList from "../content/api/GetRoomList";
import getDescriptionAndInfo from "../content/api/GetDescriptionAndInfo";
import SelectMenu from "../component/SelectMenu/SelectMenu";
import "./ViewHotel.css";
import * as Falcons from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { FaChild } from "react-icons/fa";



  function HotelGallery({ hotelPhotoData }) {
    
    const firstIMG = hotelPhotoData?.data[0]?.url;
    const secondIMG = hotelPhotoData?.data[1]?.url;
    const thirdIMG = hotelPhotoData?.data[2]?.url;

    const maxthumshow = 8;
    const thumbIMG = hotelPhotoData?.data?.slice(3, 3 + maxthumshow) ?? [];

    return (
      <>
        <div className="hg">
          <img 
            width="600" height="450" 
            className="hg-title hg-main"
            src={firstIMG ?? []} 
          />
          <img 
            width="300" height="225"
            className="hg-title hg-rt"
            src={secondIMG ?? []}
          />
          <img 
            width="300" height="225"
            className="hg-title hg-rb"
            src={thirdIMG ?? []}
          />
          <div className="hg-thumbs" >
            {thumbIMG.map((everyPhoto, index) => {
              return (
                <img 
                  className="hg-thumb"
                  key={index}
                  src={everyPhoto.url}
                />
              )
            })
            }
          </div>
        </div>
      </>
    )
  }

  function convertToFarKey(iconKey) {
    const newWord = 
      "Fa" + iconKey
      .toLowerCase()
      .split(/[_\-\s]+/)
      .map(string => string ? string[0].toUpperCase() + string.slice(1) : "" )
      .join("");
    return newWord;
  }

  function LabelTag({ facilities }) {
    return (
      <div>
        <h4>Avaliable Facilities</h4>
        <div className="lg-container">
          {facilities.map((label, index) => {
          const farKey = convertToFarKey(label.icon); 
          const Icon = Falcons[farKey] ?? 'div';
          return (
            <div key={index} className="lg-child">
              <div>
                <Icon aria-hidden="true" />
              </div>
              <div>
                <p>{label.name}</p>
              </div>
            </div>
          )})}
        </div>
      </div>
    );
  }

  function HighlightsPill({ iconKey, label }) {
    // console.log({iconKey: iconKey});
    // console.log({label: label});

    const farKey = convertToFarKey(iconKey); 
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
    return (
      <div>
        {amount_adults > 0 
          ? <div>
              {amount_adults} <FaPerson />
            </div> 
          : <div>n/a</div>
        }
        {amount_child > 0
          ? <div>
              + {amount_child} <FaChild />
            </div>
          : <div></div>
        }
      </div>
    )
  }

  function DescriptionDetails({ hotelDescriptionData }) {
    return (
      <div>
        <h5>Descriptions</h5>
        {hotelDescriptionData?.data
          .filter(element => element.descriptiontype_id === 6)
          .map((script) => (
            <p key={script.descriptiontype_id}>{script.description}</p>
        ))}
      </div>
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

      console.log("nested_object:", nested_object);

      return nested_object;
    }

    const SumedAmountnPrc = SumAllSelRoomAmtNPrc();
    
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
                        {baseOff?.spec_room_data?.nr_adults 
                          ? <div>{baseOff?.spec_room_data?.nr_adults} Adult</div>
                          : <div>n/a</div>
                        }
                        {baseOff?.spec_room_data?.nr_children > 0 
                          ? <div>
                              <div>'+'</div>
                              <div>{baseOff?.spec_room_data?.nr_children} Children</div> 
                            </div>
                          : <div></div>
                        }
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

  function HotelRoomType({ roomList }) {
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
                                <div>
                                  {offer?.block_text.policies[2]?.content}
                                </div>
                                <div>
                                  <p>{offer?.policy_display_details?.cancellation?.title_details?.translation}</p>
                                </div>
                              </div>
                              <div className="it-price-co table-content-row">
                                <p>Total Price</p>
                                <h5 className="all-child">
                                  {offer?.product_price_breakdown?.all_inclusive_amount?.value.toFixed(2)}
                                </h5>
                                <p>Per Night Price</p>
                                <h5 className="all-child">
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
          getHotelDetails(hotelsData, start_date, end_date, adult_pax, childAgeString, roomAmount),
          getRoomList(hotelsData, start_date, end_date, adult_pax, childAgeString, roomAmount),
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
        <LabelTag facilities={facilities} />
        <DescriptionDetails hotelDescriptionData={hotelDescriptionData} />
        <Row>
          <h3>Avalibility</h3>
          <HotelRoomType roomList={roomList} />
        </Row>
        <HouseRules />
      </Container>
    </>
  );
}