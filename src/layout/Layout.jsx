import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useContext, useState } from 'react';
import { FiCalendar, FiGlobe, FiLogIn } from "react-icons/fi";
import SettingPopover from './SettingPopover';
import "./Layout.css";

import { BookedList } from '../content/data transfer/bookedListContent';
import CurrencyBar from '../component/CurrencyBar/CurrencyBar';
import { useAuth } from '../content/Firebase/AuthContext';


export default function Layout() {
  const [ showCurrencyModal, setShowCurrencyModal ] = useState(false);
  const { isLoggedIn } = useAuth();
  const setCurrency = useContext(BookedList).setCurrency;
  const currency = useContext(BookedList).currency;

  return (
    <>
      <Navbar className="app-navbar">
        <Container className="app-navbar-container">
          <Navbar.Brand href='/' className="app-navbar-brand">
            <span className="app-navbar-brand-mark">P</span>
            <span className="app-navbar-brand-copy">
              <strong>Placesota</strong>
              <span>Hotel booking portal</span>
            </span>
          </Navbar.Brand>

          <Nav className="app-navbar-actions">
            <Button
              type="button"
              className="app-navbar-button app-navbar-button-utility"
              onClick={() => setShowCurrencyModal(true)}
            >
              <FiGlobe />
              <span>
                Currency
                <strong>
                  {currency !== "hotel_currency" ? currency : "Hotel Local"}
                </strong>
              </span>
            </Button>

            {!isLoggedIn && (
              <Nav.Link href='/userauth' className="app-navbar-link">
                <Button className="app-navbar-button app-navbar-button-primary">
                  <FiLogIn />
                  <span>Login or Signup</span>
                </Button>
              </Nav.Link>
            )}

            {isLoggedIn && (
              <Nav.Link href='/bookedhotelhistory' className="app-navbar-link">
                <Button className="app-navbar-button app-navbar-button-utility">
                  <FiCalendar />
                  <span>Booked Hotel History</span>
                </Button>
              </Nav.Link>
            )}

            {isLoggedIn && <SettingPopover />}
          </Nav>
        </Container>
      </Navbar>
      <CurrencyBar 
        show={showCurrencyModal} 
        onHide={() => setShowCurrencyModal(false)} 
        currency={currency}
        setCurrency={setCurrency}
      />
      <Outlet />
    </>
  );
}
