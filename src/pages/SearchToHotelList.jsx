import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SelectMenu from "../component/SelectMenu/SelectMenu";
import { BookedList } from "../content/data transfer/bookedListContent";
import "./SearchToHotelList.css";

function LeftBar() {
  return (
    <Col className="px-4" style={{ width: 350 }}>
      <h1 className="mb-3">Features</h1>
      <Card className="mb-3" id="Price Range">
        <Card.Body>
          <Row>
            <h3 className="mb-4">Price Range</h3>
            <Button >
              <h5 className="p-2">Reset</h5>
            </Button>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  )
} 


function Posts({ hotels }) {
  const hotelProperty = hotels?.property ?? '';
  const redirect = useNavigate();
  

  const redirected = () => {
    redirect("/viewhotel", { state: { hotels }}); 
  };

  return (
    <div className="HotelMenuBoxBody">
      <div> 
        <img 
          className="HMBB-img"
          src={hotelProperty?.photoUrls ?? []} 
        />
      </div>
      <div className="HMBB-title">
        <h3>{hotelProperty?.name ?? ''}</h3>
        <p>{hotelProperty?.wishlistName ?? ''}</p>
      </div>
      <div className="HMBB-rank">
        <div className="mb-2">
          {hotelProperty?.accuratePropertyClass 
            &&  Array.from({ length: hotels?.property?.accuratePropertyClass },
                (_, index) => (
                  <span key={index}>⭐</span>
                ))
          }
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <h5 className="me-2">{hotelProperty?.reviewScoreWord}</h5>
          <div className="HMBB-rank-box-reviewScore">
            {hotelProperty?.reviewScore}
          </div>
        </div>
      </div>
      <div className="HMBB-description">

      </div>
      <div className="HMBB-button">
        <div className="HMBB-button-text">
          {hotelProperty?.priceBreakdown?.grossPrice?.currency}
          {' '}{hotelProperty?.priceBreakdown?.grossPrice?.value.toFixed(2)}
        </div>
        <div>
          <Button className="HMBB-button-itself" onClick={redirected}>
            See avaliability
          </Button>
        </div>
      </div>
    </div> 
  );
}


function RightSector({ searchFetchData }) {
  let hotels = searchFetchData?.data?.hotels;
  const properties = searchFetchData?.data?.meta[0]?.title;
  const searchTitle = useContext(BookedList).search;

  console.log({ hotels: hotels, properties: properties, searchTitle: searchTitle })
  return (
    <>
      <h1 className="mb-3">{searchTitle}: {properties}</h1>
      { hotels.map((hotels, index) => (
        <Posts 
          key={index}
          hotels={hotels}
        /> 
      ))}
    </>
  );
}

export default function SearchToHotelList() {
  const searchFetchData = useContext(BookedList).searchFetchData;
  console.log({ searchFetchData: searchFetchData })
  return (
    <>
      <Row>
        <Container>
          <Row className="px-5">
            <h1>Hotel in Kuala Lumpur</h1>
            <SelectMenu />
            <Col xs={3} className="mt-3">
              <LeftBar />
            </Col>
            <Col xs={9} className="mt-3">
              <RightSector searchFetchData={searchFetchData} />
            </Col>
          </Row>
        </Container>
      </Row>
    </>    
  );
}