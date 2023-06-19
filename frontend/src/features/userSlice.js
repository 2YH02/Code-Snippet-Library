import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    name: null,
    email: null,
    photo: null,
    isLogin: false,
  },
  reducers: {
    updateUserData: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
      state.isLogin = true;
    },
    resetUserData: (state, action) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.photo = null;
      state.isLogin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUserData, resetUserData } = userSlice.actions;

export default userSlice.reducer;
