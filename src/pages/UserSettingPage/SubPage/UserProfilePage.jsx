import { Image, Button, Col, Row } from "react-bootstrap"
import { useState } from "react"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../../../content/Firebase/firebase'
import { useAuth } from "../../../content/Firebase/AuthContext";

function LegalName({ UserName, SaveSpecDocFirestore }) {
  const [ OpenEditName, setOpenEditName ] = useState(false);

  function EditName() {
    setOpenEditName(false);
  }

  return (
    <div className="d-flex justify-content-between">
      <div>
        <h4>Name</h4>{' '}
        <h5>{UserName ?? ''}</h5>        
      </div>
      <div className="d-flex justify-content-between">
        <div>
          {!OpenEditName 
            ? name
            : <div>
                <input 
                  type="text" 
                  value={UserName} 
                  placeholder={UserName} 
                />
              </div> 
          }
        </div>
        <div>
          {!OpenEditName 
            ? <button onClick={() => setOpenEditName(true)} >Edit</button>
            : <div>
                <button onClick={() => EditName()} >Cancel</button>
                <button onClick={() => EditName()} >Save</button>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

function DisplayName() {
  return (
    <div>
      <h4>Display Name</h4>
    </div>
  )
}

function DisplayEmail() {
  return (
    <div>
      <h4>Email</h4>
    </div>
  )
}

function DisplayPhone() {
  return (
    <div>
      <h4>Phone</h4>
    </div>
  )
}


export default function UserProfilePage() {
  const { userProfile, SaveSpecDocFirestore } = useAuth();

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div>
          <h2>User Profile</h2>
        </div>
        <div>
          <div className="d-flex">
            <Image 
              src="https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg" 
              roundedCircle
              style={{ width: 100, height: 100 }}
            />
          </div>
        </div>
      </div> 
      <hr />
      <div>
        <Col>
          <Row>
            <LegalName 
              UserName={userProfile?.name} 
              SaveSpecDocFirestore={SaveSpecDocFirestore}
            />
          </Row>
          <hr />
          <Row><DisplayName /></Row>
          <hr />
          <Row><DisplayEmail /></Row>
          <hr />
          <Row><DisplayPhone /></Row>
        </Col>
      </div>
    </div>
  )
}

// const userProfile = {
//   uid: user.uid,
//   legalName: "John Tan",
//   displayName: "John",
//   email: "john@gmail.com",
//   phone: "+60123456789",
//   address: {
//     country: "Malaysia",
//     city: "Kuching",
//     fullAddress: "Some address here"
//   }
// };