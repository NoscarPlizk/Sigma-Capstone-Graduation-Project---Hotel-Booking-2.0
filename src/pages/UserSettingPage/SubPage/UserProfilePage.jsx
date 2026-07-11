import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Button, Form, ProgressBar, Spinner } from "react-bootstrap";
import {
  FiCalendar,
  FiCamera,
  FiCheckCircle,
  FiCreditCard,
  FiFlag,
  FiGlobe,
  FiHome,
  FiImage,
  FiMail,
  FiPhone,
  FiTrash2,
  FiUser,
} from "react-icons/fi";
import { useAuth } from "../../../content/Firebase/AuthContext";
import "./UserProfilePage.css";

import { countryRegionOptions } from "../../../content/countryRegionOptions";
import { nationalityData } from "../../../content/nationalityData";

function hasContent(value) {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  if (value && typeof value === "object") {
    return Object.values(value).some((entry) => hasContent(entry));
  }

  return Boolean(value);
}

function getInitials(profile) {
  const firstName = profile?.name?.first_name?.trim();
  const lastName = profile?.name?.last_name?.trim();
  const displayName = profile?.display_name?.trim();
  const email = profile?.email?.trim();

  if (firstName || lastName) {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase() || "GU";
  }

  if (displayName) {
    return displayName.slice(0, 2).toUpperCase();
  }

  return (email || "GU").slice(0, 2).toUpperCase();
}

function formatRealName(name) {
  const firstName = name?.first_name?.trim() || "";
  const lastName = name?.last_name?.trim() || "";
  const fullName = `${firstName} ${lastName}`.trim();

  return fullName || "Not set";
}

function formatPhone(phone) {
  const regionCode = phone?.region_number_code?.trim() || "";
  const telephoneNumber = phone?.telephone_number?.trim() || "";
  return regionCode && telephoneNumber ? `${regionCode} ${telephoneNumber}` : "Not set";
}

function formatPassport(passport) {
  const fullName = `${passport?.first_name || ""} ${passport?.last_name || ""}`.trim();
  const country = passport?.passport_country?.trim() || "";
  const number = passport?.passport_number?.trim() || "";

  if (!fullName && !country && !number) {
    return "Not set";
  }

  return [fullName, country, number].filter(Boolean).join(" | ");
}

function getAvatarUrl(profile) {
  return profile?.avatar?.url?.trim() || "";
}

function ProfileSection({ eyebrow, title, description, children }) {
  return (
    <section className="profile-section">
      <div className="profile-section-heading">
        <p className="profile-section-eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="profile-section-rows">{children}</div>
    </section>
  );
}

function ProfileRow({
  icon,
  label,
  helperText,
  displayValue,
  editContent,
  onSave,
  valueTone = "default",
  readOnly = false,
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const Icon = icon;

  async function handleSave() {
    if (!onSave) {
      return;
    }

    try {
      setIsSaving(true);
      setErrorMessage("");
      await onSave();
      setOpenEdit(false);
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to save this field right now.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <article className="profile-row-card">
      <div className="profile-row-main">
        <div className="profile-row-label-group">
          <span className="profile-row-icon">
            <Icon />
          </span>
          <div className="profile-row-copy">
            <strong>{label}</strong>
            <p>{helperText}</p>
          </div>
        </div>

        <div className="profile-row-value-group">
          <div className={`profile-row-value profile-row-value-${valueTone}`}>
            {displayValue || "Not set"}
          </div>

          {!readOnly ? (
            <div className="profile-row-actions">
              {!openEdit ? (
                <Button
                  type="button"
                  variant="outline-secondary"
                  className="profile-action-button"
                  onClick={() => setOpenEdit(true)}
                >
                  Edit
                </Button>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="light"
                    className="profile-action-button"
                    onClick={() => {
                      setOpenEdit(false);
                      setErrorMessage("");
                    }}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    className="profile-action-button profile-action-button-primary"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Spinner animation="border" size="sm" />
                        <span>Saving</span>
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="profile-readonly-badge">Synced</div>
          )}
        </div>
      </div>

      {openEdit ? <div className="profile-row-editor">{editContent}</div> : null}
      {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : null}
    </article>
  );
}

function TextProfileField({
  icon,
  label,
  helperText,
  fieldKey,
  value,
  saveSpecDocFirestore,
  type = "text",
  as = "input",
  rows,
}) {
  const inputRef = useRef(null);
  const safeValue = value || "";

  return (
    <ProfileRow
      icon={icon}
      label={label}
      helperText={helperText}
      displayValue={safeValue || "Not set"}
      editContent={
        <Form.Group className="profile-editor-field">
          <Form.Control
            ref={inputRef}
            as={as}
            rows={rows}
            type={as === "input" ? type : undefined}
            defaultValue={safeValue}
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        </Form.Group>
      }
      onSave={() =>
        saveSpecDocFirestore({
          [fieldKey]: inputRef.current?.value || "",
        })
      }
    />
  );
}

function SelectProfileField({
  icon,
  label,
  helperText,
  fieldKey,
  value,
  options,
  saveSpecDocFirestore,
}) {
  const selectRef = useRef(null);

  return (
    <ProfileRow
      icon={icon}
      label={label}
      helperText={helperText}
      displayValue={value || "Not set"}
      editContent={
        <Form.Group className="profile-editor-field">
          <Form.Select ref={selectRef} defaultValue={value || options[0]}>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      }
      onSave={() =>
        saveSpecDocFirestore({
          [fieldKey]: selectRef.current?.value || "",
        })
      }
    />
  );
}

function ReadOnlyProfileField({ icon, label, helperText, value }) {
  return (
    <ProfileRow
      icon={icon}
      label={label}
      helperText={helperText}
      displayValue={value || "Not set"}
      readOnly
      valueTone={value ? "positive" : "muted"}
    />
  );
}

function LegalName({ userName, saveSpecDocFirestore }) {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const firstName = userName?.first_name || "";
  const lastName = userName?.last_name || "";

  return (
    <ProfileRow
      icon={FiUser}
      label="Legal name"
      helperText="Use the name that matches your booking and travel documents."
      displayValue={formatRealName(userName)}
      editContent={
        <div className="profile-editor-grid">
          <Form.Group className="profile-editor-field">
            <Form.Label>First name</Form.Label>
            <Form.Control ref={firstNameRef} type="text" defaultValue={firstName} />
          </Form.Group>
          <Form.Group className="profile-editor-field">
            <Form.Label>Last name</Form.Label>
            <Form.Control ref={lastNameRef} type="text" defaultValue={lastName} />
          </Form.Group>
        </div>
      }
      onSave={() =>
        saveSpecDocFirestore({
          name: {
            first_name: firstNameRef.current?.value || "",
            last_name: lastNameRef.current?.value || "",
          },
        })
      }
    />
  );
}

function PhoneNumber({ phone, saveSpecDocFirestore }) {
  const regionRef = useRef(null);
  const phoneRef = useRef(null);

  const regionCountryCode =
    phone?.region_country_short_name_code || phone?.region_country_code || "";
  const regionCountry = phone?.region_country_name || phone?.region_country || "";
  const regionCode = phone?.region_number_code || phone?.region_code || "";
  const telephoneNumber = phone?.telephone_number || "";

  const selectedRegion =
    countryRegionOptions.find((country) => country.code === regionCountryCode) ||
    countryRegionOptions.find(
      (country) =>
        country.phoneCode === regionCode && country.name === regionCountry
    ) ||
    countryRegionOptions[0];

  return (
    <ProfileRow
      icon={FiPhone}
      label="Phone number"
      helperText="Used for reservation updates and property contact if needed."
      displayValue={formatPhone(phone)}
      editContent={
        <div className="profile-editor-grid">
          <Form.Group className="profile-editor-field">
            <Form.Label>Region</Form.Label>
            <Form.Select
              ref={regionRef}
              defaultValue={selectedRegion?.code}
              aria-label="Phone region"
            >
              {countryRegionOptions.map((region) => (
                <option key={region.code} value={region.code}>
                  {region.phoneCode} {region.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="profile-editor-field">
            <Form.Label>Telephone number</Form.Label>
            <Form.Control
              ref={phoneRef}
              type="text"
              defaultValue={telephoneNumber}
              placeholder="Enter your phone number"
            />
          </Form.Group>
        </div>
      }
      onSave={() => {
        const selectedCountryCode = regionRef.current?.value || "";
        const selectedCountry = countryRegionOptions.find(
          (country) => country.code === selectedCountryCode
        );

        return saveSpecDocFirestore({
          phone: {
            region_country_short_name_code: selectedCountry?.code || "",
            region_number_code: selectedCountry?.phoneCode || "",
            region_country_name: selectedCountry?.name || "",
            telephone_number: phoneRef.current?.value || "",
          },
        });
      }}
    />
  );
}

function Passport({ passport, saveSpecDocFirestore }) {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const countryRef = useRef(null);
  const passportNumberRef = useRef(null);

  const firstName = passport?.first_name || "";
  const lastName = passport?.last_name || "";
  const passportCountry = passport?.passport_country || "";
  const passportNumber = passport?.passport_number || "";

  return (
    <ProfileRow
      icon={FiCreditCard}
      label="Passport"
      helperText="Save passport details to speed up international bookings."
      displayValue={formatPassport(passport)}
      editContent={
        <div className="profile-editor-grid">
          <Form.Group className="profile-editor-field">
            <Form.Label>First name</Form.Label>
            <Form.Control ref={firstNameRef} type="text" defaultValue={firstName} />
          </Form.Group>
          <Form.Group className="profile-editor-field">
            <Form.Label>Last name</Form.Label>
            <Form.Control ref={lastNameRef} type="text" defaultValue={lastName} />
          </Form.Group>
          <Form.Group className="profile-editor-field">
            <Form.Label>Issue country</Form.Label>
            <Form.Select
              ref={countryRef}
              defaultValue={passportCountry || nationalityData[0]}
            >
              {nationalityData.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="profile-editor-field">
            <Form.Label>Passport number</Form.Label>
            <Form.Control
              ref={passportNumberRef}
              type="text"
              defaultValue={passportNumber}
            />
          </Form.Group>
        </div>
      }
      onSave={() =>
        saveSpecDocFirestore({
          passport: {
            first_name: firstNameRef.current?.value || "",
            last_name: lastNameRef.current?.value || "",
            passport_country: countryRef.current?.value || "",
            passport_number: passportNumberRef.current?.value || "",
          },
        })
      }
    />
  );
}

function AvatarProfileField({ userProfile, uploadUserAvatar, removeUserAvatar }) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const storedAvatarUrl = getAvatarUrl(userProfile);
  const previewUrl = localPreviewUrl || storedAvatarUrl;
  const initials = getInitials(userProfile);

  useEffect(() => {
    return () => {
      if (localPreviewUrl) {
        URL.revokeObjectURL(localPreviewUrl);
      }
    };
  }, [localPreviewUrl]);

  function resetLocalSelection() {
    if (localPreviewUrl) {
      URL.revokeObjectURL(localPreviewUrl);
    }

    setSelectedFile(null);
    setLocalPreviewUrl("");
    setUploadProgress(0);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleFileSelection(event) {
    const nextFile = event.target.files?.[0];

    if (!nextFile) {
      return;
    }

    if (!nextFile.type.startsWith("image/")) {
      setErrorMessage("Please choose a valid image file.");
      resetLocalSelection();
      return;
    }

    if (localPreviewUrl) {
      URL.revokeObjectURL(localPreviewUrl);
    }

    setErrorMessage("");
    setSelectedFile(nextFile);
    setLocalPreviewUrl(URL.createObjectURL(nextFile));
  }

  async function handleUpload() {
    if (!selectedFile) {
      setErrorMessage("Choose an image before uploading.");
      return;
    }

    try {
      setIsUploading(true);
      setErrorMessage("");
      await uploadUserAvatar(selectedFile, setUploadProgress);
      resetLocalSelection();
    } catch (error) {
      console.error(error);
      setErrorMessage(error?.message || "Unable to upload avatar right now.");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleRemove() {
    try {
      setIsRemoving(true);
      setErrorMessage("");
      await removeUserAvatar();
      resetLocalSelection();
    } catch (error) {
      console.error(error);
      setErrorMessage(error?.message || "Unable to remove avatar right now.");
    } finally {
      setIsRemoving(false);
    }
  }

  return (
    <article className="profile-row-card profile-avatar-card">
      <div className="profile-avatar-editor">
        <div className="profile-avatar-preview" aria-hidden="true">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Current profile avatar preview"
              className="profile-avatar-image"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        <div className="profile-avatar-actions-panel">
          <div className="profile-row-label-group">
            <span className="profile-row-icon">
              <FiImage />
            </span>
            <div className="profile-row-copy">
              <strong>Profile avatar</strong>
              <p>
                Upload a square image for your account avatar. JPG, PNG, or WebP
                up to 2 MB.
              </p>
            </div>
          </div>

          <Form.Control
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelection}
            className="profile-avatar-input"
          />

          <div className="profile-avatar-button-row">
            <Button
              type="button"
              variant="outline-secondary"
              className="profile-action-button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || isRemoving}
            >
              <FiCamera />
              <span>{selectedFile ? "Choose another" : "Choose image"}</span>
            </Button>

            <Button
              type="button"
              className="profile-action-button profile-action-button-primary"
              onClick={handleUpload}
              disabled={!selectedFile || isUploading || isRemoving}
            >
              {isUploading ? (
                <>
                  <Spinner animation="border" size="sm" />
                  <span>Uploading</span>
                </>
              ) : (
                <>
                  <FiImage />
                  <span>Upload avatar</span>
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="light"
              className="profile-action-button"
              onClick={handleRemove}
              disabled={(!storedAvatarUrl && !selectedFile) || isUploading || isRemoving}
            >
              {isRemoving ? (
                <>
                  <Spinner animation="border" size="sm" />
                  <span>Removing</span>
                </>
              ) : (
                <>
                  <FiTrash2 />
                  <span>Remove avatar</span>
                </>
              )}
            </Button>
          </div>

          <div className="profile-avatar-meta">
            <span>
              {selectedFile
                ? `${selectedFile.name} (${Math.ceil(selectedFile.size / 1024)} KB)`
                : storedAvatarUrl
                  ? "Avatar saved in Firebase Storage."
                  : "No avatar uploaded yet."}
            </span>
          </div>

          {isUploading ? (
            <div className="profile-avatar-progress">
              <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
            </div>
          ) : null}
        </div>
      </div>

      {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : null}
    </article>
  );
}

export default function UserProfilePage() {
  const {
    userProfile,
    saveSpecDocFirestore,
    SaveSpecDocFirestore,
    uploadUserAvatar,
    removeUserAvatar,
  } = useAuth();
  const persistProfile = saveSpecDocFirestore || SaveSpecDocFirestore;

  const profileChecks = useMemo(
    () => [
      hasContent(userProfile?.name),
      hasContent(userProfile?.display_name),
      hasContent(userProfile?.email),
      hasContent(userProfile?.phone),
      hasContent(userProfile?.birth_date),
      hasContent(userProfile?.gender),
      hasContent(userProfile?.address),
      hasContent(userProfile?.nationality),
      hasContent(userProfile?.passport),
    ],
    [userProfile]
  );

  const completedCount = profileChecks.filter(Boolean).length;
  const completionPercent = Math.round((completedCount / profileChecks.length) * 100);
  const initials = getInitials(userProfile);
  const avatarUrl = getAvatarUrl(userProfile);

  return (
    <div className="user-profile-page">
      <section className="profile-overview-band">
        <div className="profile-overview-main">
          <div className="profile-avatar">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profile avatar" className="profile-avatar-image" />
            ) : (
              initials
            )}
          </div>
          <div className="profile-overview-copy">
            <p className="profile-section-eyebrow">Profile overview</p>
            <h2>{userProfile?.display_name || formatRealName(userProfile?.name)}</h2>
            <p>
              Keep your personal details accurate so checkout, invoices, and
              property check-in stay consistent.
            </p>
          </div>
        </div>

        <div className="profile-overview-stats">
          <div className="profile-completion">
            <div className="profile-completion-header">
              <span>Profile completeness</span>
              <strong>{completionPercent}%</strong>
            </div>
            <ProgressBar now={completionPercent} className="profile-progress" />
            <span className="profile-completion-caption">
              {completedCount} of {profileChecks.length} sections filled
            </span>
          </div>

          <div className="profile-highlights">
            <div className="profile-highlight-item">
              <FiMail />
              <span>{userProfile?.email || "No email saved"}</span>
            </div>
            <div className="profile-highlight-item">
              <FiPhone />
              <span>{formatPhone(userProfile?.phone)}</span>
            </div>
            <div className="profile-highlight-item">
              <FiCheckCircle />
              <span>Firestore sync active</span>
            </div>
          </div>
        </div>
      </section>

      <div className="profile-sections">
        <ProfileSection
          eyebrow="Identity"
          title="Personal details"
          description="Core account information that appears in your guest profile."
        >
          <AvatarProfileField
            userProfile={userProfile}
            uploadUserAvatar={uploadUserAvatar}
            removeUserAvatar={removeUserAvatar}
          />
          <LegalName
            userName={userProfile?.name}
            saveSpecDocFirestore={persistProfile}
          />
          <TextProfileField
            icon={FiUser}
            label="Display name"
            helperText="Shown across your account and reservation views."
            fieldKey="display_name"
            value={userProfile?.display_name}
            saveSpecDocFirestore={persistProfile}
          />
          <ReadOnlyProfileField
            icon={FiMail}
            label="Email address"
            helperText="Controlled by your authentication account."
            value={userProfile?.email}
          />
          <TextProfileField
            icon={FiCalendar}
            label="Date of birth"
            helperText="Required by some properties and payment providers."
            fieldKey="birth_date"
            value={userProfile?.birth_date}
            type="date"
            saveSpecDocFirestore={persistProfile}
          />
          <SelectProfileField
            icon={FiFlag}
            label="Gender"
            helperText="Optional profile detail stored with your guest record."
            fieldKey="gender"
            value={userProfile?.gender}
            options={["Male", "Female", "I prefer not to say"]}
            saveSpecDocFirestore={persistProfile}
          />
        </ProfileSection>

        <ProfileSection
          eyebrow="Contact"
          title="Reachability"
          description="Details properties can use to reach you before arrival."
        >
          <PhoneNumber phone={userProfile?.phone} saveSpecDocFirestore={persistProfile} />
          <TextProfileField
            icon={FiHome}
            label="Residential address"
            helperText="Use your primary residential address for billing context."
            fieldKey="address"
            value={userProfile?.address}
            as="textarea"
            rows={3}
            saveSpecDocFirestore={persistProfile}
          />
          <SelectProfileField
            icon={FiGlobe}
            label="Nationality"
            helperText="Used when a booking flow asks for citizenship information."
            fieldKey="nationality"
            value={userProfile?.nationality}
            options={nationalityData}
            saveSpecDocFirestore={persistProfile}
          />
        </ProfileSection>

        <ProfileSection
          eyebrow="Travel"
          title="Travel document"
          description="Passport data you may need for international reservations."
        >
          <Passport passport={userProfile?.passport} saveSpecDocFirestore={persistProfile} />
        </ProfileSection>
      </div>
    </div>
  );
}
