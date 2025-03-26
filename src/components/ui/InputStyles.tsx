import { styled } from "@mui/material/styles";

// Common input styling to be used across all input types
export const commonInputStyles = (error?: boolean) => ({
  display: "block",
  width: "100%",
  padding: "10px 12px",
  marginBottom: "10px",
  border: `1px solid ${error ? "#ff0000" : "#ccc"}`,
  borderRadius: "4px",
  boxSizing: "border-box" as const,
  fontSize: "14px",
  "&:focus": {
    borderColor: error ? "#ff0000" : "#4CAF50",
    outlineColor: error ? "#ff0000" : "#4CAF50",
    boxShadow: error
      ? "0 0 5px rgba(255, 0, 0, 0.2)"
      : "0 0 5px rgba(76, 175, 80, 0.2)",
  },
});

// Text Input component styling
export const StyledTextInput = styled("input")<{ error?: boolean }>(
  ({ error }) => ({
    ...commonInputStyles(error),
  })
);

// Dropdown component styling
export const StyledDropdown = styled("select")<{ error?: boolean }>(
  ({ error }) => ({
    ...commonInputStyles(error),
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    backgroundSize: "16px",
  })
);

// TextArea component styling
export const StyledTextArea = styled("textarea")<{ error?: boolean }>(
  ({ error }) => ({
    ...commonInputStyles(error),
    minHeight: "120px",
    resize: "vertical",
    fontFamily: "inherit",
  })
);

// Checkbox container styling
export const CheckboxContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "10px",
  marginBottom: "15px",
  width: "100%",
});

// Checkbox item styling
export const CheckboxItem = styled("div")({
  display: "flex",
  alignItems: "flex-start",
  marginBottom: "8px",
});

export const CheckboxLabel = styled("label")({
  display: "flex",
  alignItems: "center",
  fontFamily:
    '-apple-system, "system-ui", "Segoe UI", Roboto, Oxygen, Ubuntu, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  fontSize: "13px",
  marginLeft: "8px",
  lineHeight: "1.3",
});

// Note styling for additional information
export const StyledNote = styled("p")({
  fontSize: "13px",
  color: "#666",
  marginTop: "4px",
  marginBottom: "10px",
});

// Row for rebate fields
export const RebateRow = styled("div")({
  display: "flex",
  gap: "15px",
  marginBottom: "15px",

  "@media (max-width: 768px)": {
    flexDirection: "column",
    gap: "10px",
  },
});

export const RebateField = styled("div")({
  flex: 1,
  minWidth: "0", // Allow fields to shrink if needed
});
