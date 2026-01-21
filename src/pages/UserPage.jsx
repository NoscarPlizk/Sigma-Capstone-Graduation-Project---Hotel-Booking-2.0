import { Col, Image, Row, Button, Container } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { BookedList } from "../content/hotelContent";
import { useNavigate } from "react-router-dom";

export default function UserPage() {  
  const terminateSession = useNavigate();
  const redirect = useNavigate();
  const token = useContext(BookedList).token;
  const setToken = useContext(BookedList).setToken;

  useEffect(() => {
    if (!token) redirect('/userauth');
  }, [token])

  const SignOutProcess = () => {
    setToken('');
    return terminateSession('/');
  }



  return (
    <Container>
      <Col>
        <Row>
          <Image 
            src="https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg" 
            roundedCircle
            style={{ width: 90, height: 90 }}
          />
          <h1>Username</h1>
        </Row>
        <Row>
          <Button>
            Edit Profile Settings
          </Button>
          <Button onClick={SignOutProcess}>Log Out</Button>
        </Row>
      </Col>
    </Container>
  );
}