import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerDetails: {
    firstName: '',
    lastName: '',
    email: '',
    countryRegion: '',
    phoneCode: '',
    phone: '',
  },
};

const BookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    saveCustomerDetails(state, action) {
      state.customerDetails = action.payload;
    },
    updateCustomerField(state, action) {
      const { field, value } = action.payload;
      state.customerDetails[field] = value;
    },
    clearCustomerDetails(state) {
      state.customerDetails = initialState.customerDetails;
    },
  }
});

export const {
  saveCustomerDetails,
  updateCustomerField,
  clearCustomerDetails,
} = BookingSlice.actions;
export default BookingSlice.reducer;