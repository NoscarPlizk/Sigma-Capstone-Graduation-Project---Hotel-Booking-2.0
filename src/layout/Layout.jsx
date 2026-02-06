import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Button, Image } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useContext } from 'react';
import { BookedList } from '../content/data transfer/bookedListContent';

export default function Layout() {
  const token = useContext(BookedList).token;

  return (
    <>
      <Navbar bg="success">
        <Container>
          <Navbar.Brand href='/'><strong>Placesota</strong></Navbar.Brand>
          <Nav>
            <Nav.Link href='/userauth'>
              {!token ? <Button>Login</Button> : null}
            </Nav.Link>
            <Nav.Link href='/allbookedlist'>
              {token ? <Button>Check Booked Hotel List</Button> : null }
            </Nav.Link>
            <Nav.Link href='/userpage'>
              {token ? <Image 
                src='https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg'
                roundedCircle
                style={{ width: 40, height: 40 }}
              /> : null }
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
