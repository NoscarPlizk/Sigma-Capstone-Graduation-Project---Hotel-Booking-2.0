import { Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BookedList } from "../../content/hotelContent";

function StartRank({ rank }) {
  return (
    <>
      {rank ? <p>⭐ {rank}</p> : <p>⭐ 'Unavaliable Ranking'</p>}
    </>
  );
}

export default function Posts({ img, name, location, star, price }) {
  const redirect = useNavigate();
  const APIurl = useContext(BookedList).APIurl;
  
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
            <StartRank rank={star}/>
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