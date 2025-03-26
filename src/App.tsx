import { useState } from "react";
import "./App.css";
import VendorOnboardingForm from "./components/forms/VendorOnboardingForm";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Vendor Onboarding Portal</h1>
      </header>
      <main>
        <VendorOnboardingForm />
      </main>
    </div>
  );
}

export default App;
