import { Row, Col, Container, Button, Modal, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { BookedList } from '../content/data transfer/bookedListContent';


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

  function HotelRoomTypeCard() {
    return (
      <>
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

  

export default function ViewHotel() {
  const [ showModal, setShowModal ] = useState(false)
  const APIurl = useContext(BookedList).APIurl;
  const token = useContext(BookedList).token;
  const start_date = useContext(BookedList).initialDate;
  const end_date = useContext(BookedList).dueDate;
  const adult_pax = useContext(BookedList).adultPax;
  const child_pax = useContext(BookedList).childPax;
  const roomAmount = useContext(BookedList).roomAmount;
  const setRoomAmount = useContext(BookedList).setRoomAmount;
  const redirect = useNavigate();
  const { state } = useLocation();
  
  const hotel_img_link = state?.img;
  const hotel_name = state?.name;
  const unit_price = state?.price;
  const location = state?.location;

  let total_price = roomAmount * unit_price;
  

  
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
        <Row style={{ height: '500px' }}>
          <Col xs={8}>
            <Card>
              <Card.Body>
                <Row className="g-2">
                  <Col>
                    <img src={hotel_img_link} width="200" height="250" style={{ objectFit: 'cover' }}/>
                  </Col>
                  <Col>
                    <img src={hotel_img_link} width="200" height="250" style={{ objectFit: 'cover' }}/>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={4}>
            <h3>{hotel_name}</h3>
            <p>Description</p>
            <h4><strong>RM {unit_price}</strong> per Room</h4>
            <Row>
              <Col>
                {/* <Button onClick={}>
                  +
                </Button> */}
              </Col>
              <Col>
                <p>Room</p>
              </Col>
              <Col>
                {/* <Button onClick={}>
                  -
                </Button> */}
              </Col>
            </Row>
            <h4>Total RM: {total_price}</h4>
            {/* <Button onClick={}>
              Book Now
            </Button> */}
          </Col>
        </Row>
          <LabelTag />
        <Row>
          <HotelRoomTypeCard />
        </Row>
      </Container>
    </>
  );
}