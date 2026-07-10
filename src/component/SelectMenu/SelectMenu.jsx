import { Button, Card } from "react-bootstrap";
import { useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookedList } from "../../content/data transfer/bookedListContent";
import "./SelectMenu.css";
import PeoplePax from "./PeoplePax";
import searchHotelDestination from "../../content/api/SearchHotelDestination";
import searchHotels from "../../content/api/SearchHotel";

export default function SelectMenu() {
  const {
    search, setSearch,
    currency,
    initialDate, setInitialDate,
    dueDate, setDueDate,
    adultPax, setAdultPax,
    childPax, setChildPax,
    childAge, setChildAge,
    childAgeString, setChildAgeString,
    roomAmount, setRoomAmount,
    setSearchFetchData
  } = useContext(BookedList);

  const redirect = useNavigate();
  const PeopleRef = useRef(null);

  useEffect(() => {
    const stringification = Array.isArray(childAge) ? childAge.join(',') : '';
    setChildAgeString(stringification);
  }, [childAge, setChildAgeString]);


  async function startQuery() {
    const hotdesdata = await searchHotelDestination(search);
    console.log({ selectMenu_hotdesdata: hotdesdata })
    const seahot = await searchHotels(
      hotdesdata, 
      adultPax, 
      childAgeString, 
      initialDate, 
      dueDate, 
      roomAmount,
      currency 
    )
    console.log({ selectMenu_seahot: seahot })
    setSearchFetchData(seahot);
    redirect('/searchtohotellist');
  };
    
  return (
    <Card className="searchbar mx-auto">
      <Card.Body className="searchbar-body">
        <div className="searchbar-layout">
          <div className="seg">
            <h6 className="seg-title">City, destination, or hotel name</h6>
            <input 
              className="form-control seg-control" 
              type="text" 
              list="Location" 
              placeholder="Where are you going?" 
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
          </div>
          <div className="seg">
            <h6 className="seg-title">Check-In & Check-out Dates</h6>
            <div className="seg-date-group">
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
            </div>
          </div>
          <div className="seg">
            <PeoplePax 
              PeopleRef={PeopleRef}
              adultPax={adultPax} setAdultPax={setAdultPax} 
              childPax={childPax} setChildPax={setChildPax} 
              childAge={childAge} setChildAge={setChildAge}
              roomAmount={roomAmount} setRoomAmount={setRoomAmount}
            />
          </div>
          <div className="seg-btn-col">
            <Button className="seg-btn" onClick={startQuery} >
              Search
            </Button>
          </div>
        </div>
      </Card.Body> 
    </Card>
  )
}
