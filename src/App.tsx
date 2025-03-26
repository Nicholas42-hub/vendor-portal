import React from "react";
import "./App.css";
import VendorOnboardingForm from "./components/forms/VendorOnboardingForm";
import { styled } from "@mui/material/styles";

// Updated container styling for the main app
const AppContainer = styled("div")({
  width: "100%",
  maxWidth: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#f9f9f9",
});

const Header = styled("header")({
  width: "100%",
  padding: "20px 0",
  backgroundColor: "#fff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  marginBottom: "20px",
  textAlign: "center",
});

const HeaderTitle = styled("h1")({
  color: "#333",
  fontSize: "28px",
  margin: 0,
});

const Main = styled("main")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

function App() {
  return (
    <AppContainer className="App">
      <Header>
        <HeaderTitle>Vendor Onboarding Portal</HeaderTitle>
      </Header>
      <Main>
        <VendorOnboardingForm />
      </Main>
    </AppContainer>
  );
}

export default App;
