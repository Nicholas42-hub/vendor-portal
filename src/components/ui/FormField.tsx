import React, { ReactNode } from "react";
import { styled } from "@mui/material/styles";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  children: ReactNode;
}

// New form field layout with horizontal alignment
const StyledFormField = styled("div")(({ theme }) => ({
  marginBottom: "1.5rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: "20px",
  width: "100%",
}));

// Label now takes up fixed width on the left
const StyledLabel = styled("label")(({ theme }) => ({
  boxSizing: "border-box",
  color: "rgb(31, 31, 35)",
  cursor: "default",
  fontFamily:
    '-apple-system, "system-ui", "Segoe UI", Roboto, Oxygen, Ubuntu, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  fontSize: "14px",
  fontWeight: 600,
  width: "200px",
  minWidth: "200px", // Fixed width for labels
  textAlign: "right", // Right-align text for better alignment with inputs
  lineHeight: "20px",
  padding: "10px 0", // Add padding to vertically center the label with inputs
  overflow: "visible",
  textOverflow: "clip",
  wordBreak: "break-word",
}));

const RequiredIndicator = styled("span")({
  color: "red",
  marginLeft: "5px",
});

// Input container expands to fill remaining space
const InputContainer = styled("div")({
  flex: "1",
  maxWidth: "calc(100% - 220px)", // Account for label width + gap
});

const ErrorMessage = styled("div")({
  color: "#ff0000",
  fontSize: "12px",
  marginTop: "5px",
});

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  required = false,
  error,
  touched = false,
  children,
}) => {
  return (
    <StyledFormField>
      <StyledLabel htmlFor={htmlFor}>
        {label}
        {required && <RequiredIndicator>*</RequiredIndicator>}
      </StyledLabel>
      <InputContainer>
        {children}
        {touched && error && <ErrorMessage>{error}</ErrorMessage>}
      </InputContainer>
    </StyledFormField>
  );
};
