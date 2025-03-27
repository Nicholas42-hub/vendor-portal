import React, { ReactNode } from "react";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./msalConfig";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
};
