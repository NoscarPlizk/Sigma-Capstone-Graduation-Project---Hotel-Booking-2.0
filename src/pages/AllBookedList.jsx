import { Row, Col, Card, Image, Button, Container } from "react-bootstrap";
import { BookedList } from "../content/hotelContent";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import axios from "axios";

function Booking({ hotels, selectedHotelName, 
  setSelectedHotelName, plusRoom, minusRoom, removeBooked}) {

  function toggleSelected(hotel_name, checked) {
      setSelectedHotelName(prev => {
      if (checked) return [...new Set([...prev, hotel_name])];
      return prev.filter(x => x !== hotel_name);
    });
  };

  return (
  <>
    <h2>Booked Room</h2>
    <Row id='Booked Hotel'>
      { hotels && hotels.length > 0 ?
        hotels.filter(bk => bk.booked_status === true)
        .map((bk) => {
          return (
            <Card key={bk.hotel_name} className="h-100">
              <Card.Body>
                <Row>
                  <Col md={3}>
                    <Image src={bk.hotel_img_link} width={200} height={200}/>
                  </Col>
                  <Col md={6}>
                    <Container>
                      <Row>
                        <h3>{bk.hotel_name}</h3>
                      </Row>
                      <Row className="mt-4">
                        <h5>Amount of Room: {bk.room_amount}</h5>
                        <h5>Unit Price of Room: {bk.unit_price}</h5>
                        <Col>{bk.start_date}</Col>
                        <Col>Until</Col>
                        <Col>{bk.end_date}</Col>
                      </Row>
                    </Container>
                  </Col>
                  <Col md={2}>
                    <Row>
                      <Card className="mb-3"> 
                        <Card.Body>
                          <p>Total Price: <strong>RM {bk.total_price}</strong></p>
                          {bk.booked_status === false ? 
                          <h5>Not Purchased</h5> : <h5>Purchased</h5>}
                        </Card.Body>
                      </Card>
                      <Button className="mb-3" onClick={() => removeBooked(bk.hotel_name)}>
                        Cancel Booked
                      </Button>                      
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )
        })
      :
        (<Card>
          <Container>
            <Card.Body>
              <h4>You Still had no Booked Hotel!</h4>
            </Card.Body>
          </Container>
        </Card>) 
      }
    </Row>
    <Row id='Cart List'>
      <h2>Pending for Book</h2>
      { hotels && hotels.length > 0 ?
        hotels.filter(bk => bk.booked_status === false)
        .map((bk) => (
          <Card key={bk.hotel_name}>
            <Card.Body>
              <Row>
                <Col md={1}>
                  <input
                    type="checkbox"
                    checked={selectedHotelName.includes(bk.hotel_name)}
                    disabled={bk.booked_status === true}
                    onChange={(e) => toggleSelected(bk.hotel_name, e.target.checked)}
                  />
                </Col>
                <Col md={3}>
                  <Image src={bk.hotel_img_link} width={200} height={200}/>
                </Col>
                <Col md={6}>
                  <Container>
                    <Row>
                      <h3>{bk.hotel_name}</h3>
                    </Row>
                    <Row className="mt-4">
                      <h5>Amount of Room: {bk.room_amount}</h5>
                      <h5>Unit Price of Room: {bk.unit_price}</h5>
                      <Col>{bk.start_date}</Col>
                      <Col>Until</Col>
                      <Col>{bk.end_date}</Col>
                    </Row>
                  </Container>
                </Col>
                <Col md={2}>
                  <Row>
                    <Card> 
                      <Card.Body>
                        <p>Total Price: <strong>RM {bk.total_price}</strong></p>
                        {bk.booked_status === false ? 
                        <h5>Not Purchased</h5> : <h5>Purchased</h5>}
                      </Card.Body>
                    </Card>
                  </Row>
                  <Row className="mt-3 mb-3">
                    <Button 
                      className="mt-2 mb-2" 
                      onClick={() => plusRoom(bk.room_amount, bk.unit_price, bk.hotel_name)}
                    >
                      + Plus Room
                    </Button>
                    <Button 
                      className="mt-2 mb-2" 
                      onClick={() => minusRoom(bk.room_amount, bk.unit_price, bk.hotel_name)}
                    >
                      - Minus Room
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          ))
        : 
          (<Card>
            <Container>
              <Card.Body>
                <h4>You Still had no booking yet!</h4>
              </Card.Body>
            </Container>
          </Card>) 
      }
    </Row>
  </>
  );
};

function Order({ selectedHotelName }) {
  const redirect = useNavigate();

  function executeRedirect(selectedHotelName) {
    redirect('/payment', { state: { selectedHotelName }});
  };

  return ( 
    <>
      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Button onClick={() => executeRedirect(selectedHotelName)}>
              Go Check Out
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};


export default function AllBookedList() {
  const APIurl = useContext(BookedList).APIurl;
  const token = useContext(BookedList).token;
  const redirect = useNavigate();
  const [ bookedData, setBookedData ] = useState(null);
  const [ selectedHotelName, setSelectedHotelName ] = useLocalStorage("selectedHotelName", []);
  console.log({ chooseName: selectedHotelName });

  const GetBookedData = async () => {
    try {
      const res = await axios.get(`${APIurl}getallbookeddata`);
      setBookedData(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      return console.log(error);
    }
  };

  async function plusRoom(room_amount, unit_price, hotel_name) {
    const setNum = 1;
    const newRoom_amount = room_amount + setNum;
    try {
      await axios.put(`${APIurl}increaseroom`, {setNum, hotel_name});
      await updateTotalPrice(newRoom_amount, unit_price, hotel_name);
      await GetBookedData();
    } catch (error) {
      console.log(error);
    }
  };

  async function minusRoom(room_amount, unit_price, hotel_name) {
    const setNum = 1;
    const newRoom_amount = room_amount - setNum;
    try {
      await axios.put(`${APIurl}decreaseroom`, {setNum, hotel_name});
      if (room_amount - setNum <= 0) {
        await removeBooking(hotel_name);
        return;
      }
      await updateTotalPrice(newRoom_amount, unit_price, hotel_name);
      await GetBookedData();
    } catch (error) {
      console.log(error);
    }
  };

  async function updateTotalPrice(newRoom_amount, unit_price, hotel_name) {
    const newTotal = newRoom_amount * unit_price;
    console.log({ newTotal, newRoom_amount, unit_price});
    try {
      await axios.put(`${APIurl}updatetotalprice`, {newTotal, hotel_name});
    } catch (error) {
      console.log(error);
    }
  }

  async function removeBooking(hotel_name) {
    try {
      await axios.delete(`${APIurl}deletebooking`, { data: { hotel_name } });
      await GetBookedData();
    } catch (error) {
      console.log(error);
    }
  };

  async function removeBooked(hotel_name) {
    try {
      await axios.delete(`${APIurl}deletebooked`, { data: { hotel_name } });
      await GetBookedData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log({ selectedHotelName: selectedHotelName, bookedData: bookedData })
      if ( bookedData === null ) return;
      if ( bookedData.length === 0 ) { setSelectedHotelName([]); return; }; 

      const validPending = new Set(
        bookedData.filter(bk => bk.booked_status === false).map(bk => bk.hotel_name)
      );

      setSelectedHotelName(prev => prev.filter(hotel_name => validPending.has(hotel_name)));
  }, [bookedData]);

  useEffect(() => {
    if (!token) redirect('/userauth');
    GetBookedData();
  }, []);

  return (
    <>
      <Row>
        <Col md={8}>
          <Booking 
            hotels={bookedData} 
            selectedHotelName={selectedHotelName} 
            setSelectedHotelName={setSelectedHotelName}
            plusRoom={plusRoom}
            minusRoom={minusRoom}
            removeBooked={removeBooked}
          />
        </Col>
        <Col md={4}>
          <Order selectedHotelName={selectedHotelName} />
        </Col>
      </Row>
    </>
  );
};