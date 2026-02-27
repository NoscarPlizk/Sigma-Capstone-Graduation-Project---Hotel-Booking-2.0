import { Row, Col, Container, Button, Modal, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BookedList } from '../content/data transfer/bookedListContent';
import getHotelDetails from '../content/api/GetHotelDetails';
import getHotelPhoto from '../content/api/GetHotelPhoto';
import getRoomList from "../content/api/GetRoomList";
import "./ViewHotel.css";
import * as Falcons from "react-icons/fa";

  function ChildLabel({a, b}) {
    return (
      <Col>
        <Card>
          <Card.Body>
            <h5>{a}</h5>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <h5>{b}</h5>
          </Card.Body>
        </Card>
      </Col>
    );
  }

  function LabelTag() {
    return (
      <Row>
        <ChildLabel a={'Apartment'} b={'View'}/>
        <ChildLabel a={'Outdoor swimming pool'} b={'Air conditioning'}/>
        <ChildLabel a={'Free on-site parking'} b={'Family rooms'}/>
        <ChildLabel a={'Restaurant'} b={'Shower'}/>
        <ChildLabel a={'Private bathroom'} b={'Free Wifi'}/>
      </Row>
    );
  }

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

  function convertToFarKey(iconKey) { // wifi
    const newWord = 
    "Fa" + iconKey
    .toLowerCase()
    .split(/[_\-\s]+/)
    .map(string => string ? string[0].toUpperCase() + string.slice(1) : "" )
    .join("");
    return newWord;
  }

  function HighlightsPill({ iconKey, label }) {
    console.log({iconKey: iconKey});
    console.log({label: label});
    const farKey = convertToFarKey(iconKey); 
    console.log({farKey: farKey});
    const Icon = Falcons[farKey];
    console.log({Icon: Icon});

    if (!Icon) {
      console.log({NoIcon: Icon}); 
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

  function FacilitiesPill({ name }) {
    console.log(name);
    return (
      <span className="facilities-pill">
        <Falcons.FaCheck />
        {name}
      </span>
    )
  };

  function HotelRoomType({ roomList }) {
    console.log({ room_photo: roomList?.data?.rooms });
    const access_rooms = roomList?.data?.rooms;

    return (
      <div className="border">
        <div className="ha-tablehead">
          <h3><strong>Room Type</strong></h3>
          <h3><strong>Purchase for</strong></h3>
        </div>
          {roomList?.data?.block?.map((rooms, index) => (
          <div className="ha" key={index}>
            <div className="hotelnreserveboxsec ha-hotelinfosec">
              <h4>{rooms.room_name}</h4>
              <div className="ct">
                <div className="ct-left">
                  <img 
                    className="ha-hoinsecimage"
                    src={access_rooms?.[rooms.room_id]?.photos[0]?.url_original ?? []}
                  />
                  <div>
                    {access_rooms?.[rooms.room_id]?.bed_configurations[0]?.bed_types.map((label, index) => (
                    <div key={index}>
                      <p><strong>{label.name_with_count}</strong></p>
                    </div>
                    ))}
                  </div>
                </div>
                <div className="ct-right">
                  <div className="mb-2">
                    {access_rooms?.[rooms.room_id]?.highlights?.map((label, index) => (
                      <HighlightsPill key={index} iconKey={label.icon} label={label.translated_name} />
                    ))}
                  </div>
                  <div>
                    {access_rooms?.[rooms.room_id]?.facilities?.map((label, index) => (
                      <FacilitiesPill key={index} name={label.name} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="my-2">
                {access_rooms?.[rooms.room_id]?.description}
              </div>
            </div>
            <div className="hotelnreserveboxsec ha-reservesec">
              <div className="ct"> 
                <button>I'll reserve</button>
              </div>
            </div>
          </div>
          ))}      
      </div>
    );  
  }

export default function ViewHotel() {
  const [ showModal, setShowModal ] = useState(false);
  const APIurl = useContext(BookedList).APIurl;
  // const token = useContext(BookedList).token;
  const start_date = useContext(BookedList).initialDate;
  const end_date = useContext(BookedList).dueDate;
  const adult_pax = useContext(BookedList).adultPax;
  const childAge = useContext(BookedList).childAge;
  const roomAmount = useContext(BookedList).roomAmount;
  // const redirect = useNavigate();
  const { state } = useLocation();

  const hotelsData = state?.hotels;

  // const checkToken = () => {
  //   if (token.length === null) redirect('/userauth');
  // }

  const [ hotelPhotoData, setHotelPhotoData ] = useState(null);
  const [ hotelDetailsData, setHotelDetailsData ] = useState(null);
  const [ roomList, setRoomList ] = useState(null);

  const hotel_name = hotelDetailsData?.data?.hotel_name ?? '';
  const address = hotelDetailsData?.data?.address ?? '';

  useEffect(() => {
    async function load() {
      const [ photos, details, roomlists ] = await Promise.all(
        [
          getHotelPhoto(hotelsData),
          getHotelDetails(hotelsData, start_date, end_date, adult_pax, childAge, roomAmount),
          getRoomList(hotelsData, start_date, end_date, adult_pax, childAge, roomAmount)
        ]
      );

      setHotelPhotoData(photos);
      setHotelDetailsData(details);
      setRoomList(roomlists);
    }

    load();

  }, []);

  console.log({hotelPhotoData: hotelPhotoData?.data[0]?.url});
  console.log({hotelDetailsData: hotelDetailsData});
  console.log({roomList: roomList});

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
          <h3>{hotel_name}</h3>
          <p>{address}</p>
        </div>
        <HotelGallery hotelPhotoData={hotelPhotoData} />
        <div>
          {/* {
          <>          
            <h3>{}</h3>
            <p>{}</p>
            <p>{}</p>
          </>
          } */}
        </div>
        <LabelTag />
        <Row>
          <h3>Avalibility</h3>
          <HotelRoomType roomList={roomList} />
        </Row>
      </Container>
    </>
  );
}