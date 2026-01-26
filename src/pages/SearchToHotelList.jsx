import { Row, Col, Container, Card ,Image } from "react-bootstrap";
import LeftBar from "../component/SearchToHotelList/LeftBar"
import RightSector from "../component/SearchToHotelList/RightSector";
import SelectMenu from "../component/SelectMenu/SelectMenu";

export default function SearchToHotelList() {

  return (
    <>
      <Row>
        <div>
          <Image 
            src="https://wanderwisdom.com/.image/w_3840,q_auto:good,c_limit/MTg3MDc4NjMwMTY0NjY5NDUx/best-10-places-to-visit-in-kuala-lumpur-malaysia.jpg?arena_f_auto" 
            height="350"
            className="w-100 mb-5"
            style={{ objectFit: "cover" }}
          />
          
        </div>
        <Container>
          <Row className="px-5">
            <h1>Hotel in Kuala Lumpur</h1>
            <SelectMenu />
            <Col md={3} className="mt-3">
              <LeftBar />
            </Col>
            <Col md={9} className="mt-3">
              <RightSector />
            </Col>
          </Row>
        </Container>
      </Row>
    </>    
  );
}