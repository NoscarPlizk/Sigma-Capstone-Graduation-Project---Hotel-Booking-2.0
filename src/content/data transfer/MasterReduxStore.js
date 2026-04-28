import { configureStore } from '@reduxjs/toolkit';

import bookingReducer from '../../pages/ViewHotel/Redux/StoreBookingRoom/BookingSlice_ViewHotel';
import modalReducer from '../../pages/ViewHotel/Redux/ShowModal/ModalShowSlice';

export const MasterReduxStore = configureStore({
  reducer: {
    booking: bookingReducer,
    modal: modalReducer
  },
});