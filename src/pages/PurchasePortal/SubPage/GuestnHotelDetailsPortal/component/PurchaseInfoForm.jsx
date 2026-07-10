import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAuth } from "../../../../../content/Firebase/AuthContext";
import {
  setBookingForType,
  setCompanyName,
  setCompanyRegNum,
  setProfileCountryRegion,
  setProfileEmail,
  setProfileFirstName,
  setProfileLastName,
  setProfileTelRegCode,
  setProfileTelephone,
} from "../../../Redux/FinalBookingDataSlice";
import { countryRegionOptions } from "../../../../../content/countryRegionOptions";

function BookingTypePicker({ bookingForTypeReg }) {
  const dispatch = useDispatch();

  const options = [
    {
      value: "mainGuest",
      label: "I'm the main guest",
      description: "Use my profile and contact details for this stay.",
    },
    {
      value: "someoneElse",
      label: "I'm booking for someone else",
      description: "Guest and contact details should match the traveller.",
    },
    {
      value: "company",
      label: "Company or business",
      description: "Attach company billing information to this reservation.",
    },
  ];

  return (
    <div className="purchase-radio-grid">
      {options.map((option) => (
        <label
          key={option.value}
          className={`purchase-radio-card ${bookingForTypeReg === option.value ? "is-selected" : ""}`.trim()}
        >
          <input
            type="radio"
            value={option.value}
            checked={bookingForTypeReg === option.value}
            onChange={(event) =>
              dispatch(setBookingForType(event.target.value))
            }
          />
          <span className="purchase-radio-title">{option.label}</span>
          <span className="purchase-radio-description">
            {option.description}
          </span>
        </label>
      ))}
    </div>
  );
}

export default function PurchaseInfoForm({
  userProfile,
  DetectedTouch,
  isError,
  VarValueBeforeSubmitState,
}) {
  const dispatch = useDispatch();
  const { firebaseUser } = useAuth();
  const { SethadvaluebeforeSubmit } = VarValueBeforeSubmitState;

  const bookingRegistry = useSelector(
    (state) => state.PurchasePortal_FinalBookingData.CustomerDetailsnBookingHotelData
  );

  const bookingForTypeReg =
    bookingRegistry?.main_guest_name?.guest_booking_for_type ?? "mainGuest";
  const firstNameReg = bookingRegistry?.main_guest_name?.first_name ?? "";
  const lastNameReg = bookingRegistry?.main_guest_name?.last_name ?? "";
  const countryNameReg = bookingRegistry?.country_region?.country_name ?? "";
  const isUnderCompanyBusinessReg =
    bookingRegistry?.company?.is_Company_Business === true;
  const companyNameReg =
    bookingRegistry?.company?.company_data?.company_name ?? "";
  const companyRegNumReg =
    bookingRegistry?.company?.company_data?.company_reg_num ?? "";
  const emailReg = bookingRegistry?.email ?? "";
  const telephoneRegionCodeReg =
    bookingRegistry?.phone?.region_country_short_name_code ?? "";
  const telephoneNumberReg = bookingRegistry?.phone?.phone_number ?? "";

  function findCountryByPhone(phone) {
    if (!phone || typeof phone !== "object") {
      return undefined;
    }

    const regionCountryCode =
      phone.region_country_short_name_code ?? phone.region_country_code ?? "";
    const regionCountryName =
      phone.region_country_name ?? phone.region_country ?? "";
    const regionNumberCode =
      phone.region_number_code ?? phone.region_code ?? "";

    return (
      countryRegionOptions.find((country) => country.code === regionCountryCode) ||
      countryRegionOptions.find(
        (country) =>
          country.name === regionCountryName &&
          country.phoneCode === regionNumberCode
      ) ||
      countryRegionOptions.find((country) => country.name === regionCountryName)
    );
  }

  useEffect(() => {
    if (!userProfile) {
      return;
    }

    const selectedPhoneCountry = findCountryByPhone(userProfile.phone);

    dispatch(
      setProfileFirstName({ setFirstName: userProfile.name.first_name ?? "" })
    );
    dispatch(
      setProfileLastName({ setLastName: userProfile.name.last_name ?? "" })
    );
    dispatch(
      setProfileCountryRegion({
        setCountryData: countryRegionOptions.find(
          (country) => country.name === userProfile.nationality
        ),
      })
    );
    dispatch(setProfileEmail({ setEmail: userProfile.email ?? "" }));

    if (selectedPhoneCountry) {
      dispatch(
        setProfileTelRegCode({ setTeleCountryRegion: selectedPhoneCountry })
      );
    }

    if (userProfile?.phone?.telephone_number) {
      dispatch(
        setProfileTelephone({
          setTelephoneNumber: userProfile.phone.telephone_number,
        })
      );
    }
  }, [dispatch, userProfile]);

  function syncFieldCompletion(value, keyname) {
    SethadvaluebeforeSubmit((prev) => ({
      ...prev,
      [keyname]: String(value ?? "").trim().length > 0,
    }));
  }

  useEffect(() => {
    syncFieldCompletion(firstNameReg, "first_name");
    syncFieldCompletion(lastNameReg, "last_name");
    syncFieldCompletion(countryNameReg, "country_region_name");
    syncFieldCompletion(emailReg, "email");
    syncFieldCompletion(telephoneRegionCodeReg, "phone_country_region");
    syncFieldCompletion(telephoneNumberReg, "phone_number");

    if (bookingForTypeReg === "company") {
      syncFieldCompletion(companyNameReg, "company_name");
      syncFieldCompletion(companyRegNumReg, "company_reg_num");
      return;
    }

    syncFieldCompletion("", "company_name");
    syncFieldCompletion("", "company_reg_num");
  }, [
    SethadvaluebeforeSubmit,
    bookingForTypeReg,
    companyNameReg,
    companyRegNumReg,
    countryNameReg,
    emailReg,
    firstNameReg,
    lastNameReg,
    telephoneNumberReg,
    telephoneRegionCodeReg,
  ]);

  return (
    <div className="purchase-form-shell">
      <div className="purchase-form-topbar">
        <div>
          <h3>Booking guest details</h3>
          <p className="purchase-section-copy">
            The main contact below will be used for payment confirmation and
            booking follow-up.
          </p>
        </div>

        {firebaseUser ? (
          <div className="purchase-auth-chip">
            Signed in as <strong>{firebaseUser.email}</strong>
          </div>
        ) : null}
      </div>

      <div className="purchase-form-section">
        <div className="purchase-form-section-head">
          <h4>Booking type</h4>
        </div>
        <BookingTypePicker bookingForTypeReg={bookingForTypeReg} />
      </div>

      {bookingForTypeReg === "someoneElse" ? (
        <div className="purchase-callout">
          Use the traveller&apos;s full name and contact details so the property
          can identify the person arriving at check-in.
        </div>
      ) : null}

      <div className="purchase-form-section">
        <div className="purchase-form-section-head">
          <h4>Primary guest</h4>
        </div>

        <div className="purchase-field-grid purchase-field-grid-three">
          <label className="purchase-field">
            <span>First name</span>
            <input
              className={isError(firstNameReg, "first_name") ? "is-invalid" : ""}
              name="first_name"
              value={firstNameReg}
              onChange={(event) => {
                dispatch(
                  setProfileFirstName({ setFirstName: event.target.value })
                );
                DetectedTouch({ name: event.target.name });
              }}
            />
          </label>

          <label className="purchase-field">
            <span>Last name</span>
            <input
              className={isError(lastNameReg, "last_name") ? "is-invalid" : ""}
              name="last_name"
              value={lastNameReg}
              onChange={(event) => {
                dispatch(setProfileLastName({ setLastName: event.target.value }));
                DetectedTouch({ name: event.target.name });
              }}
            />
          </label>

          <label className="purchase-field">
            <span>Country or region</span>
            <select
              className={
                isError(countryNameReg, "country_region_name") ? "is-invalid" : ""
              }
              name="country_region_name"
              value={countryNameReg}
              onChange={(event) => {
                const countryName = event.target.value;

                dispatch(
                  setProfileCountryRegion({
                    setCountryData: countryRegionOptions.find(
                      (country) => country.name === countryName
                    ),
                  })
                );
                DetectedTouch({ name: event.target.name });
              }}
            >
              <option value="" disabled>
                Select country or region
              </option>
              {countryRegionOptions.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {isUnderCompanyBusinessReg ? (
        <div className="purchase-form-section">
          <div className="purchase-form-section-head">
            <h4>Company details</h4>
          </div>

          <div className="purchase-field-grid purchase-field-grid-two">
            <label className="purchase-field">
              <span>Company name</span>
              <input
                className={
                  isError(companyNameReg, "company_name") ? "is-invalid" : ""
                }
                name="company_name"
                value={companyNameReg}
                onChange={(event) => {
                  dispatch(setCompanyName({ setCompanyName: event.target.value }));
                  DetectedTouch({ name: event.target.name });
                }}
              />
            </label>

            <label className="purchase-field">
              <span>Company registration number</span>
              <input
                className={
                  isError(companyRegNumReg, "company_reg_num")
                    ? "is-invalid"
                    : ""
                }
                name="company_reg_num"
                value={companyRegNumReg}
                onChange={(event) => {
                  dispatch(
                    setCompanyRegNum({ setCompanyRegNum: event.target.value })
                  );
                  DetectedTouch({ name: event.target.name });
                }}
              />
            </label>
          </div>
        </div>
      ) : null}

      <div className="purchase-form-section">
        <div className="purchase-form-section-head">
          <h4>Contact details</h4>
        </div>

        <div className="purchase-field-grid purchase-field-grid-two">
          <label className="purchase-field">
            <span>Email address</span>
            <input
              className={isError(emailReg, "email") ? "is-invalid" : ""}
              name="email"
              type="email"
              value={emailReg}
              onChange={(event) => {
                dispatch(setProfileEmail({ setEmail: event.target.value }));
                DetectedTouch({ name: event.target.name });
              }}
            />
          </label>

          <div className="purchase-field">
            <span>Telephone number</span>
            <div className="purchase-phone-row">
              <select
                className={
                  isError(telephoneRegionCodeReg, "phone_country_region")
                    ? "is-invalid"
                    : ""
                }
                name="phone_country_region"
                value={telephoneRegionCodeReg}
                onChange={(event) => {
                  const countryCode = event.target.value;

                  dispatch(
                    setProfileTelRegCode({
                      setTeleCountryRegion: countryRegionOptions.find(
                        (country) => country.code === countryCode
                      ),
                    })
                  );
                  DetectedTouch({ name: event.target.name });
                }}
              >
                <option value="" disabled>
                  Code
                </option>
                {countryRegionOptions.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.phoneCode} {country.name}
                  </option>
                ))}
              </select>

              <input
                className={
                  isError(telephoneNumberReg, "phone_number") ? "is-invalid" : ""
                }
                name="phone_number"
                type="text"
                value={telephoneNumberReg}
                onChange={(event) => {
                  dispatch(
                    setProfileTelephone({
                      setTelephoneNumber: event.target.value,
                    })
                  );
                  DetectedTouch({ name: event.target.name });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
