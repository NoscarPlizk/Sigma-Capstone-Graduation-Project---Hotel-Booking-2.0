import { Row, Col, Container, Button, Modal, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BookedList } from '../content/data transfer/bookedListContent';
import getHotelDetails from '../content/api/GetHotelDetails';
import getHotelPhoto from '../content/api/GetHotelPhoto';
import getRoomList from "../content/api/GetRoomList";
import getDescriptionAndInfo from "../content/api/GetDescriptionAndInfo";
import "./ViewHotel.css";
import * as Falcons from "react-icons/fa";



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

  function DescriptionDetails({ hotelDescriptionData }) {
    const script = hotelDescriptionData?.data[0]?.description ?? '';

    return (
      <div>
        <h5>Descriptions</h5>
        <p>{script}</p>
      </div>
    )
  }

  function HotelRoomType({ roomList }) {
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

    return (
      <div className="border">
        <div className="ha-tablehead">
          <h3><strong>Room Type</strong></h3>
          <h3><strong>Purchase for</strong></h3>
        </div>
        <div >
          {Rooms_AllOptions.map((everyRoom, index) => 
            (
              <div key={index} className="ha">
                <div className="hotelnreserveboxsec ha-hotelinfosec">
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
                            <HighlightsPill key={index} iconKey={label.icon} label={label.translated_name} />
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
                      <div className="">
                        {everyRoom.offers.map((offer, index) => (
                          <div key={index} className="inside-table">
                            <div className="it-guest-co table-content-row">
                                <div>{offer?.nr_adults} Adult</div> 
                                {offer?.nr_children > 0 && '+'}
                                {offer?.nr_children > 0 ? <div>{offer?.nr_children} Children</div> : <div></div>}
                            </div>
                            <div className="it-perks-co table-content-row">
                              <div>
                                {offer?.block_text.policies[2]?.content}
                              </div>
                              <div>
                                {offer?.policy_display_details?.cancellation?.title_details?.translation}
                              </div>
                            </div>
                            <div className="it-price-co table-content-row">
                              <p>Total Price</p>
                              <h5 className="all-child">
                                {offer?.product_price_breakdown?.all_inclusive_amount?.amount_unrounded}
                              </h5>
                              <p>Per Night Price</p>
                              <h5 className="all-child">
                                {offer?.product_price_breakdown?.gross_amount_per_night?.amount_unrounded}
                              </h5>
                            </div>
                            <div className="it-rooms-co table-content-button">
                              <select name="room_number" id="room_number">
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
                <div className="hotelnreserveboxsec ha-reservesec">
                  <div className="ct"> 
                    <button>I'll reserve</button>
                    {rooms_data?.[everyRoom.room_id]?.transactional_policy_objects?.map((label, index) => (
                      <p key={index}>{label.text}</p>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
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
  // const redirect = useNavigate();
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
      <Container>
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