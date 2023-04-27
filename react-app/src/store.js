import { combineReducers } from "@reduxjs/toolkit";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

let user = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    isLogin: false,
  },
  reducers: {
    setUser(state, action) {
      return {
        name: action.payload.name,
        email: action.payload.email,
        isLogin: action.payload.isLogin,
      };
    },
  },
});

export let { setUser } = user.actions;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: user.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
