import React, { useEffect } from "react";
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import VendorOnboardingForm from "./components/forms/VendorOnboardingForm";
import "./App.css";

function App() {
  const { instance, accounts } = useMsal();

  // Trigger the login redirect if no account is signed in
  useEffect(() => {
    if (accounts.length === 0) {
      instance.loginRedirect().catch((error) => {
        console.error("Login redirect error:", error);
      });
    }
  }, [accounts, instance]);

  return (
    <>
      <UnauthenticatedTemplate>
        <p>Redirecting to login...</p>
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
