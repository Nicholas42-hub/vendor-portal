import React from "react";
import { styled } from "@mui/material/styles";

// Updated FormContainer with increased width
const FormContainer = styled("div")({
  maxWidth: "1280", // Increased from 800px
  width: "100%",
  margin: "0 auto",
  padding: "20px",
  fontFamily:
    '-apple-system, "system-ui", "Segoe UI", Roboto, Oxygen, Ubuntu, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
});

// Section container with updated styling
const SectionContainer = styled("div")({
  background: "#f7f7f7",
  padding: "30px",
  margin: "0px 0",
  borderRadius: "8px",
  boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
  width: "100%",
});

const SectionTitle = styled("h2")({
  fontSize: "1.3em",
  color: "rgb(31, 31, 35)",
  fontWeight: 600,
  marginBottom: "20px",
  marginTop: "10px",
  borderBottom: "1px solid #e0e0e0",
  paddingBottom: "10px",
});

const FormLegend = styled("legend")({
  fontFamily:
    '-apple-system, "system-ui", "Segoe UI", Roboto, Oxygen, Ubuntu, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  fontSize: "26px",
  fontWeight: 800,
  color: "rgb(31, 31, 35)",
  marginBottom: "25px",
  width: "100%",
});

export { FormContainer, SectionContainer, SectionTitle, FormLegend };
