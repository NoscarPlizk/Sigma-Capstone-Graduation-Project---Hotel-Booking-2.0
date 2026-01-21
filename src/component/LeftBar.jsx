import { Row, Col, Button, Card } from "react-bootstrap";

export default function LeftBar() {

  return (
    <Col className="px-4" style={{ width: 350 }}>
      <h1 className="mb-3">Features</h1>
      <Card className="mb-3" id="Price Range">
        <Card.Body>
          <Row>
            <h3 className="mb-4">Price Range</h3>
            <Button >
              <h5 className="p-2">Reset</h5>
            </Button>
          </Row>
        </Card.Body>
      </Card>

      <Card id="star">
        <Card.Body>
          <Row>
            <h3>Star Rank</h3>
            <label>
              <input type="checkbox" /> 1 ⭐ 
            </label>
            <label>
              <input type="checkbox" /> 2 ⭐ 
            </label>
            <label>
              <input type="checkbox" /> 3 ⭐ 
            </label>
            <label>
              <input type="checkbox" /> 4 ⭐ 
            </label>
            <label>
              <input type="checkbox" /> 5 ⭐ 
            </label>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  )
} 