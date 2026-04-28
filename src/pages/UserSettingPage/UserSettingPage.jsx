import { Col, Image, Row, Button, Container } from "react-bootstrap";
import { useEffect } from "react";
import { BookedList } from "../../content/data transfer/bookedListContent";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../content/Firebase/authservice";
import { auth } from "../../content/Firebase/firebase";
import { useAuth } from "../../content/Firebase/AuthContext";

function ButtonBox({ children }) {
  return (
    <div>
      { children }
    </div>
  )
}

function LeftBar() {
  return (
    <div className="border">
      <ButtonBox></ButtonBox>
    </div>
  )
}

function RightSubPage() {
  return (
    <div>
      
    </div>
  )
}

export default function UserSettingPage() {  
  const { isLoggedIn } = useAuth();
  const redirect = useNavigate();

  if (!isLoggedIn) console.log("isLoggedIn?:", isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) redirect('/userauth');
  }, [isLoggedIn])

  const SignOutProcess = async () => {
    try {
      await logoutUser(auth);
      redirect("/userauth");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      <div className="LeftBar">
        <LeftBar />
      </div>
      <div className="RightSubPage">
        <RightSubPage />
      </div>
    </Container>
  );
}