import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import modeReducer from "./features/modeSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const userPersistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  mode: modeReducer,
});

const persistedReducer = persistReducer(userPersistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
