import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./ModalShowSlice";

export const Store_ModalShowSlice = configureStore({
  reducer: {
    modal: modalReducer,
  },
});