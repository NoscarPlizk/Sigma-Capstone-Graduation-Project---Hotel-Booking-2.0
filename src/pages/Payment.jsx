import { Form, Row, Col, Button, Container, Card, Spinner } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { BookedList } from "../content/hotelContent";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function BookedCardList({ data, hotel_name }) {
  const APIurl = useContext(BookedList).APIurl;
  const redirect = useNavigate();

  const confirmBook = async () => {
    try {
      const booked_status = true;
      const res = await axios.put(`${APIurl}placebookhotel`, { booked_status, hotel_name });
      console.log(res.data);
      redirect('/');
    } catch (error) {
      return console.log(error);
    }
  };

  return ( 
    <Card>
      <Container>
        <Card.Body>
          { data && data.length > 0 ?
            data.filter(bk => bk.booked_status === false )
            .map((bk) => { 
            return (
              <Row key={bk.id}>
                <Card className="d-flex"> 
                  <Card.Body>
                    <Row>
                      <Col md={8}>
                        <p>Hotel: {bk.hotel_name}</p>
                        <p>Start Date: <strong>{bk.start_date}</strong> to <strong>{bk.end_date}</strong> </p>
                        <p>{bk.adult_pax} Adults and {bk.child_pax} Children, Total: {bk.adult_pax * bk.child_pax} Person</p>  
                      </Col>
                      <Col md={4}>
                        <h3>RM {bk.total_price} per night</h3>                
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Row>
            )}) 
          : 
            <Card>
              <Card.Body>
                <Spinner variant='primary' />
                <h3>Loading</h3>
              </Card.Body>
            </Card>
          }
          <Button className="mt-3" onClick={confirmBook}> 
            Place Order
          </Button>
        </Card.Body>
      </Container>
    </Card>
  )
};

export default function Payment() {
  const APIurl = useContext(BookedList).APIurl;
  const token = useContext(BookedList).token;
  const [ bookedData, setBookedData ] = useState(null);
  const redirect = useNavigate();
  const { state } = useLocation();
  const hotel_name = state?.selectedHotelName;
  console.log("hotel_name:", hotel_name);

  const placeOrderSelected = async () => {
    if (hotel_name.length === 0) return redirect('/allbookedlist');
    try {
      const res = await axios.get(`${APIurl}tickedhotelid`, { params: { hotel_name } });
      {res.data === res.data.message ? 
        setBookedData(null) : setBookedData(res.data)
      }  
    } catch (error) {
      return console.log(error);
    }
  }

  useEffect(() => {
    if (!token) redirect('/userauth');
    placeOrderSelected();
  }, []);

  return (
    <Row className="mt-3">
      <Col md={8}> 
        <Container>
          <Card className="mb-3">
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Guest Details
                  </Form.Label>
                  <Form.Control type='text' required placeholder="Full Legal Name Should Same as Passport Name"/>
                  <Form.Control type='text' required placeholder="Email Address" />
                  <Form.Control type='text' required placeholder="Phone Number" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Credit Card Details
                  </Form.Label>
                  <Form.Control type='number' required max="12" placeholder="Card Number"/>
                  <Form.Control type='number' required max="5" placeholder="Expiry Date" />
                  <Form.Control type='number' required max="3" placeholder="CVS Code" />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Container>
        <Container>
          <Card className="mt-3 mb-3">
            <Card.Body>
              <h3>Cancelation Policy</h3>
              <p>Free Cancelation before Nov 30</p>
            </Card.Body>
          </Card>
          <Card className="mt-3 mb-3">
            <Card.Body>
              <h3>Ground rules</h3>
              <p>We ask every Guest the basic infomation to secure the side of customer and the hotel</p>
            </Card.Body>
          </Card>
        </Container>
      </Col>
      <Col md={4}>
        <Container>
          <BookedCardList data={bookedData} hotel_name={hotel_name} />
        </Container>
      </Col>
    </Row>

  )
}