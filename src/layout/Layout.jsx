import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Button, Image, Modal } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useContext, useState } from 'react';
import { BookedList } from '../content/data transfer/bookedListContent';
import CurrencyBar from '../component/CurrencyBar/CurrencyBar';
import GetCurrency from '../content/api/GetCurrency';

export default function Layout() {
  const [ showCurrencyModal, setShowCurrencyModal ] = useState(false);
  const setCurrency = useContext(BookedList).setCurrency;
  const currency = useContext(BookedList).currency;
  const token = useContext(BookedList).token;

  return (
    <>
      <Navbar bg="success">
        <Container>
          <Navbar.Brand href='/'><strong>Placesota</strong></Navbar.Brand>
          <Nav>
            <Nav.Link href='/userauth'>
              {!token && <Button>Login or Signup</Button>}
            </Nav.Link>
            <Nav.Link href='/allbookedlist'>
              {token && <Button>Check Booked Hotel List</Button>}
            </Nav.Link>
            <Button onClick={() => setShowCurrencyModal(true)}>
              Currency: 
                <strong>
                  {' '}{currency !== "hotel_currency" ? currency : "Hotel Local Currency"}
                </strong>
            </Button>
            <Nav.Link href='/userpage'>
              {token && <Image 
                src='https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg'
                roundedCircle
                style={{ width: 40, height: 40 }}
              />}
            </Nav.Link>
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
