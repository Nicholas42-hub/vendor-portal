import React from "react";
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import VendorOnboardingForm from "./components/forms/VendorOnboardingForm";
import "./App.css";

function App() {
  const { instance, accounts } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect({
      scopes: ["openid", "profile", "email", "User.Read"],
    });
  };

  return (
    <>
      <UnauthenticatedTemplate>
        <div className="login-container">
          <h2>Welcome to Vendor Portal</h2>
          <button onClick={handleLogin}>Sign In with Microsoft</button>
        </div>
      </UnauthenticatedTemplate>

      <AuthenticatedTemplate>
        <div className="App">
          <main>
            <VendorOnboardingForm />
          </main>
        </div>
      </AuthenticatedTemplate>
    </>
  );
}

export default App;
