import { configureStore } from '@reduxjs/toolkit';

import bookingReducer from '../../pages/ViewHotel/Redux/StoreBookingRoom/BookingSlice_ViewHotel';
import modalReducer from '../../pages/ViewHotel/Redux/ShowModal/ModalShowSlice';
import SubPageReducer from '../../pages/UserSettingPage/Redux/SubPageSlice';

export const MasterReduxStore = configureStore({
  reducer: {
    booking: bookingReducer,
    modal: modalReducer,
    SubPage: SubPageReducer
  },
});