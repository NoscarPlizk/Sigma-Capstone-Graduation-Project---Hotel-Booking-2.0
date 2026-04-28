import { Row, Col, Image, Button } from "react-bootstrap"

export default function UserProfile() {
  return (
    <> 
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
          {/* <Button onClick={SignOutProcess}>Log Out</Button> */}
        </Row>
      </Col>
    </>
  )
}