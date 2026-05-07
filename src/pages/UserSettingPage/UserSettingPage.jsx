import { Col, Image, Row, Container } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './UserSettingPage.css';

import { BookedList } from "../../content/data transfer/bookedListContent";

import UserProfilePage from "./SubPage/UserProfilePage";
import PaymentMethodPage from "./SubPage/PaymentMethodPage";

import { logoutUser } from "../../content/Firebase/authservice";
import { auth } from "../../content/Firebase/firebase";
import { useAuth } from "../../content/Firebase/AuthContext";
// import { doc, getDoc, setDoc } from "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";
import { selectSubPage } from "./Redux/SubPageSlice";

const subPageComponents = {
  profile: UserProfilePage, 
  payment: PaymentMethodPage
};

function ButtonBox({ SubPageLink, name }) {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(selectSubPage(SubPageLink))}>  
        {name}
      </button>
    </div>
  )
}

function LeftBar({ SignOutProcess }) {
  return (
    <div className="LeftBar">
      <h3>Setting</h3>
      <ButtonBox 
        SubPageLink={'profile'} 
        name={'User Profile'}
      />
      <ButtonBox 
        SubPageLink={'payment'} 
        name={'Payment Method'} 
      />
      <button onClick={() => SignOutProcess()}>
        Log Out
      </button>
    </div>
  )
}

function RightSubPage() {
  const SelectState = useSelector(state => state.UserSettingPage_SubPage.SelectState);

  const DisplayComponent = subPageComponents[SelectState] ?? UserProfilePage;

  return (
    <div>
      <DisplayComponent />
    </div>
  )
}

export default function UserSettingPage() {  
  const { isLoggedIn } = useAuth();
  const redirect = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("isLoggedIn?:", isLoggedIn);
      redirect('/userauth');
    }
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
    <Container className="MainPageStructure">
      <div className="LeftBarFrame">
        <LeftBar SignOutProcess={SignOutProcess} />
      </div>
      <div className="RightSubPageFrame">
        <RightSubPage />
      </div>
    </Container>
  );
}