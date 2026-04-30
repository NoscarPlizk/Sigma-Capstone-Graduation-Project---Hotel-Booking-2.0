import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Popover, Image } from "react-bootstrap";
import { logoutUser } from "../content/Firebase/authservice";
import { auth } from "../content/Firebase/firebase";

export default function SettingPopover() {
  const redirect = useNavigate();
  const PeopleRef = useRef(null);

  const SignOutProcess = async () => {
    try {
      await logoutUser(auth);
      redirect("/userauth");
    } catch (error) {
      console.error(error);
    }
  }
  
  const popover = (
    <Popover id="user-popover">
      <Popover.Header as="h3">
        User Info
      </Popover.Header>
      <Popover.Body>
        <div>
          <div>
            <button onClick={() => redirect('/usersetting')}>
              Setting
            </button>
          </div>
          <div>
            <button onClick={() => SignOutProcess()}>
              Log Out
            </button>
          </div>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <OverlayTrigger
        // target={PeopleRef.current}
        // show={showSettingPopup} 
        // onHide={() => setShowSettingPopup(false)}
        trigger="click"
        placement="bottom"
        overlay={popover}
        rootClose
      >
        <Image 
          src='https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg'
          style={{ 
            width: 40, 
            height: 40,
            cursor: "pointer"
          }}
          roundedCircle
          // ref={PeopleRef}
          // onClick={() => setShowSettingPopup(true)}
        />
      </OverlayTrigger>
    </>
  )
}