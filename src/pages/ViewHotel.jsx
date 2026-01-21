import { Row, Col, Container, Button, Modal, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { BookedList } from '../content/hotelContent';

export default function ViewHotel() {
  const [ showModal, setShowModal ] = useState(false)
  const APIurl = useContext(BookedList).APIurl;
  const token = useContext(BookedList).token;
  const start_date = useContext(BookedList).initialDate;
  const end_date = useContext(BookedList).dueDate;
  const adult_pax = useContext(BookedList).adultPax;
  const child_pax = useContext(BookedList).childPax;
  const redirect = useNavigate();
  const { state } = useLocation(); // Layout.jsx

  const hotel_img_link = state?.img;
  const hotel_name = state?.name;
  const unit_price = state?.price;
  const location = state?.location;

  const [ room_amount, setRoom ] = useState(null);  
  let total_price = room_amount * unit_price;
  

  const inspectAuthThenBook = async (e) => {
    e.preventDefault();
    if (!token) redirect('/userauth');
    let booked_status = false;

    console.log({ Info_data: room_amount, start_date, end_date, adult_pax, child_pax })
    if (!start_date || !end_date || !room_amount) {
      console.log({ message: `MISSING START DATE, END DATE, or ROOM AMOUNT`});
      setShowModal(true);
      return;
    }

    try {
      const res = await axios.post(`${APIurl}booked`, {
        hotel_name, 
        room_amount,
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
    setRoom(room_amount + 1);
  }

  const decreaseRoomAmount = () => {
    setRoom(room_amount - 1);
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
      </Container>
    </>
  );
}