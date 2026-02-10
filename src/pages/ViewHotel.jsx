import { Row, Col, Container, Button, Modal, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BookedList } from '../content/data transfer/bookedListContent';
import getHotelDetails from '../content/api/GetHotelDetails';
import getHotelPhoto from '../content/api/GetHotelPhoto';
import "./ViewHotel.css";

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

  function HotelRoomType() {
    return (
      <>
        <h3>Avalibility</h3>
        <Row className="">
          <Col><p><strong>Room Type</strong></p></Col>
          <Col><p><strong>Purchase for</strong></p></Col>
        </Row>
        <Col md={9}>
          <Card>
            <Card.Body>
              <Col>
                <h5>Accommodation Type</h5>
                <Row>
                  <h5>hotelname</h5>
                  <a />
                </Row>
              </Col>
              <Col>
                <h5>Price for 2 nights</h5>
                <Row>

                </Row>
              </Col>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <button>I'll reserve</button>
            </Card.Body>
          </Card>
        </Col>
      </>
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
            style={{ objectFit: 'cover' }}
            src={firstIMG ?? []} 
          />
          <img 
            width="300" height="225"
            className="hg-title hg-rt"
            style={{ objectFit: 'cover' }}
            src={secondIMG ?? []}
          />
          <img 
            width="300" height="225"
            className="hg-title hg-rb"
            style={{ objectFit: 'cover' }}
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
  const [ hotelDetailsData, setHotelDetailsData ]= useState(null);

  const hotel_name = hotelDetailsData?.data?.hotel_name ?? '';
  const address = hotelDetailsData?.data?.address ?? '';

  useEffect(() => {
    async function load() {
      const [ photos, details ] = await Promise.all(
        [
          getHotelPhoto(hotelsData),
          getHotelDetails(hotelsData, start_date, end_date, adult_pax, childAge, roomAmount)
        ]
      );

      setHotelPhotoData(photos);
      setHotelDetailsData(details);
    }

    load();

  }, []);

  console.log({hotelPhotoData: hotelPhotoData?.data[0]?.url});
  console.log({hotelDetailsData: hotelDetailsData});

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
          {
          <>          
            <h3>{}</h3>
            <p>{}</p>
            <p>{}</p>
          </>
          }
        </div>
        <LabelTag />
        <Row>
          <HotelRoomType />
        </Row>
      </Container>
    </>
  );
}