import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import VendorOnboardingForm from "./components/forms/VendorOnboardingForm";
import { Login } from "./components/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { AppLayout } from "./components/AppLayout";
import { msalInstance } from "./auth/msalConfig";

function App() {
  // Handle MSAL redirect response on app init
  useEffect(() => {
    msalInstance.handleRedirectPromise().catch((err) => {
      console.error("Error handling redirect:", err);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route
            index
            element={
              <AppLayout>
                <VendorOnboardingForm />
              </AppLayout>
            }
          />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
