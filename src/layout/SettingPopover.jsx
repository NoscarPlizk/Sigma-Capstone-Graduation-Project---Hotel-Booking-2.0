import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Popover, Image } from "react-bootstrap";
import { FiChevronRight, FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import { logoutUser } from "../content/Firebase/authservice";
import { auth } from "../content/Firebase/firebase";
import "./SettingPopover.css";

export default function SettingPopover() {
  const redirect = useNavigate();

  const SignOutProcess = async () => {
    try {
      await logoutUser(auth);
      redirect("/userauth");
    } catch (error) {
      console.error(error);
    }
  }
  
  const popover = (
    <Popover id="user-popover" className="account-popover">
      <Popover.Header as="div" className="account-popover-header">
        <div className="account-popover-header-icon">
          <FiUser />
        </div>
        <div className="account-popover-header-copy">
          <span className="account-popover-eyebrow">Account</span>
          <strong>User menu</strong>
        </div>
      </Popover.Header>
      <Popover.Body className="account-popover-body">
        <div className="account-popover-actions">
          <button
            type="button"
            className="account-popover-action"
            onClick={() => redirect("/usersetting")}
          >
            <span className="account-popover-action-main">
              <span className="account-popover-action-icon">
                <FiSettings />
              </span>
              <span className="account-popover-action-copy">
                <strong>Settings</strong>
                <span>Manage your account profile</span>
              </span>
            </span>
            <FiChevronRight className="account-popover-action-arrow" />
          </button>

          <button
            type="button"
            className="account-popover-action account-popover-action-logout"
            onClick={() => SignOutProcess()}
          >
            <span className="account-popover-action-main">
              <span className="account-popover-action-icon account-popover-action-icon-logout">
                <FiLogOut />
              </span>
              <span className="account-popover-action-copy">
                <strong>Log out</strong>
                <span>End your current session</span>
              </span>
            </span>
          </button>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={popover}
        rootClose
      >
        <button type="button" className="account-popover-trigger">
          <Image
            src="https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg"
            className="account-popover-trigger-avatar"
            roundedCircle
          />
        </button>
      </OverlayTrigger>
    </>
  )
}
