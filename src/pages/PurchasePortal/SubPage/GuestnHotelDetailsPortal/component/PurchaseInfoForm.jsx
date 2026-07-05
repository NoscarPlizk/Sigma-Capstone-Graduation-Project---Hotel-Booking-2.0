import { useEffect, useRef } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";

import { useAuth } from '../../../../../content/Firebase/AuthContext';

import {
  setBookingForType,
  setProfileFirstName, 
  setProfileLastName,
  setProfileCountryRegion,
  setCompanyName,
  setCompanyRegNum,
  setProfileEmail,
  setProfileTelRegCode,
  setProfileTelephone,
} from '../../../Redux/FinalBookingDataSlice';

import { countryRegionOptions } from '../../../../../content/countryRegionOptions';


function OneCheckedOnly({ bookingForTypeReg }) {
  const dispatch = useDispatch();

  return (
    <div>
      <label className="mb-1"><strong>Are you Booking for?</strong></label>
      <div className="d-flex mb-3 gap-3">
        <div className="theCheckBoxStyle">
          <label>
            <input 
              type="radio" 
              value='mainGuest' 
              checked={bookingForTypeReg === 'mainGuest'}
              onChange={(e) => dispatch(setBookingForType(e.target.value))}
            />
            I'm the main guest
          </label>
        </div>            
        <div className="theCheckBoxStyle">
          <label>
            <input 
              type="radio" 
              value='someoneElse'
              checked={bookingForTypeReg === 'someoneElse'}
              onChange={(e) => dispatch(setBookingForType(e.target.value))}
            />
            I'm booking for someone else
          </label>
        </div>            
        <div className="theCheckBoxStyle">
          <label>
            <input 
              type="radio" 
              value='company'
              checked={bookingForTypeReg === 'company'}
              onChange={(e) => dispatch(setBookingForType(e.target.value))}
            />
            Under Company / Business
          </label>
        </div>
      </div>
    </div>
  )
}

export default function PurchaseInfoForm({ 
  userProfile, DetectedTouch, isError, VarValueBeforeSubmitState
}) {
  const dispatch = useDispatch();

  const { hadvaluebeforeSubmit, SethadvaluebeforeSubmit } = VarValueBeforeSubmitState;
  
  const bookingRegistry = useSelector(state => 
    state.PurchasePortal_FinalBookingData.CustomerDetailsnBookingHotelData
  );
  console.log("bookingRegistry:", bookingRegistry);
  const bookingForTypeReg = bookingRegistry?.main_guest_name?.guest_booking_for_type ?? 'mainGuest';
  const firstNameReg = bookingRegistry?.main_guest_name?.first_name ?? '';
  const lastNameReg = bookingRegistry?.main_guest_name?.last_name ?? '';
  const countryRegionReg = bookingRegistry?.country_region?.country_code ?? '';
  const countryNameReg = bookingRegistry?.country_region?.country_name ?? '';
  const isUnderCompanyBusinessReg = bookingRegistry?.company?.is_Company_Business ?? '';
  const companyNameReg = bookingRegistry?.company?.company_data.company_name ?? '';
  const companyRegNumReg = bookingRegistry?.company?.company_data.company_reg_num ?? '';
  const emailReg = bookingRegistry?.email ?? '';
  const telephoneRegionCodeReg = bookingRegistry?.phone?.region_code ?? '';
  const telephoneNumberReg = bookingRegistry?.phone?.phone_number ?? '';

  const InputCompanyName = useRef(null);
  const InputCompanyRegNum = useRef(null);

  const { firebaseUser } = useAuth();

  useEffect(() => {
    if (userProfile) {
      dispatch(setProfileFirstName({ setFirstName: userProfile.name.first_name }));
      dispatch(setProfileLastName({ setLastName: userProfile.name.last_name }));
      dispatch(setProfileCountryRegion({ 
        setCountryData: countryRegionOptions.find((country) => 
        country.name === userProfile.nationality )
      }));
      dispatch(setProfileEmail({ setEmail: userProfile.email }));
      dispatch(setProfileTelRegCode({ setTeleCountryRegion: userProfile.phone }));
      dispatch(setProfileTelephone({ setTelephoneNumber: userProfile.phone.telephone_number }));
    }
  }, [])

  function checkisNotEmptyStateByUseEffect(
    stateRegistryProps, SethadvaluebeforeSubmit, keyname
  ) {
    stateRegistryProps.length > 0 ? 
      SethadvaluebeforeSubmit((prev) => ({ 
        ...prev, [keyname]: true 
      })) : 
      SethadvaluebeforeSubmit((prev) => ({ 
        ...prev, [keyname]: false 
      })) ;
  }

  useEffect(() => {
    checkisNotEmptyStateByUseEffect(
      firstNameReg, SethadvaluebeforeSubmit, 'first_name'
    );
    checkisNotEmptyStateByUseEffect(
      lastNameReg, SethadvaluebeforeSubmit, 'last_name'
    );
    checkisNotEmptyStateByUseEffect(
      countryNameReg, SethadvaluebeforeSubmit, 'country_region_name'
    );
    checkisNotEmptyStateByUseEffect(
      emailReg, SethadvaluebeforeSubmit, 'email'
    );
    checkisNotEmptyStateByUseEffect(
      telephoneRegionCodeReg, SethadvaluebeforeSubmit, 'phone_country_region'
    );
    checkisNotEmptyStateByUseEffect(
      telephoneNumberReg, SethadvaluebeforeSubmit, 'phone_number'
    );

    if (bookingForTypeReg === 'company') {
      checkisNotEmptyStateByUseEffect(
        firstNameReg, SethadvaluebeforeSubmit, 'company_name'
      );
      checkisNotEmptyStateByUseEffect(
        firstNameReg, SethadvaluebeforeSubmit, 'company_reg_num'
      );
    }
  }, [bookingRegistry])

  return (
    <div className="PurchaseInfoForm">
      <div className="mb-3">
        <div className='d-flex justify-content-between'>
          <h5>Booking Guest Details</h5>
          <div>
            {!!firebaseUser && 
              <div className='border'>
                You Had Signed In:
                <strong>
                  {firebaseUser.email}
                </strong>
              </div>
            }
          </div>
        </div>
        <OneCheckedOnly bookingForTypeReg={bookingForTypeReg} />
        {bookingForTypeReg === 'someoneElse' && 
          <div className='border'>
            Make sure you set the <strong>guest name</strong> and <strong>contact details</strong> is for who will be live to the hotel.
          </div>
        }
        
        <div className="GuestDetailsGroup">
          <div>
            <label>
              First Name 
              <input
                className={
                  isError(firstNameReg, 'first_name') ?
                  'FalseInputBox' : 'GeneralInputBox'
                }
                name='first_name'
                value={firstNameReg ?? ''} 
                onChange={(e) => {
                  dispatch(setProfileFirstName({ setFirstName: e.target.value }));
                  DetectedTouch({ name : e.target.name });
                }}
              />
            </label>
          </div>
          <div>
            <label>
              Last Name 
              <input 
                className={
                  isError(lastNameReg, 'last_name') ?
                  'FalseInputBox' : 'GeneralInputBox' 
                }
                name='last_name'
                value={lastNameReg ?? ''} 
                onChange={(e) => {
                  dispatch(setProfileLastName({ setLastName: e.target.value }))
                  DetectedTouch({ name: e.target.name });
                }}
              />
            </label>
          </div>
          <div>
            <label>
              Country / Region
              <select 
                className={
                  isError(countryNameReg, Object.keys(countryNameReg)) ? 
                  "FalseInputBox CountryRegion" : "GeneralInputBox CountryRegion" 
                }
                name='country_region_name'
                value={countryNameReg ?? ''}
                onChange={(e) => {                  
                  const country_name = e.target.value;

                  dispatch(
                    setProfileCountryRegion({ 
                      setCountryData: countryRegionOptions.find(
                      (country) => country.name === country_name 
                  )}))
                  DetectedTouch({ name: e.target.name });
                }}
              >
                <option value="" disabled>
                  Select country/region
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
        { isUnderCompanyBusinessReg === true &&
          <div className='d-flex'>
            <div>
              <div>Company Name</div>                
              <div>
                <input 
                  className={
                    isError(companyNameReg, 'company_name') ? 
                    "FalseInputBox" : "GeneralInputBox" 
                  }
                  name='company_name'
                  type='text' 
                  value={companyNameReg ?? ''}
                  onChange={(e) => {
                    dispatch(setCompanyName({ setCompanyName: e.target.value }))
                    DetectedTouch({ name: e.target.name });
                  }}
                />
              </div>
            </div>
            <div>
              <div>Company Registration Number</div>
              <label>
                <input 
                  className={
                    isError(companyRegNumReg, 'company_reg_num') ? 
                    "FalseInputBox" : "GeneralInputBox" 
                  }
                  name='company_reg_num'
                  type='number' 
                  value={companyRegNumReg ?? ''}
                  onChange={(e) => {
                    dispatch(setCompanyRegNum({ setCompanyRegNum: e.target.value }))
                    DetectedTouch({ name: e.target.name });
                  }}
                />
              </label>
            </div>
          </div>
        }
      </div>
      <div className="mb-3">
        <div>
          <h5>Contact</h5>
          <div className="GuestDetailsGroup">
            <div>
              <div>Email Address</div>
              <input 
                className={
                  isError(emailReg, 'email') ? 
                  "FalseInputBox" : "GeneralInputBox" 
                }
                name='email'
                type="text" 
                value={emailReg ?? ''}
                onChange={(e) => {
                  dispatch(setProfileEmail({ setEmail: e.target.value }))
                  DetectedTouch({ name: e.target.name });
                }}
              />
            </div>
            <div>
              <div>Phone</div>
              <div className="d-flex me-3">
                <select 
                  className={
                    isError(telephoneRegionCodeReg, 'country_region_telephone') ? 
                    "FalseInputBox CountryTeleCode" : "GeneralInputBox CountryTeleCode"
                  }
                  name='country_region_telephone'
                  value={telephoneRegionCodeReg ?? ''}
                  onChange={(e) => {
                    const country_name = e.target.value; 

                    dispatch(setProfileTelRegCode({ 
                      setTeleCountryRegion: countryRegionOptions.find(
                      (country) => country.name === country_name
                    )}))
                    DetectedTouch({ name: e.target.name });
                  }}
                >
                  <option value="" disabled>
                    Phone
                  </option>
                  {countryRegionOptions.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.phoneCode} {country.name}
                    </option>
                  ))}
                </select>
                <input 
                  className={
                    isError(telephoneNumberReg, 'phone_number') ? 
                    "FalseInputBox" : "GeneralInputBox"
                  }
                  name='phone_number'
                  type="text" 
                  value={telephoneNumberReg ?? ''}
                  onChange={(e) => {
                    dispatch(setProfileTelephone({ setTelephoneNumber: e.target.value }))
                    DetectedTouch({ name: e.target.name });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
          {/* <p>Input phone number exclude initial digit 0 like 0/13-323-1323</p> */}
      </div>
    </div>
  )
}