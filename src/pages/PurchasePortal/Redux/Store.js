import { configureStore } from "@reduxjs/toolkit";
import BookingSlice from './BookingSlice';


export const store = configureStore({
  reducer: {
    counter: BookingSlice
  }
})
