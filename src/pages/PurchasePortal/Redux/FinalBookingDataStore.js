import { configureStore } from "@reduxjs/toolkit";
import FinalBookingDataSlice from './FinalBookingDataSlice';


export const store = configureStore({
  reducer: {
    counter: FinalBookingDataSlice
  }
})
