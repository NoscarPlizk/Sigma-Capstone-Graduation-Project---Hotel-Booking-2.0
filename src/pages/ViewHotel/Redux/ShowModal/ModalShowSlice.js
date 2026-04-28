import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'Modal_PurchasePortal',
  initialState: { OpenStatus: false },
  reducers: {

    openModal: (state) => {
      state.OpenStatus = true;
    },
    
    closeModal: (state) => {
      state.OpenStatus = false;
    },

  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;