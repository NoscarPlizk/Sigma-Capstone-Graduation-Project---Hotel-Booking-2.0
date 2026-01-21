import { Button, Card, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { BookedList } from "../content/hotelContent";

export default function SelectMenu() {
  const initialDate = useContext(BookedList).initialDate;
  const setInitialDate = useContext(BookedList).setInitialDate;
  const dueDate = useContext(BookedList).dueDate;
  const setDueDate = useContext(BookedList).setDueDate;
  const adultPax = useContext(BookedList).adultPax;
  const setAdultPax = useContext(BookedList).setAdultPax;
  const childPax = useContext(BookedList).setAdultPax;
  const setChildPax = useContext(BookedList).setAdultPax;

  const startDate = (value) => {
    setInitialDate(value);
  }

  const endDate = (value) => {
    setDueDate(value);
  }
  
  return (
    <Card className="mx-auto">
      <Card.Body>
        <Row>
          <Col md={3}>
          <h4>City, destination, or hotel name</h4>
            <input type="text" list="Location" placeholder="Location" />
            <datalist id="Location" >
              <option value="Kuala Lumpur" />
              <option value="Singapore" />
              <option value="Bangkok" />
              <option value="Jakarta" />
              <option value="Ho Chi Minh City" />
            </datalist>
          </Col>
          <Col md={3}>
            <h4>Check In and out</h4>
              <input type="date" value={initialDate} onChange={(e) => startDate(e.target.value)}/>
              <input type="date" value={dueDate} onChange={(e) => endDate(e.target.value)}/>
          </Col>
          <Col md={3}>
            <h4>How many People?</h4>
            <select value={adultPax} onChange={(e) => setAdultPax(e.target.value)}>
              <option value='1'>1 Adult</option>
              <option value='2'>2 Adult</option>
              <option value='3'>3 Adult</option>
              <option value='4'>4 Adult</option>
              <option value='5'>5 Adult</option>
              <option value='6'>6 Adult</option>
            </select>
            <select value={childPax} onChange={(e) => setChildPax(e.target.value)}>
              <option value='1'>1 Children</option>
              <option value='2'>2 Children</option>
              <option value='3'>3 Children</option>
              <option value='4'>4 Children</option>
              <option value='5'>5 Children</option>
              <option value='6'>6 Children</option>
            </select>
          </Col>
          <Col md={1}>
            <Button>
              Search
            </Button>
          </Col>
        </Row>
      </Card.Body> 
    </Card>       
  )
}
        
