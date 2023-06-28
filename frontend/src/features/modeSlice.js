import { createSlice } from "@reduxjs/toolkit";

export const modeSlice = createSlice({
  name: "mode",
  initialState: {
    mode: false,
  },
  reducers: {
    toggleModeData: (state, action) => {
      state.mode = !state.mode;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleModeData } = modeSlice.actions;

export default modeSlice.reducer;
