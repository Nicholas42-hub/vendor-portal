import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../auth/authService";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user info when component mounts
    const account = authService.getActiveAccount();
    if (account) {
      setUsername(account.username || account.name);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <h1 style={{ margin: 0 }}>Vendor Portal</h1>
        {username && (
          <div>
            <span style={{ marginRight: "1rem" }}>{username}</span>
            <button
              onClick={handleLogout}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#0078d4",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        )}
      </header>
      <main style={{ padding: "1rem" }}>{children}</main>
    </div>
  );
};
