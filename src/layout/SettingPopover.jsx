import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Popover, Image } from "react-bootstrap";
import { FiChevronRight, FiLogOut, FiMail, FiSettings, FiUser } from "react-icons/fi";
import { logoutUser } from "../content/Firebase/authservice";
import { auth } from "../content/Firebase/firebase";
import { useAuth } from "../content/Firebase/AuthContext";
import "./SettingPopover.css";

function getAvatarUrl(profile, firebaseUser) {
  return profile?.avatar?.url?.trim() || firebaseUser?.photoURL?.trim() || "";
}

function getInitials(profile, firebaseUser) {
  const displayName =
    profile?.display_name?.trim() ||
    `${profile?.name?.first_name || ""} ${profile?.name?.last_name || ""}`.trim() ||
    firebaseUser?.displayName?.trim() ||
    firebaseUser?.email?.trim() ||
    "GU";

  const parts = displayName.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return displayName.slice(0, 2).toUpperCase();
}

function getDisplayName(profile, firebaseUser) {
  return (
    profile?.display_name?.trim() ||
    `${profile?.name?.first_name || ""} ${profile?.name?.last_name || ""}`.trim() ||
    firebaseUser?.displayName?.trim() ||
    "Guest profile"
  );
}

export default function SettingPopover() {
  const redirect = useNavigate();
  const { userProfile, firebaseUser } = useAuth();
  const avatarUrl = getAvatarUrl(userProfile, firebaseUser);
  const initials = getInitials(userProfile, firebaseUser);
  const displayName = getDisplayName(userProfile, firebaseUser);
  const email = userProfile?.email?.trim() || firebaseUser?.email?.trim() || "No email available";

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
        <div className="account-popover-header-avatar">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="Current user avatar"
              className="account-popover-header-avatar-image"
              roundedCircle
            />
          ) : (
            <span className="account-popover-header-avatar-fallback">{initials}</span>
          )}
        </div>
        <div className="account-popover-header-copy">
          <span className="account-popover-eyebrow">Account</span>
          <strong>{displayName}</strong>
          <span className="account-popover-header-email">
            <FiMail />
            {email}
          </span>
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
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="Current user avatar"
              className="account-popover-trigger-avatar"
              roundedCircle
            />
          ) : (
            <span className="account-popover-trigger-fallback">{initials}</span>
          )}
        </button>
      </OverlayTrigger>
    </>
  )
}
