import { Col, Image, Row, Button, Container } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { BookedList } from "../content/data transfer/bookedListContent";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../content/firebase";

export default function UserPage() {  
  const terminateSession = useNavigate();
  const redirect = useNavigate();
  const token = useContext(BookedList).token;
  const setToken = useContext(BookedList).setToken;

  useEffect(() => {
    if (!token) redirect('/userauth');
  }, [token])

  const SignOutProcess = async () => {
    try {
      await signOut(auth);
      setToken('');
      redirect("/userauth");
    } catch (error) {
      console.error(error);
    }
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