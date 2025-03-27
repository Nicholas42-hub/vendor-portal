import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { msalInstance } from "./auth/msalConfig";

// MSAL Browser - Handle the redirect flows
msalInstance.handleRedirectPromise().catch((err) => {
  console.error("Error handling redirect:", err);
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
