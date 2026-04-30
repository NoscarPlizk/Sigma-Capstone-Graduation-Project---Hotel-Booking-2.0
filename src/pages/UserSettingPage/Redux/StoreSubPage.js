import { configureStore } from "@reduxjs/toolkit";
import SubPageReducer from './SubPageSlice';

export const StoreSubPage = configureStore({
  reducer: {
    SubPage: SubPageReducer,
  }
})