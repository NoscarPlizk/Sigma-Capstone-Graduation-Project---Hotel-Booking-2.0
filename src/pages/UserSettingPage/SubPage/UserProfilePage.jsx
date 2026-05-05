import { Image, Button, Col, Row } from "react-bootstrap"
import { useState, useRef } from "react"
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { db } from '../../../content/Firebase/firebase'
import { useAuth } from "../../../content/Firebase/AuthContext";
import './UserProfilePage.css';

import { countryRegionOptions } from '../../../content/countryRegionOptions';
import { nationalityData } from '../../../content/nationalityData'; 

function LegalName({ UserName, SaveSpecDocFirestore }) {
  const [ OpenEdit, setOpenEdit ] = useState(false);
  const inputFirstNameRef = useRef(null);
  const inputLastNameRef = useRef(null);

  const firstName = UserName?.first_name;
  const lastname = UserName?.last_name;

  function SaveEdit() {
    SaveSpecDocFirestore({ name: {
      first_name: inputFirstNameRef.current.value,
      last_name: inputLastNameRef.current.value
    }});
    console.log('updated name to firestore');
    setOpenEdit(false);
  }

  return (
    <div className="EveryChildBox">
      <div>
        <strong>Real Name:</strong>
      </div>
      <div className="SecondLongBox">
        <div>
          {(firstName && firstName.length > 0) 
            ? `${firstName} ${lastname}`
            : 'No Name Please Set Name'
          }
        </div>     
        <div>
          {OpenEdit && 
            <div>
              <div>
                First Name:
                <input 
                  type="text" 
                  ref={inputFirstNameRef} 
                  placeholder={firstName} 
                />
              </div>
              <div>
                Second  Name:
                <input 
                  type="text" 
                  ref={inputLastNameRef} 
                  placeholder={lastname}
                />
              </div>
            </div> 
          }
        </div>
        <div>
          {!OpenEdit 
            ? <button onClick={() => setOpenEdit(true)} >Edit</button>
            : <div>
                <button onClick={() => setOpenEdit(false)} >Cancel</button>
                <button onClick={() => SaveEdit()} >Save</button>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

function DisplayName({ display_name, SaveSpecDocFirestore }) {
  const [ OpenEdit, setOpenEdit ] = useState(false);
  const inputNewDisplayNameRef = useRef(null);

  function SaveEdit() {
    SaveSpecDocFirestore({ display_name: inputNewDisplayNameRef.current.value })
    console.log('updated Display Name to firestore');
    setOpenEdit(false);
  }


  return (
    <div className="EveryChildBox">
      <div>
        <strong>Display Name:</strong>
      </div>
      <div className="SecondLongBox">
        <div>
          {(display_name && display_name.length > 0)
            ? `${display_name}`
            : ''
          }
        </div>
        <div>
          {OpenEdit && 
            <div>
              <input 
                type="text"
                ref={inputNewDisplayNameRef}
                placeholder={display_name} 
              />
            </div>
          }
        </div>
        <div>
          {!OpenEdit 
            ? <button onClick={() => setOpenEdit(true)} >Edit</button>
            : <div>
                <button onClick={() => setOpenEdit(false)} >Cancel</button>
                <button onClick={() => SaveEdit()} >Save</button>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

function Email({ email }) {
  return (
    <div className="EveryChildBox">
      <div>
        <strong>Email:</strong>
      </div>
      <div className="SecondLongBox">
        <div>
          {(email && email.length > 0)
            ? `${email}`
            : ''
          }
        </div>
      </div>
    </div>
  )
}

function PhoneNumber({ phone, SaveSpecDocFirestore }) {
  const [ OpenEdit, setOpenEdit ] = useState(false);
  const selectRegionRef = useRef(null);
  const inputNewPhoneRef = useRef(null);


  function SaveEdit() {
    const NewTelephone = `${selectRegionRef.current.value} ${inputNewPhoneRef.current.value}`;
    SaveSpecDocFirestore({ phone: {
      region_code: selectRegionRef.current.value,
      telephone_number: inputNewPhoneRef.current.value
    } })
    console.log('updated phone to firestore:', NewTelephone);
    setOpenEdit(false);
  }

  return (
    <div className="EveryChildBox">
      <div>
        <strong>Phone:</strong>
      </div>
      <div className="SecondLongBox">
        <div>
          {(phone && (phone.region_code.length > 0 && phone.telephone_number > 0)) 
          && `${phone.region_code} ${phone.telephone_number}`}
        </div>
        <div>
          {OpenEdit && 
            <div>
              <select ref={selectRegionRef} id="Telephone Region" required >
                {countryRegionOptions.map((region) => (
                  <option 
                    key={region.code}
                    value={region.phoneCode}
                  >
                    {region.phoneCode} {region.name} 
                  </option>
                ))}
              </select>
              <input 
                type="text"
                ref={inputNewPhoneRef}
                placeholder={`${phone.region_code} ${phone.telephone_number}`} 
                required 
              />
            </div>
          }
        </div>
        <div>
          {!OpenEdit 
            ? <button onClick={() => setOpenEdit(true)} >Edit</button>
            : <div>
                <button onClick={() => setOpenEdit(false)} >Cancel</button>
                <button onClick={() => SaveEdit()} >Save</button>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

function DateofBirth({ birth_date, SaveSpecDocFirestore }) {
  const [ OpenEdit, setOpenEdit ] = useState(false);
  const inputNewBirthDateRef = useRef(null);

  function SaveEdit() {
    SaveSpecDocFirestore({ birth_date: inputNewBirthDateRef.current.value })
    console.log('updated birth date to firestore');
    setOpenEdit(false);
  }


  return (
    <div className="EveryChildBox">
      <div>
        <strong>Date of Birth:</strong>
      </div>
      <div className="SecondLongBox">
        <div>
          {(birth_date && birth_date.length > 0)
            ? `${birth_date}`
            : ''
          }
        </div>
        <div>
          {OpenEdit && 
            <div>
              <input 
                type="date"
                ref={inputNewBirthDateRef}
                placeholder={birth_date} 
              />
            </div>
          }
        </div>
        <div>
          {!OpenEdit 
            ? <button onClick={() => setOpenEdit(true)} >Edit</button>
            : <div>
                <button onClick={() => setOpenEdit(false)} >Cancel</button>
                <button onClick={() => SaveEdit()} >Save</button>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

function Gender({ gender, SaveSpecDocFirestore }) {
  const [ OpenEdit, setOpenEdit ] = useState(false);
  const inputNewGenderRef = useRef(null);

  function SaveEdit() {
    SaveSpecDocFirestore({ gender: inputNewGenderRef.current.value })
    console.log('updated gender to firestore');
    setOpenEdit(false);
  }

  return (
    <div className="EveryChildBox">
      <div>
        <strong>Gender:</strong>
      </div>
      <div className="SecondLongBox">
        <div>
          {(gender && gender.length > 0)
            ? `${gender}`
            : ''
          }
        </div>
        <div>
          {OpenEdit && 
            <div>
              <select ref={inputNewGenderRef} >
                <option value='Male' >Male</option>
                <option value='Female' >Female</option>
                <option value='I prefer not to say' >I prefer not to say</option>
              </select>
            </div>
          }
        </div>
        <div>
          {!OpenEdit 
            ? <button onClick={() => setOpenEdit(true)} >Edit</button>
            : <div>
                <button onClick={() => setOpenEdit(false)} >Cancel</button>
                <button onClick={() => SaveEdit()} >Save</button>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

function Address({ address, SaveSpecDocFirestore }) {
  const [ OpenEdit, setOpenEdit ] = useState(false);
  const inputNewAddressRef = useRef(null);

  function SaveEdit() {
    SaveSpecDocFirestore({ address: inputNewAddressRef.current.value })
    console.log('updated address to firestore');
    setOpenEdit(false);
  }


  return (
    <div className="EveryChildBox">
      <div>
        <strong>Residential Address:</strong>
      </div>
      <div className="SecondLongBox">
        <div>
          {(address && address.length > 0)
            ? `${address}`
            : ''
          }
        </div>
        <div>
          {OpenEdit && 
            <div>
              <input 
                type="text"
                ref={inputNewAddressRef}
                placeholder={address} 
              />
            </div>
          }
        </div>
        <div>
          {!OpenEdit 
            ? <button onClick={() => setOpenEdit(true)} >Edit</button>
            : <div>
                <button onClick={() => setOpenEdit(false)} >Cancel</button>
                <button onClick={() => SaveEdit()} >Save</button>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

function Nationality({ nationality, SaveSpecDocFirestore }) {
  const [ OpenEdit, setOpenEdit ] = useState(false);
  const inputNewNationalityRef = useRef(null);

  function SaveEdit() {
    SaveSpecDocFirestore({ nationality: inputNewNationalityRef.current.value })
    console.log('updated nationality to firestore');
    setOpenEdit(false);
  }


  return (
    <div className="EveryChildBox">
      <div>
        <strong>Nationality:</strong>
      </div>
      <div className="SecondLongBox">
        <div>
          {(nationality && nationality.length > 0)
            ? `${nationality}`
            : ''
          }
        </div>
        <div>
          {OpenEdit && 
            <div>
              <select
                ref={inputNewNationalityRef}
                placeholder={nationality}
              >
                {nationalityData.map((countries) => (
                  <option 
                    key={countries}
                    value={countries}
                  >
                    {countries}
                  </option>
                ))}
              </select>
            </div>
          }
        </div>
        <div>
          {!OpenEdit 
            ? <button onClick={() => setOpenEdit(true)} >Edit</button>
            : <div>
                <button onClick={() => setOpenEdit(false)} >Cancel</button>
                <button onClick={() => SaveEdit()} >Save</button>
              </div>
          }
        </div>
      </div>
    </div>
  )
}



function Passport({ passport, SaveSpecDocFirestore }) {
  const [ OpenEdit, setOpenEdit ] = useState(false);

  const firstNamePassportRef = useRef(null);
  const lastNamePassportRef = useRef(null);
  const inputPassportCountryRef = useRef(null);
  const inputPassportNumberRef = useRef(null);

  function SaveEdit() {
    const PassportData = {
      first_name: firstNamePassportRef.current.value,
      last_name: lastNamePassportRef.current.value,
      passport_country: inputPassportCountryRef.current.value,
      passport_number: inputPassportNumberRef.current.value
    }
    SaveSpecDocFirestore({ passport: PassportData })
    console.log('updated passport to firestore:', PassportData);
    setOpenEdit(false);
  }

  return (
    <div className="EveryChildBox">
      <div>
        <strong>Passport:</strong>
      </div>
      <div className="SecondLongBox">
        <div>
          {passport
            ? `${passport.first_name} 
               ${passport.last_name} 
               ${passport.passport_country}:
               ${passport.passport_number}
               `
            : ''
          }
        </div>
        <div>
          {OpenEdit && 
            <div>
              <div>
                First Name:
                <input                   
                  id="Passport_First_Name" 
                  type='text' 
                  ref={firstNamePassportRef}/>
              </div>              
              <div>
                Last Name:
                <input                   
                  id="Passport_Last_Name" 
                  type='text' 
                  ref={lastNamePassportRef}/>
              </div>
              <div>
                Issue Country: 
                <select
                  ref={inputPassportCountryRef}
                  placeholder={passport}
                >
                  {nationalityData.map((countries) => (
                    <option 
                      key={countries}
                      value={countries}
                    >
                      {countries}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                Passport Number: 
                <input 
                  id="Passport_Number" 
                  type='text' 
                  ref={inputPassportNumberRef}
                />
              </div>
            </div>
          }
        </div>
        <div>
          {!OpenEdit 
            ? <button onClick={() => setOpenEdit(true)} >Edit</button>
            : <div>
                <button onClick={() => setOpenEdit(false)} >Cancel</button>
                <button onClick={() => SaveEdit()} >Save</button>
              </div>
          }
        </div>
      </div>
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
          <Row>
            <DisplayName 
              display_name={userProfile?.display_name}
              SaveSpecDocFirestore={SaveSpecDocFirestore}
            />
          </Row>
          <hr />
            <Row>
              <Email email={userProfile?.email} />
            </Row>
          <hr />
            <Row>
              <PhoneNumber 
                phone={userProfile?.phone}
                SaveSpecDocFirestore={SaveSpecDocFirestore}
              />
            </Row>
          <hr />
            <Row>
              <DateofBirth 
                birth_date={userProfile?.birth_date}
                SaveSpecDocFirestore={SaveSpecDocFirestore}
              />
            </Row>
          <hr />
            <Row>
              <Gender 
                gender={userProfile?.gender}
                SaveSpecDocFirestore={SaveSpecDocFirestore}
              />
            </Row>
          <hr />
            <Row>
              <Address 
                address={userProfile?.address}
                SaveSpecDocFirestore={SaveSpecDocFirestore}
              />
            </Row>
          <hr />
            <Row>
              <Nationality 
                nationality={userProfile?.nationality}
                SaveSpecDocFirestore={SaveSpecDocFirestore}
              />
            </Row>
          <hr />
            <Row>
              <Passport 
                passport={userProfile?.passport}
                SaveSpecDocFirestore={SaveSpecDocFirestore}
              />
            </Row>
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