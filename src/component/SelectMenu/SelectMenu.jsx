import { Button, Card, Row, Col } from "react-bootstrap";
import { useContext, useRef } from "react";
import { BookedList } from "../../content/hotelContent";
import "./SelectMenu.css";
import PeoplePax from "./PeoplePax";

export default function SelectMenu({ searchDestination }) {
  const search = useContext(BookedList).search;
  const setSearch = useContext(BookedList).setSearch;
  const initialDate = useContext(BookedList).initialDate;
  const setInitialDate = useContext(BookedList).setInitialDate;
  const dueDate = useContext(BookedList).dueDate;
  const setDueDate = useContext(BookedList).setDueDate;
  const adultPax = useContext(BookedList).adultPax;
  const setAdultPax = useContext(BookedList).setAdultPax;
  const childPax = useContext(BookedList).childPax;
  const setChildPax = useContext(BookedList).setChildPax;
  const childAge = useContext(BookedList).childAge;
  const setChildAge = useContext(BookedList).setChildAge;
  const roomAmount = useContext(BookedList).roomAmount;
  const setRoomAmount = useContext(BookedList).setRoomAmount;

  const PeopleRef = useRef(null);

  return (
    <Card className="searchbar mx-auto">
      <Card.Body>
        <Row className="searchbar-row align-items-stretch">
          <Col xs={12} className="seg" md={3}>
          <h6 className="seg-title">City, destination, or hotel name</h6>
            <input 
              className="form-control seg-control" 
              type="text" 
              list="Location" 
              placeholder="Location" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
            />
            <datalist id="Location" >
              <option value="Kuala Lumpur" />
              <option value="Singapore" />
              <option value="Bangkok" />
              <option value="Jakarta" />
              <option value="Ho Chi Minh City" />
            </datalist>
          </Col>
          <Col xs={12} className="seg" md={3}>
            <h6 className="seg-title">Check In and out</h6>
              <input className="form-control seg-control" type="date" value={initialDate} onChange={(e) => setInitialDate(e.target.value)}/>
              <input className="form-control seg-control" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
          </Col>
          <Col xs={12} className="seg" md={3}>
            <PeoplePax 
              PeopleRef={PeopleRef}
              adultPax={adultPax} setAdultPax={setAdultPax} 
              childPax={childPax} setChildPax={setChildPax} 
              childAge={childAge} setChildAge={setChildAge}
              roomAmount={roomAmount} setRoomAmount={setRoomAmount}
            />
          </Col>
          <Col xs={12} md="auto" className="seg-btn-col">
            <Button className="seg-btn" onClick={searchDestination} >
              Search
            </Button>
          </Col>
        </Row>
      </Card.Body> 
    </Card>
  )
}