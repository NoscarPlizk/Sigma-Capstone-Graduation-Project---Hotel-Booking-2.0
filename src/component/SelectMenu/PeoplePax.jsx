import { Button, Overlay, Popover, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";

function SubPlusMinusBar({ title, state, setState }) {
  return (
    <div className="peoplepax-row">
      <h5 className="peoplepax-label">{title}</h5>
      <div className="peoplepax-counter">
        <Button
          className="peoplepax-stepper"
          onClick={() => setState(state + 1)}
        >
          +
        </Button>
        <span className="peoplepax-value">{state}</span>
        <Button
          className="peoplepax-stepper"
          onClick={() => setState(Math.max(0, state - 1))}
        >
          -
        </Button>
      </div>
    </div>
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
    <div className="peoplepax-section">
      <div className="peoplepax-row">
        <h5 className="peoplepax-label">{title}</h5>
        <div className="peoplepax-counter">
          <Button className="peoplepax-stepper" onClick={() => addChild()}>
            +
          </Button>
          <span className="peoplepax-value">{state}</span>
          <Button className="peoplepax-stepper" onClick={() => removeChild()}>
            -
          </Button>
        </div>
      </div>
      { state > 0 && 
        <div className="peoplepax-children-panel">
          <p className="peoplepax-description">
            To find your child a suitable stay with the correct price, tell us each
            child's age at check-out.
          </p>
          <Row className="g-2">
            { astate.length > 0 && astate.map((age, index) => 
              (
                <Col xs={6} key={index} >
                  <Form.Control 
                    className="peoplepax-age-input"
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
        className="seg-control peoplepax-trigger"
        readOnly
        placeholder={`${adultPax} Adults . ${childPax} Children . ${roomAmount} Rooms`}
        ref={PeopleRef}
        onClick={() => setMainShow(true)} 
      />
      <Overlay 
        placement="bottom-start" // position of the Popover
        target={PeopleRef.current} 
        show={mainshow} 
        onHide={() => setMainShow(false)}
        rootClose
      >
        <Popover className="peoplepax-popover"> 
          <div className="peoplepax-panel">
            <SubPlusMinusBar 
              title={"Adult"} 
              state={adultPax} 
              setState={setAdultPax} 
            />
            <SpecialSubPlusMinusBar 
              title={"Child"} 
              state={childPax} 
              setState={setChildPax} 
              astate={childAge} 
              aSetState={setChildAge}
             />
            <SubPlusMinusBar 
              title={"Rooms"} 
              state={roomAmount} 
              setState={setRoomAmount} 
            />
          </div>
        </Popover>
      </Overlay>
    </div>
  );
}
