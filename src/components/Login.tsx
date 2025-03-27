import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../auth/authService";
import { styled } from "@mui/material/styles";

const LoginContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#f7f7f7",
});

const LoginCard = styled("div")({
  background: "white",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "400px",
  textAlign: "center",
});

const Logo = styled("img")({
  width: "120px",
  marginBottom: "1.5rem",
});

const Title = styled("h1")({
  fontSize: "1.5rem",
  marginBottom: "1.5rem",
  color: "#333",
});

const LoginButton = styled("button")({
  padding: "0.75rem 1.5rem",
  backgroundColor: "#0078d4",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontSize: "1rem",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  marginTop: "1rem",
  "&:hover": {
    backgroundColor: "#106ebe",
  },
  "&:disabled": {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
});

const ErrorMessage = styled("div")({
  color: "red",
  marginTop: "1rem",
});

const MicrosoftLogo = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginRight: "10px" }}
  >
    <path d="M10 0H21V10H10V0Z" fill="#F25022" />
    <path d="M0 0H10V10H0V0Z" fill="#7FBA00" />
    <path d="M10 11H21V21H10V11Z" fill="#00A4EF" />
    <path d="M0 11H10V21H0V11Z" fill="#FFB900" />
  </svg>
);

export const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.login();
      navigate("/");
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo src="/logo.png" alt="Company Logo" />
        <Title>Vendor Portal Login</Title>
        <LoginButton onClick={handleLogin} disabled={isLoading}>
          {isLoading ? (
            "Signing in..."
          ) : (
            <>
              <MicrosoftLogo /> Sign in with Microsoft
            </>
          )}
        </LoginButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginCard>
    </LoginContainer>
  );
};
