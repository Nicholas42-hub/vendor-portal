import { useState, useEffect } from "react";
import "./App.css";
import {
  useMsal,
  useIsAuthenticated,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import {
  InteractionStatus,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import VendorOnboardingForm from "./components/forms/VendorOnboardingForm";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Create a theme instance for MUI components
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2",
    },
    secondary: {
      main: "#4CAF50",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

// Login request with scopes
const loginRequest = {
  scopes: ["User.Read"],
};

// Fabric API request with appropriate scopes
const fabricRequest = {
  scopes: ["https://analysis.windows.net/powerbi/api/GraphQLApi.Execute.All"],
};

// Loading component when checking authentication
const LoadingScreen = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      flexDirection: "column",
    }}
  >
    <div
      style={{
        width: "50px",
        height: "50px",
        border: "5px solid #f3f3f3",
        borderTop: "5px solid #1976D2",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        marginBottom: "20px",
      }}
    />
    <p>Loading, please wait...</p>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Login component for unauthenticated users
const LoginComponent = () => {
  const { instance } = useMsal();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = () => {
    setIsLoggingIn(true);
    instance.loginRedirect(loginRequest).catch((e) => {
      console.error("Login failed:", e);
      setIsLoggingIn(false);
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Vendor Onboarding Portal</h1>
        <p style={{ marginBottom: "30px", color: "#666" }}>
          Please sign in with your Microsoft account to access the portal
        </p>
        <button
          onClick={handleLogin}
          disabled={isLoggingIn}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "12px",
            backgroundColor: "#1976D2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: isLoggingIn ? "not-allowed" : "pointer",
            transition: "background-color 0.3s",
            opacity: isLoggingIn ? 0.7 : 1,
          }}
        >
          {isLoggingIn ? (
            <>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  border: "2px solid #ffffff",
                  borderTop: "2px solid transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  marginRight: "10px",
                }}
              />
              Signing in...
            </>
          ) : (
            <>
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
              Sign in with Microsoft
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// Main content component for authenticated users
const MainContent = () => {
  const { instance, accounts, inProgress } = useMsal();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get access token for API calls
  useEffect(() => {
    const getAccessToken = async () => {
      if (accounts.length > 0) {
        try {
          const silentRequest = {
            ...fabricRequest,
            account: accounts[0],
          };

          try {
            const response = await instance.acquireTokenSilent(silentRequest);
            setAccessToken(response.accessToken);
          } catch (error) {
            // If silent token acquisition fails, fallback to interactive method
            if (error instanceof InteractionRequiredAuthError) {
              try {
                // Try redirect flow for token acquisition
                await instance.acquireTokenRedirect(fabricRequest);
              } catch (e) {
                console.error("Interactive token acquisition failed:", e);
              }
            } else {
              console.error("Token acquisition failed:", error);
            }
          }
        } catch (error) {
          console.error("Token acquisition error:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    if (inProgress === InteractionStatus.None) {
      getAccessToken();
    }
  }, [instance, accounts, inProgress]);

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="App">
      <header
        style={{
          backgroundColor: "#f8f9fa",
          padding: "15px 20px",
          borderBottom: "1px solid #e9ecef",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "24px" }}>
          Vendor Onboarding Portal
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {accounts[0] && (
            <span style={{ fontSize: "14px" }}>
              Signed in as: {accounts[0].username || accounts[0].name}
            </span>
          )}
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Sign out
          </button>
        </div>
      </header>
      <main style={{ padding: "20px" }}>
        <VendorOnboardingForm />
      </main>
    </div>
  );
};

function App() {
  const { inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  // Show loading while authentication is in progress
  if (inProgress !== InteractionStatus.None) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthenticatedTemplate>
        <MainContent />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <LoginComponent />
      </UnauthenticatedTemplate>
    </ThemeProvider>
  );
}

export default App;
