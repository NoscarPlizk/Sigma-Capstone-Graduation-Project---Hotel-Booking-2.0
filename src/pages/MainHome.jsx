import { Row, Col, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { BookedList } from "../content/data transfer/bookedListContent";
import SelectMenu from "../component/SelectMenu/SelectMenu";
import "./MainHome.css";
import { useContext } from "react";

function SelectCard({ title, imgUrl }) {
  return (
    <Col>
      <Card
        className="border-0 rounded-4 overflow-hidden position-relative shadow"
        style={{ width: 320, height: 220 }}
      >
        <Link to={'/searchtohotellist'} className="w-100 h-100">
          <Card.Img
            src={imgUrl}
            alt={title}
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />

          {/* Overlay shadow */}
          <div
            className="position-absolute top-0 start-0 w-100"
            style={{
              height: "40%",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,.6), rgba(0,0,0,0))",
            }}
          />

          {/* Title */}
          <div className="position-absolute top-0 start-0 p-3 text-white fw-bold fs-4">
            {title}
          </div>
        </Link>
      </Card>
    </Col>
  );
}

export default function MainHome() {
  return (
    <>
      <Row>
        <div className="hero">
          <div className="hero-inner">
            <h1 className="hero-title">Find your next stay</h1>
            <p className="hero-sub">Search deals on hotels, homes, and much more...</p>
            <SelectMenu />
          </div>
        </div>
        <Container>
          <Row className="px-5">
            <h1 className="mt-3">Find your next stay in Asia</h1>
            <Row className="mt-3">
              <SelectCard 
                title="Kuala Lumpur" 
                imgUrl="https://img.static-kl.com/transform/1f159175-0757-4f9e-a9a8-ec6dbd5bce68/"
              />
              <SelectCard 
                title="Singapore" 
                imgUrl="https://images.trvl-media.com/place/6047873/15d3ae30-ef33-406e-971f-9520c03f1089.jpg"
              />
              <SelectCard 
                title="Taipei" 
                imgUrl="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTskIxvQ6q0LdUXXjHemhHZDiuuGlNvwIaq03f7br9C8VrMGoh_XGBQJ_MTURO3THRtsP422TC_l0yR3xuIEkjuByw&s=19"
              />
              <SelectCard 
                title="Ho Chi Minh City" 
                imgUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Ho_Chi_Minh_City%2C_City_Hall%2C_2020-01_CN-04.jpg/330px-Ho_Chi_Minh_City%2C_City_Hall%2C_2020-01_CN-04.jpg"
              />
            </Row>
            <Row className="mt-5">
              <SelectCard 
                title="Tokyo" 
                imgUrl="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSJrEMCqMgEVm-268dXRBSqg7BRX-77DoP-X3Ki37flVvSpjOHOEaTXLjAzhakWWOWv8mww_6gSd-ht2cnvg4hrKh0&s=19"
              />
            </Row>
          </Row>
        </Container>
      </Row>
    </>
  )
}