import { Row, Col, Container, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from 'axios';
import SelectMenu from "../component/SelectMenu/SelectMenu";
import "./MainHome.css";
import { BookedList } from "../content/hotelContent";

function SelectCard({ title, imgUrl }) {
  return (
    <Col>
      <Card
        className="border-0 rounded-4 overflow-hidden position-relative shadow"
        style={{ width: 320, height: 220 }}
      >
        <Link to={'/home'} className="w-100 h-100">
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
  const search = useContext(BookedList).search;
  const initialDate = useContext(BookedList).initialDate;
  const dueDate = useContext(BookedList).dueDate;
  const adultPax = useContext(BookedList).adultPax;
  const childPax = useContext(BookedList).childPax;
  const childAge = useContext(BookedList).childAge;
  const searchData = useContext(BookedList).searchData;
  const setSearchData = useContext(BookedList).setSearchData;

  const redirect = useNavigate();

  async function searchDestination() {
    if (!search?.trim()) return;
    const options = {
      method: 'GET',
      url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination',
      params: { query: search },
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
        'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
      }
    };

    let SHDdata = [];

    try {
      const response = await axios.request(options);
      console.log(response.data);
      SHDdata = response.data;
    } catch (error) {
      return console.error(error);
    }
    
    serchHotels({ SHDdata, adultPax, childPax });
  };

  async function serchHotels({ SHDdata, adultPax, childAge }) {
    const { dest_id, search_type } = SHDdata;
  
    const options = {
      method: 'GET',
      url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
      params: {
        dest_id,
        search_type,
        adults: adultPax,
        children_age: childAge,
        room_qty: '1',
        page_number: '1',
        units: 'metric',
        temperature_unit: 'c',
        languagecode: 'en-us',
        currency_code: 'AED',
        location: 'US'
      },
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
        'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
      }
    };

    try {
      const response = await axios.request(options);
      const check = response.data;

      if (!check?.success) {
        console.warn("Backend Fetch Error:", check?.error || check?.message);
        return;
      }

      console.log(response.data);
      setSearchData(response.data); 
    } catch (error) {
      console.error(error);
    }
    redirect('/home');
  };

  return (
    <>
      <Row>
        <div className="hero">
          <div className="hero-inner">
            <h1 className="hero-title">Find your next stay</h1>
            <p className="hero-sub">Search deals on hotels, homes, and much more...</p>
            <SelectMenu searchDestination={searchDestination} />
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