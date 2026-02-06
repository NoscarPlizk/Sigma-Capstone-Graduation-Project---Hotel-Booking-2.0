import { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BookedList } from "../content/data transfer/bookedListContent";

export default function AuthPages() {
  const [ show, setShow ] = useState(false);
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const redirect = useNavigate();
  const APIurl = useContext(BookedList).APIurl;
  const token = useContext(BookedList).token;
  const setToken = useContext(BookedList).setToken;

  useEffect(() => {
    if (token) redirect('/');
  }, [token]);

  const handleShowRegister = () => {
    setShow(true);
  }

  const handleCloseRegister = () => {
    setShow(false);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === '' || password === '') 
    return console.log({ message: "EMPTY!!, Either username or password is Empty:", username: username, password: password });
      
    try {
      const res = await axios.post(`${APIurl}login`, { username, password });
      if (res.data && res.data.auth === true && res.data.token) {
        setToken(res.data.token);
        console.log('login was successful, token saved');
      }
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (username === '' || password === '') 
    return console.log({ "EMPTY!!, Either username or password is Empty:": { username, password } });
    
    try {
      const res = await axios.post(`${APIurl}signup`, { username, password });
      console.log(res.data);
            
      console.log('login was successful, token saved');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <Modal show={show} onHide={handleCloseRegister}>
          <Modal.Body>
            <Form>
              <Form.Label>Insert Your Email and Password for Register</Form.Label>
              <Form.Group>
                <Form.Control 
                  className="mb-3"
                  placeholder="Insert Username" 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Control 
                  placeholder="Insert Password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button className="mt-3" onClick={handleSignUp}>Register</Button>
            </Form>
          </Modal.Body>
        </Modal>
        <Form onSubmit={handleLogin} className="align-items-center">
          <Form.Group>
            <Row>
              <Col>
                <Container>
                  <Form.Label className="py-2"><h3>Hi Welcome back!</h3></Form.Label>
                  <Form.Control 
                    className="mb-3"
                    placeholder="Insert Username" 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Form.Control 
                    className="mb-3"
                    placeholder="Insert Password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Container>
              </Col>
              <Col>
                <Container className="mt-3">
                  <Button onClick={handleLogin}>Login</Button>
                  <p className="mt-3">Or</p>
                  <Button onClick={handleShowRegister}>New Register</Button>
                </Container>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}