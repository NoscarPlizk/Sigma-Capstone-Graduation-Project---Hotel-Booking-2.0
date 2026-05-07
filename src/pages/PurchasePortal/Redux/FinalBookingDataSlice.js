import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CustomerDetailsnBookingHotelData: {
    main_guest_name: {
      guest_booking_for_type: 'mainGuest',
      first_name: '',
      last_name: ''
    },
    country_region: '',
    email: '',
    phone: {
      country_region: '',
      phone_number: ''
    },
    company: {
      is_Company_Business: false,
      company_data: {
        company_name: '',
        company_reg_num: ''
      }
    },
    hotel_booking_data: {
      main_hotel_name: '',
      main_hotel_address: '',
      checking_start_end_time: {
        check_in: '',
        check_out: '',
        total_days: ''
      },
      guest: {
        adults: '',
        childs: ''
      },
      select_room_offers: []
    }
  },
};

const FinalBookingDataSlice = createSlice({
  name: 'finalbookingdataregistry',
  initialState,
  reducers: {
    setBookingForType(state, action) {
      const setGuestBookingForType = action.payload;
      state.
      CustomerDetailsnBookingHotelData.
      main_guest_name.guest_booking_for_type = setGuestBookingForType;
      
      if (setGuestBookingForType === 'company') {
        state.CustomerDetailsnBookingHotelData.
        company.is_Company_Business = true 
      } else {
        state.CustomerDetailsnBookingHotelData.
        company.is_Company_Business = false
      }
    },

    setProfileFirstName(state, action) {
      const { setFirstName } = action.payload;
      state.CustomerDetailsnBookingHotelData.
      main_guest_name.first_name = setFirstName;
    },

    setProfileLastName(state, action) {
      const { setLastName } = action.payload;
      state.CustomerDetailsnBookingHotelData.
      main_guest_name.last_name = setLastName;
    },

    setProfileCountryRegion(state, action) {
      const { setCountryRegion } = action.payload;
      state.CustomerDetailsnBookingHotelData.
      country_region = setCountryRegion;
    },

    setCompanyName(state, action) {
      const { setCompanyName } = action.payload;
      state.CustomerDetailsnBookingHotelData.
      company.company_data.company_name = setCompanyName;
    },

    setCompanyRegNum(state, action) {
      const { setCompanyRegNum } = action.payload;
      state.CustomerDetailsnBookingHotelData.
      company.company_data.company_name = setCompanyRegNum;
    },

    setProfileEmail(state, action) {
      const { setEmail } = action.payload;
      state.CustomerDetailsnBookingHotelData.
      email = setEmail;
    },

    setProfileTelRegCode(state, action) {
      const { setTeleCountryRegion } = action.payload;
      state.CustomerDetailsnBookingHotelData.
      phone.country_region = setTeleCountryRegion;
    },

    setProfileTelephone(state, action) {
      const { setTelephoneNumber } = action.payload;
      state.CustomerDetailsnBookingHotelData.
      phone.phone_number = setTelephoneNumber;
    }
  }
});

export const {
  setBookingForType,
  setProfileFirstName,
  setProfileLastName,
  setProfileCountryRegion,
  setProfileEmail,
  setCompanyName,
  setCompanyRegNum,
  setProfileTelRegCode,
  setProfileTelephone
} = FinalBookingDataSlice.actions;
export default FinalBookingDataSlice.reducer;