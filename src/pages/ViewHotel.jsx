import { Row, Col, Container, Button, Modal, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { BookedList } from '../content/hotelContent';


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
      <Row className="grid">
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
      </Row>

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
  const { state } = useLocation(); // Layout.jsx

  const hotel_img_link = state?.img;
  const hotel_name = state?.name;
  const unit_price = state?.price;
  const location = state?.location;

  let total_price = roomAmount * unit_price;
  

  const inspectAuthThenBook = async (e) => {
    e.preventDefault();
    if (!token) redirect('/userauth');
    let booked_status = false;

    console.log({ Info_data: roomAmount, start_date, end_date, adult_pax, child_pax })
    if (!start_date || !end_date || !roomAmount) {
      console.log({ message: `MISSING START DATE, END DATE, or ROOM AMOUNT`});
      setShowModal(true);
      return;
    }

    try {
      const res = await axios.post(`${APIurl}booked`, {
        hotel_name, 
        roomAmount,
        location,
        start_date, 
        end_date, 
        adult_pax, 
        child_pax, 
        hotel_img_link, 
        total_price, 
        booked_status,
        unit_price,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    redirect("/");
  };

  const increaseRoomAmount = () => {
    setRoomAmount(roomAmount + 1);
  }

  const decreaseRoomAmount = () => {
    setRoomAmount(roomAmount - 1);
  }
  
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
        <Row>
          <Col>
            <img src={hotel_img_link} width="200" height="250"/>
          </Col>
          <Col>
            <h3>{hotel_name}</h3>
            <p>Description</p>
            <h4><strong>RM {unit_price}</strong> per Room</h4>
            <Row>
              <Col>
                <Button onClick={increaseRoomAmount}>
                  +
                </Button>
              </Col>
              <Col>
                <p>{room_amount} Room </p>
              </Col>
              <Col>
                <Button onClick={decreaseRoomAmount}>
                  -
                </Button>
              </Col>
            </Row>
            <h4>Total RM: {total_price}</h4>
            <Button onClick={inspectAuthThenBook}>
              Book Now
            </Button>
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