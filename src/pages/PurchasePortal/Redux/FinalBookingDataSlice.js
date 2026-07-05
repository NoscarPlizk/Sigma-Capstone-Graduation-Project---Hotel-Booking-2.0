import { createSlice } from "@reduxjs/toolkit";
import BookingRegCodeGenerate from "./sub-function/BookingRegCodeGenerate";
import SumAllSelRoomAmtNPrc from "./sub-function/SumAllSelRoomAmtNPrc";

const initialState = {
  CustomerDetailsnBookingHotelData: {
    booking_registry_code: '',
    main_guest_name: {
      guest_booking_for_type: 'mainGuest',
      first_name: '',
      last_name: ''
    },
    country_region: {
      country_code: '',
      country_name: ''
    },
    email: '',
    phone: {
      region_number_code: '',
      region_country_name: '',
      region_country_short_name_code: '',
      phone_number: ''
    },
    company: {
      is_Company_Business: false,
      company_data: {
        company_name: '',
        company_reg_num: ''
      }
    },
    main_hotel_booked: {
      main_hotel_name: '',
      main_hotel_address: '',
      checking_start_end_time: {
        check_in_date: '',
        check_out_date: '',
        total_days: ''
      },
      guest: {
        adults: '',
        childs: ''
      },
      total_cost: {
        grand_total_cost: '',
        grand_total_cost_deceimal: '',
        currency: '',
      },
      select_room_offers: [],
      rawjsondata: {}
    }
  },
};

const FinalBookingDataSlice = createSlice({
  name: 'finalbookingdataregistry',
  initialState,
  reducers: {
    setBookingForType(state, action) {
      const setGuestBookingForType = action.payload;
    
      state.CustomerDetailsnBookingHotelData.
      main_guest_name.guest_booking_for_type = setGuestBookingForType;

      const path_company = state.CustomerDetailsnBookingHotelData.company;
      
      if (setGuestBookingForType === 'company') {
        path_company.is_Company_Business = true 
      } else {
        path_company.is_Company_Business = false;
        path_company.company_data.company_name = '';
        path_company.company_data.company_reg_num = '';
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
      const { setCountryData } = action.payload;
      if (!setCountryData) {
        return;
      }

      state.CustomerDetailsnBookingHotelData.
      country_region.country_code = setCountryData.code; // setCountryData.phoneCode
      state.CustomerDetailsnBookingHotelData.
      country_region.country_name = setCountryData.name;
    },

    setCompanyName(state, action) {
      const { setCompanyName } = action.payload;
      state.CustomerDetailsnBookingHotelData.
      company.company_data.company_name = setCompanyName;
    },

    setCompanyRegNum(state, action) {
      const { setCompanyRegNum } = action.payload;
      state.CustomerDetailsnBookingHotelData.
      company.company_data.company_reg_num = setCompanyRegNum;
    },

    setProfileEmail(state, action) {
      const { setEmail } = action.payload;
      state.CustomerDetailsnBookingHotelData.
      email = setEmail;
    },

    setProfileTelRegCode(state, action) {
      const { setTeleCountryRegion } = action.payload;
      if (!setTeleCountryRegion) {
        return;
      }

      const regionNumberCode =
        setTeleCountryRegion.phoneCode ??
        setTeleCountryRegion.region_number_code ??
        setTeleCountryRegion.region_code ??
        '';
      const regionCountryName =
        setTeleCountryRegion.name ??
        setTeleCountryRegion.region_country_name ??
        setTeleCountryRegion.region_country ??
        '';
      const regionCountryShortNameCode =
        setTeleCountryRegion.code ??
        setTeleCountryRegion.region_country_short_name_code ??
        setTeleCountryRegion.region_country_code ??
        '';

      state.CustomerDetailsnBookingHotelData.
      phone.region_number_code = regionNumberCode;
      state.CustomerDetailsnBookingHotelData.
      phone.region_country_name = regionCountryName;
      state.CustomerDetailsnBookingHotelData.
      phone.region_country_short_name_code = regionCountryShortNameCode;
    },

    setProfileTelephone(state, action) {
      const { setTelephoneNumber } = action.payload;
      state.CustomerDetailsnBookingHotelData.
      phone.phone_number = setTelephoneNumber;
    },
    
    setMainHotelData(state, action) {
      const {
        setHotelName,
        setHotelAddress,
        setHotelId,
        setCheckInNOut,
        setGuestPax,
        setSelectedOfferRoomData,
        setCurrency,
        setJSONDATA
      } = action.payload;

      console.log('actionpayload From Slice:', action.payload);

      const { start_date, end_date } = setCheckInNOut;

      const OfferedRoomData = setSelectedOfferRoomData.map((MainRoom) => ({
        ...MainRoom,
        base_select_room: MainRoom.base_select_room.flatMap((offer) => {
          const AmountofRoom = offer.amount;
          const { amount: _amount, ...otherProperty } = offer;
          return Array.from({ length: AmountofRoom }, (_, repeatIndex) => ({
            ...otherProperty,
            main_guest_name: '',
            repeatIndex,
            uniqueKey: `${offer.block_id}-${repeatIndex}`
          }));
        }) 
      }));

      const total_cost = SumAllSelRoomAmtNPrc(setSelectedOfferRoomData);

      function ConvertToDecimal(total_cost) {
        return Math.round(total_cost * 100);
      }

      const booking_registry = state.CustomerDetailsnBookingHotelData;
      const path_main_hotel_booked = state.CustomerDetailsnBookingHotelData.main_hotel_booked;
      
      booking_registry.booking_registry_code = BookingRegCodeGenerate(setHotelId, start_date, end_date);
      path_main_hotel_booked.main_hotel_name = setHotelName;
      path_main_hotel_booked.main_hotel_address = setHotelAddress;
      path_main_hotel_booked.checking_start_end_time.check_in_date = setCheckInNOut.start_date;
      path_main_hotel_booked.checking_start_end_time.check_out_date = setCheckInNOut.end_date;
      path_main_hotel_booked.checking_start_end_time.total_days = setCheckInNOut.total_days;
      path_main_hotel_booked.guest.adults = setGuestPax.adultPax;
      path_main_hotel_booked.guest.childs = setGuestPax.childPax;
      path_main_hotel_booked.select_room_offers = OfferedRoomData;
      path_main_hotel_booked.total_cost.grand_total_cost = total_cost;
      path_main_hotel_booked.total_cost.grand_total_cost_deceimal = ConvertToDecimal(total_cost);
      path_main_hotel_booked.total_cost.currency = setCurrency;
      path_main_hotel_booked.rawjsondata = setJSONDATA;
    },

    setProfileFirstMainGuestNameRoom(state, action) {
      const { setMainGuestName } = action.payload;
      
      const path_main_hotel_booked = state.CustomerDetailsnBookingHotelData.main_hotel_booked;

      path_main_hotel_booked.select_room_offers[0]
      .base_select_room[0].main_guest_name = setMainGuestName
    },

    setMainGuestName(state, action) {
      const { baseRoomId, uniqueKey, newMainGuestName } = action.payload;
      console.log("setMainGuestName RUNNING");
      const path_main_hotel_booked = state.CustomerDetailsnBookingHotelData.main_hotel_booked;

      path_main_hotel_booked.select_room_offers.find((Base) => Base.base_room_id === baseRoomId).
      base_select_room.find((Offer) => Offer.uniqueKey === uniqueKey).
      main_guest_name = newMainGuestName;
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
  setProfileTelephone,
  setMainHotelData,
  setProfileFirstMainGuestNameRoom,
  setMainGuestName
} = FinalBookingDataSlice.actions;
export default FinalBookingDataSlice.reducer;
