import { useState } from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../content/Firebase/authService";
import "./AuthPages.css";

export default function AuthPages() {
  const [ show, setShow ] = useState(false);
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState('');
  const redirect = useNavigate();

  const handleShowRegister = () => { setShow(true); }
  const handleCloseRegister = () => { setShow(false); }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      console.log("GOCHA LOGIN");
      redirect("/");
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Login failed.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password, name);
      setShow(false);
      redirect("/");
    } catch (error) {
      console.error("Register error:", error.message);
      alert("Register failed.");
    }
  };

  return (
    <>
      <div className="auth-page-shell">
        <div className="auth-page-backdrop auth-page-backdrop-primary" />
        <div className="auth-page-backdrop auth-page-backdrop-secondary" />
        <Container className="auth-page-container">
          <Modal
            show={show}
            onHide={handleCloseRegister}
            centered
            contentClassName="auth-register-modal"
          >
          <Modal.Body>
            <Form onSubmit={handleSignUp} className="auth-register-form">
              <div className="auth-register-copy">
                <span className="auth-section-kicker">Create account</span>
                <h2>Register portal</h2>
                <p>Insert your details to create a new account.</p>
              </div>
              <Form.Group>
                <Form.Control 
                  className="auth-input mb-3"
                  placeholder="Insert Username" 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Control
                  className="auth-input mb-3"
                  placeholder="Insert Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control 
                  className="auth-input"
                  placeholder="Insert Password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button className="auth-primary-button mt-4" type="submit">Register</Button>
            </Form>
          </Modal.Body>
        </Modal>
          <Row className="justify-content-center w-100 mx-0">
            <Col xxl={4} xl={5} lg={6} md={8} sm={10} xs={12}>
              <div className="auth-card">
                <div className="auth-copy-block">
                  <span className="auth-section-kicker">Hotel Booking</span>
                  <h1>Sign in</h1>
                  <p>Use your email and password to access your booking portal.</p>
                </div>

                <Form onSubmit={handleLogin} className="auth-form">
                  <Form.Group className="auth-form-group">
                    <Form.Label className="auth-label">Email</Form.Label>
                    <Form.Control 
                      className="auth-input"
                      placeholder="name@example.com" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="auth-form-group">
                    <Form.Label className="auth-label">Password</Form.Label>
                    <Form.Control 
                      className="auth-input"
                      placeholder="Insert your password" 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button className="auth-primary-button" type="submit">
                    Login
                  </Button>

                  <Button className="auth-secondary-button" type="button" onClick={handleShowRegister}>
                    New Register
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
