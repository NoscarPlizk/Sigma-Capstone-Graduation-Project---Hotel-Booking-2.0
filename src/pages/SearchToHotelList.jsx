import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SelectMenu from "../component/SelectMenu/SelectMenu";
import { BookedList } from "../content/data transfer/bookedListContent";
// import Posts from "../component/SearchToHotelList/RightSectors/Posts";

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


function Posts({ img, name, location, star, price }) {
  const redirect = useNavigate();
  
  const redirected = () => {
    redirect("/viewhotel", { state: { img, name, location, star, price }}); 
  };

  return (
    <Card style={{ width: 1000 }} className="py-1 mb-3">
      <Card.Body>
        <Row> 
          <Col md={4}> 
            <img src={img} width="300" height="250" />
          </Col>
          <Col md={6}>
            <h3>{name}</h3>
            <p>{location}</p>
          </Col>
          <Col md={2} className="d-flex flex-column">
            <h3><strong>RM {price}</strong></h3>
            <p>per room per night</p>
            <Button className="p-3 mt-auto" onClick={redirected}>
              See avaliability
            </Button>
          </Col>
        </Row> 
      </Card.Body>
    </Card>
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
          img={hotels?.property?.photoUrls ?? []}
          name={hotels?.property?.name ?? ''} 
          location={hotels?.property?.wishlistName} 
          price={hotels?.property?.strikethroughPrice?.value}
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