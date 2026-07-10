import { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FiCreditCard,
  FiLogOut,
  FiMail,
  FiShield,
  FiUser,
} from "react-icons/fi";
import "./UserSettingPage.css";

import UserProfilePage from "./SubPage/UserProfilePage";
import { logoutUser } from "../../content/Firebase/authservice";
import { auth } from "../../content/Firebase/firebase";
import { useAuth } from "../../content/Firebase/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { selectSubPage } from "./Redux/SubPageSlice";

function SettingsPlaceholder() {
  return (
    <section className="settings-placeholder-panel">
      <div className="settings-placeholder-icon">
        <FiCreditCard />
      </div>
      <div className="settings-placeholder-copy">
        <p className="settings-section-eyebrow">Payment preferences</p>
        <h2>Payment methods are not connected yet</h2>
        <p>
          This area is reserved for saved cards, billing preferences, and
          checkout defaults. The account profile section is fully available
          today.
        </p>
      </div>
    </section>
  );
}

const subPageComponents = {
  profile: UserProfilePage,
  payment: SettingsPlaceholder,
};

const settingsNavItems = [
  {
    key: "profile",
    label: "User Profile",
    description: "Personal details, contact information, and travel documents.",
    icon: FiUser,
  },
  {
    key: "payment",
    label: "Payment Method",
    description: "Saved payment options and billing defaults.",
    icon: FiCreditCard,
    badge: "Soon",
  },
];

function getInitials(displayName, email) {
  const source = displayName?.trim() || email?.trim() || "Guest";
  const parts = source.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return source.slice(0, 2).toUpperCase();
}

function countCompletedFields(profile) {
  const values = [
    profile?.display_name,
    profile?.email,
    profile?.birth_date,
    profile?.gender,
    profile?.address,
    profile?.nationality,
    profile?.phone?.telephone_number,
    profile?.passport?.passport_number,
  ];

  return values.filter((value) => typeof value === "string" && value.trim()).length;
}

function ButtonBox({ item, isActive }) {
  const dispatch = useDispatch();
  const Icon = item.icon;

  return (
    <button
      type="button"
      className={`settings-nav-button ${isActive ? "is-active" : ""}`}
      onClick={() => dispatch(selectSubPage(item.key))}
    >
      <span className="settings-nav-icon">
        <Icon />
      </span>
      <span className="settings-nav-copy">
        <span className="settings-nav-title-row">
          <span className="settings-nav-title">{item.label}</span>
          {item.badge ? <span className="settings-nav-badge">{item.badge}</span> : null}
        </span>
        <span className="settings-nav-description">{item.description}</span>
      </span>
    </button>
  );
}

function LeftBar({ signOutProcess }) {
  const selectedState = useSelector(
    (state) => state.UserSettingPage_SubPage.SelectState
  );

  return (
    <aside className="settings-sidebar">
      <div className="settings-sidebar-copy">
        <p className="settings-section-eyebrow">Account center</p>
        <h2>Settings</h2>
        <p>
          Manage your account profile and keep your booking details ready for
          checkout.
        </p>
      </div>

      <nav className="settings-nav-list" aria-label="Account settings sections">
        {settingsNavItems.map((item) => (
          <ButtonBox key={item.key} item={item} isActive={selectedState === item.key} />
        ))}
      </nav>

      <div className="settings-sidebar-note">
        <span className="settings-sidebar-note-icon">
          <FiShield />
        </span>
        <div>
          <strong>Security</strong>
          <p>Your profile data is synced to Firestore for future bookings.</p>
        </div>
      </div>

      <button
        type="button"
        className="settings-logout-button"
        onClick={signOutProcess}
      >
        <FiLogOut />
        <span>Log Out</span>
      </button>
    </aside>
  );
}

function RightSubPage() {
  const selectedState = useSelector(
    (state) => state.UserSettingPage_SubPage.SelectState
  );
  const DisplayComponent = subPageComponents[selectedState] ?? UserProfilePage;

  return (
    <section className="settings-content-panel">
      <DisplayComponent />
    </section>
  );
}

export default function UserSettingPage() {
  const { isLoggedIn, authLoading, userProfile, firebaseUser } = useAuth();
  const redirect = useNavigate();

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      redirect("/userauth");
    }
  }, [authLoading, isLoggedIn, redirect]);

  const signOutProcess = async () => {
    try {
      await logoutUser(auth);
      redirect("/userauth");
    } catch (error) {
      console.error(error);
    }
  };

  if (authLoading) {
    return (
      <div className="settings-loading-shell">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  const userEmail = userProfile?.email || firebaseUser?.email || "";
  const userDisplayName = userProfile?.display_name || userProfile?.name?.first_name || "";
  const completedFields = countCompletedFields(userProfile);
  const initials = getInitials(userDisplayName, userEmail);

  return (
    <div className="settings-page-shell">
      <Container className="settings-page-container">
        <section className="settings-hero-band">
          <div className="settings-hero-copy">
            <p className="settings-section-eyebrow">Guest account</p>
            <h1>Account settings</h1>
            <p>
              Review your profile details before you book, check in, or manage
              a reservation.
            </p>
          </div>

          <div className="settings-hero-summary">
            <div className="settings-hero-avatar">{initials}</div>
            <div className="settings-hero-meta">
              <strong>{userDisplayName || "Guest profile"}</strong>
              <span>
                <FiMail />
                {userEmail || "No email available"}
              </span>
              <span>{completedFields} of 8 profile details completed</span>
            </div>
          </div>
        </section>

        <section className="settings-workspace">
          <div className="settings-sidebar-column">
            <LeftBar signOutProcess={signOutProcess} />
          </div>

          <div className="settings-content-column">
            <RightSubPage />
          </div>
        </section>
      </Container>
    </div>
  );
}
