import { Button, Overlay, Popover, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";

function SubPlusMinusBar({ title, state, setState }) {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{title}</h5>
        <div className="d-flex align-items-center gap-3">
          <Button onClick={() => setState(state + 1)}>+</Button>
          <h3 className="mb-0">{state}</h3>
          <Button onClick={() => setState(state - 1)}>-</Button>
        </div>
      </div>
    </>
  )
} 

function SpecialSubPlusMinusBar({ title, state, setState, astate, aSetState }) {

  const addChild = () => {
    setState(p => p + 1);
    aSetState(ages => [...ages, ""]);
  }

  const removeChild = () => {
    setState(p => Math.max(0, p - 1));
    aSetState(ages => ages.slice(0, -1));
  }

  const setAgeAtIndex = (index, value) => {
    aSetState(ages => {
      const next = [...ages];
      next[index] = value;
      return next;
    })
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <h5 className="mb-0">{title}</h5>
        <div className="d-flex align-items-center gap-3">
          <Button onClick={() => addChild()}>+</Button>
          <h3 className="mb-0">{state}</h3>
          <Button onClick={() => removeChild()}>-</Button>
        </div>
      </div>
      { state > 0 && 
        <div className="gap-2 p-1 border mt-2">
          <Row className="g-2">
            { astate.length > 0 && astate.map((age, index) => 
              (
                <Col xs={6} key={index} >
                  <Form.Control 
                    type='number'
                    min={0}
                    max={17}
                    placeholder="Age 0-17" 
                    value={age} 
                    onChange={(e) => setAgeAtIndex(index, e.target.value)}
                  />
                </Col>
              ))
            }
          </Row>
          <p>
            To find you a place to stay that fits your entire group along with correct prices, 
            we need to know how old your child will be at check-out
          </p>
        </div>
      }
    </div>
  )
} 

export default function PeoplePax({ 
  PeopleRef,
  adultPax, setAdultPax, 
  childPax, setChildPax, 
  childAge, setChildAge,
  roomAmount, setRoomAmount
  }) {

  const [ mainshow, setMainShow ] = useState(false);
  
  return (
    <div>
      <h6 className="seg-title">How many People?</h6>
      <Form.Control
        readOnly
        style={{ cursor: "pointer" }} 
        placeholder={`${adultPax} Adults . ${childPax} Children . ${roomAmount} Rooms`}
        ref={PeopleRef}
        onClick={() => setMainShow(true)} 
      />
      <Overlay 
        placement="bottom-start" // position of the Popover
        target={PeopleRef} 
        show={mainshow} 
        onHide={() => setMainShow(false)}>
        <Popover className="peoplepax-popover"> 
          <div 
            className="d-flex flex-column align-item-center p-2 gap-2" 
            style={{ width: 300 }}
            >
            <SubPlusMinusBar title={"Adult"} state={adultPax} setState={setAdultPax} />
            <SpecialSubPlusMinusBar 
              title={"Child"} state={childPax} setState={setChildPax} 
              astate={childAge} aSetState={setChildAge}
             />
            <SubPlusMinusBar title={"Rooms"} state={roomAmount} setState={setRoomAmount} />
          </div>
        </Popover>
      </Overlay>
    </div>
  );
}