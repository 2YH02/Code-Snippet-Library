import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const root = ReactDOM.createRoot(document.getElementById("root"));
const clientId =
  "553055141427-tellilrsf644g02h99hkua5jeba09usr.apps.googleusercontent.com";
root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <GoogleOAuthProvider clientId={clientId}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </DndProvider>
  </React.StrictMode>
);
