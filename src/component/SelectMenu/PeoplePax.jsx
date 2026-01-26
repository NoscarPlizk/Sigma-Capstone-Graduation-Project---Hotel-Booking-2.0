import { Button, Overlay, Popover, Form } from "react-bootstrap";
import { useState, useRef } from "react";

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

function SpecialSubPlusMinusBar({ 
  everyChildAge, title, state, setState, astate, aSetState, ageShow, setAgeShow 
}) {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{title}</h5>
        <div className="d-flex align-items-center gap-3">
          <Button onClick={() => setState(state + 1)}>+</Button>
          <h3 className="mb-0" ref={everyChildAge}>{state}</h3>
          <Button onClick={() => setState(state - 1)}>-</Button>
        </div>
        <Overlay show={ageShow} target={everyChildAge} onHide={() => setAgeShow(false)}>
          <Popover>
            <div className="d-flex">
              <Form.Control placeholder="Age Require"/>
              <Button onClick={() => aSetState(astate + 1)}>+</Button>
              <p>{astate}</p>
              <Button onClick={() => aSetState(astate - 1)}>-</Button>
            </div>
          </Popover>
        </Overlay>
      </div>
    </>
  )
} 

export default function PeoplePax({ 
  PeopleRef,
  adultPax, setAdultPax, 
  childPax, setChildPax, 
  childAge, setChildAge,
  roomAmount, setRoomAmount
  }) {

  const everyChildAge = useRef(null);

  const [ mainshow, setMainShow ] = useState(false);
  const [ ageShow, setAgeShow ] = useState(false);
  
  if ( childPax > 0 ) {setAgeShow(true)};
  
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
            style={{ width: 300, height: 200 }}
            >
            <SubPlusMinusBar title={"Adult"} state={adultPax} setState={setAdultPax} />
            <SpecialSubPlusMinusBar 
              everyChildAge={everyChildAge} title={"Child"} state={childPax} setState={setChildPax} 
              astate={childAge} aSetState={setChildAge} ageShow={ageShow} 
              setAgeShow={setAgeShow}
             />
            <SubPlusMinusBar title={"Rooms"} state={roomAmount} setState={setRoomAmount} />
          </div>
        </Popover>
      </Overlay>
    </div>
  );
}