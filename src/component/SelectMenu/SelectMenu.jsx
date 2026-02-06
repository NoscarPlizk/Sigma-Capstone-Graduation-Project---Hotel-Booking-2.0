import { Button, Card, Row, Col } from "react-bootstrap";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BookedList } from "../../content/data transfer/bookedListContent";
import "./SelectMenu.css";
import PeoplePax from "./PeoplePax";
import searchHotelDestination from "../../content/api/searchHotelDestination";
import searchHotels from "../../content/api/SearchHotel";

export default function SelectMenu() {
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
  const setSearchFetchData = useContext(BookedList).setSearchFetchData;
  const redirect = useNavigate();
  const PeopleRef = useRef(null);

  async function startQuery() {
    const hotdesdata = await searchHotelDestination(search);
    console.log({ selectMenu_hotdesdata: hotdesdata })
    const seahot = await searchHotels(
      hotdesdata, 
      adultPax, 
      childAge, 
      initialDate, 
      dueDate, 
      roomAmount, 
    )
    console.log({ selectMenu_seahot: seahot })
    setSearchFetchData(seahot);
    redirect('/searchtohotellist');
  };
    
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
              <input 
                className="form-control seg-control" 
                type="date" 
                value={initialDate} 
                onChange={(e) => setInitialDate(e.target.value)}
              />
              <input 
                className="form-control seg-control" 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)}
              />
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
            <Button className="seg-btn" onClick={startQuery} >
              Search
            </Button>
          </Col>
        </Row>
      </Card.Body> 
    </Card>
  )
}