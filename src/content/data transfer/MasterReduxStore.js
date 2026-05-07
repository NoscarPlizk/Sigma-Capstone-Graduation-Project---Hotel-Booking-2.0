import { configureStore } from '@reduxjs/toolkit';

import bookingReducer from '../../pages/ViewHotel/Redux/StoreBookingRoom/BookingSlice_ViewHotel';
import SubPageReducer from '../../pages/UserSettingPage/Redux/SubPageSlice';
import FinalBookingDataReducer from '../../pages/PurchasePortal/Redux/FinalBookingDataSlice'

export const MasterReduxStore = configureStore({
  reducer: {
    viewhotel_selectbooking: bookingReducer,
    UserSettingPage_SubPage: SubPageReducer,
    PurchasePortal_FinalBookingData: FinalBookingDataReducer
  },
});