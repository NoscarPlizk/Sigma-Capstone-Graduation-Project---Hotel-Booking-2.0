import { createSlice } from "@reduxjs/toolkit";

const SubPageSlice = createSlice({
  name: 'SubPage',
  initialState: { SelectState: 'profile' },
  reducers: {
    selectSubPage(state, action) {
      state.SelectState = action.payload;
    }
  }
})

export const { selectSubPage } = SubPageSlice.actions;
export default SubPageSlice.reducer;