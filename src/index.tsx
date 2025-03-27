import React from "react";
import ReactDOM from "react-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import App from "./App";
import "./index.css"; // optional, if you have global styles

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_AD_CLIENT_ID!, // Replace with your Azure AD client ID
    redirectUri: "http://localhost:3000", // Replace with your redirect URI if needed
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
