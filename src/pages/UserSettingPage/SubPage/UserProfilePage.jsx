import { Image, Col, Row } from "react-bootstrap";
import { Fragment, useRef, useState } from "react";
import { useAuth } from "../../../content/Firebase/AuthContext";
import "./UserProfilePage.css";

import { countryRegionOptions } from "../../../content/countryRegionOptions";
import { nationalityData } from "../../../content/nationalityData";

function ProfileRow({ label, displayValue, editContent, onSave }) {
  const [openEdit, setOpenEdit] = useState(false);

  function handleSave() {
    onSave();
    setOpenEdit(false);
  }

  return (
    <div className="EveryChildBox">
      <div>
        <strong>{label}:</strong>
      </div>

      <div className="SecondLongBox">
        <div>{displayValue || ""}</div>

        {openEdit && <div>{editContent}</div>}

        {onSave && (
          <div>
            {!openEdit ? (
              <button onClick={() => setOpenEdit(true)}>Edit</button>
            ) : (
              <div>
                <button onClick={() => setOpenEdit(false)}>Cancel</button>
                <button onClick={handleSave}>Save</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TextProfileField({
  label,
  fieldKey,
  value,
  SaveSpecDocFirestore,
  type = "text",
}) {
  const inputRef = useRef(null);
  const safeValue = value || "";

  return (
    <ProfileRow
      label={label}
      displayValue={safeValue}
      editContent={
        <input
          type={type}
          ref={inputRef}
          defaultValue={safeValue}
          placeholder={safeValue}
        />
      }
      onSave={() => {
        SaveSpecDocFirestore({
          [fieldKey]: inputRef.current.value,
        });
      }}
    />
  );
}

function SelectProfileField({
  label,
  fieldKey,
  value,
  options,
  SaveSpecDocFirestore,
}) {
  const selectRef = useRef(null);

  return (
    <ProfileRow
      label={label}
      displayValue={value || ""}
      editContent={
        <select ref={selectRef} defaultValue={value || options[0]}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      }
      onSave={() => {
        SaveSpecDocFirestore({
          [fieldKey]: selectRef.current.value,
        });
      }}
    />
  );
}

function ReadOnlyProfileField({ label, value }) {
  return <ProfileRow label={label} displayValue={value || ""} />;
}

function LegalName({ userName, SaveSpecDocFirestore }) {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const firstName = userName?.first_name || "";
  const lastName = userName?.last_name || "";

  return (
    <ProfileRow
      label="Real Name"
      displayValue={
        firstName.length > 0
          ? `${firstName} ${lastName}`
          : "No Name Please Set Name"
      }
      editContent={
        <div>
          <div>
            First Name:
            <input
              type="text"
              ref={firstNameRef}
              defaultValue={firstName}
              placeholder={firstName}
            />
          </div>

          <div>
            Last Name:
            <input
              type="text"
              ref={lastNameRef}
              defaultValue={lastName}
              placeholder={lastName}
            />
          </div>
        </div>
      }
      onSave={() => {
        SaveSpecDocFirestore({
          name: {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
          },
        });
      }}
    />
  );
}

function PhoneNumber({ phone, SaveSpecDocFirestore }) {
  const regionRef = useRef(null);
  const phoneRef = useRef(null);

  const regionCountryCode =
    phone?.region_country_short_name_code || phone?.region_country_code || "";
  const regionCountry =
    phone?.region_country_name || phone?.region_country || "";
  const regionCode = phone?.region_number_code || phone?.region_code || "";
  const telephoneNumber = phone?.telephone_number || "";

  const selectedRegion =
    countryRegionOptions.find(
      (country) => country.code === regionCountryCode
    ) ||
    countryRegionOptions.find(
      (country) =>
        country.phoneCode === regionCode && country.name === regionCountry
    ) ||
    countryRegionOptions[0];

  const displayPhone =
    regionCode.length > 0 && telephoneNumber.length > 0
      ? `${regionCode} ${telephoneNumber}`
      : "";

  return (
    <ProfileRow
      label="Phone"
      displayValue={displayPhone}
      editContent={
        <div>
          <select
            ref={regionRef}
            id="Telephone Region"
            defaultValue={selectedRegion?.code}
            required
          >
            {countryRegionOptions.map((region) => (
              <option key={region.code} value={region.code}>
                {region.phoneCode} {region.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            ref={phoneRef}
            defaultValue={telephoneNumber}
            placeholder={displayPhone}
            required
          />
        </div>
      }
      onSave={() => {
        const selectedCountryCode = regionRef.current.value;

        const selectedCountry = countryRegionOptions.find(
          (country) => country.code === selectedCountryCode
        );

        SaveSpecDocFirestore({
          phone: {
            region_country_short_name_code: selectedCountry?.code || "",
            region_number_code: selectedCountry?.phoneCode || "",
            region_country_name: selectedCountry?.name || "",
            telephone_number: phoneRef.current.value,
          },
        });
      }}
    />
  );
}

function Passport({ passport, SaveSpecDocFirestore }) {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const countryRef = useRef(null);
  const passportNumberRef = useRef(null);

  const firstName = passport?.first_name || "";
  const lastName = passport?.last_name || "";
  const passportCountry = passport?.passport_country || "";
  const passportNumber = passport?.passport_number || "";

  const displayPassport = passport
    ? `${firstName} ${lastName} ${passportCountry}: ${passportNumber}`
    : "";

  return (
    <ProfileRow
      label="Passport"
      displayValue={displayPassport}
      editContent={
        <div>
          <div>
            First Name:
            <input
              id="Passport_First_Name"
              type="text"
              ref={firstNameRef}
              defaultValue={firstName}
            />
          </div>

          <div>
            Last Name:
            <input
              id="Passport_Last_Name"
              type="text"
              ref={lastNameRef}
              defaultValue={lastName}
            />
          </div>

          <div>
            Issue Country:
            <select
              ref={countryRef}
              defaultValue={passportCountry || nationalityData[0]}
            >
              {nationalityData.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div>
            Passport Number:
            <input
              id="Passport_Number"
              type="text"
              ref={passportNumberRef}
              defaultValue={passportNumber}
            />
          </div>
        </div>
      }
      onSave={() => {
        SaveSpecDocFirestore({
          passport: {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            passport_country: countryRef.current.value,
            passport_number: passportNumberRef.current.value,
          },
        });
      }}
    />
  );
}

export default function UserProfilePage() {
  const { userProfile, SaveSpecDocFirestore } = useAuth();

  const profileRows = [
    <LegalName
      userName={userProfile?.name}
      SaveSpecDocFirestore={SaveSpecDocFirestore}
    />,
    <TextProfileField
      label="Display Name"
      fieldKey="display_name"
      value={userProfile?.display_name}
      SaveSpecDocFirestore={SaveSpecDocFirestore}
    />,
    <ReadOnlyProfileField label="Email" value={userProfile?.email} />,
    <PhoneNumber
      phone={userProfile?.phone}
      SaveSpecDocFirestore={SaveSpecDocFirestore}
    />,
    <TextProfileField
      label="Date of Birth"
      fieldKey="birth_date"
      value={userProfile?.birth_date}
      type="date"
      SaveSpecDocFirestore={SaveSpecDocFirestore}
    />,
    <SelectProfileField
      label="Gender"
      fieldKey="gender"
      value={userProfile?.gender}
      options={["Male", "Female", "I prefer not to say"]}
      SaveSpecDocFirestore={SaveSpecDocFirestore}
    />,
    <TextProfileField
      label="Residential Address"
      fieldKey="address"
      value={userProfile?.address}
      SaveSpecDocFirestore={SaveSpecDocFirestore}
    />,
    <SelectProfileField
      label="Nationality"
      fieldKey="nationality"
      value={userProfile?.nationality}
      options={nationalityData}
      SaveSpecDocFirestore={SaveSpecDocFirestore}
    />,
    <Passport
      passport={userProfile?.passport}
      SaveSpecDocFirestore={SaveSpecDocFirestore}
    />,
  ];

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
          {profileRows.map((row, index) => (
            <Fragment key={index}>
              <Row>{row}</Row>
              {index !== profileRows.length - 1 && <hr />}
            </Fragment>
          ))}
        </Col>
      </div>
    </div>
  );
}
