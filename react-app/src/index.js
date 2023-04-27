import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./store.js";

export let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById("root"));
const clientId =
  "553055141427-tellilrsf644g02h99hkua5jeba09usr.apps.googleusercontent.com";
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GoogleOAuthProvider clientId={clientId}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
