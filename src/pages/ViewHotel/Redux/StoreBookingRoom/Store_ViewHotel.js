import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './BookingSlice_ViewHotel';

export const Store_ViewHotel = configureStore({
  reducer: {
    booking: bookingReducer,
  },
});