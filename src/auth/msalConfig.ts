import { LogLevel, Configuration, PublicClientApplication } from '@azure/msal-browser';

// MSAL configuration
export const msalConfig: Configuration = {
  auth: {
    clientId: 'YOUR_CLIENT_ID', // From Azure B2C App registration
    authority: 'https://YOUR_TENANT_NAME.b2clogin.com/YOUR_TENANT_NAME.onmicrosoft.com/B2C_1_signupsignin',
    knownAuthorities: ['YOUR_TENANT_NAME.b2clogin.com'],
    redirectUri: 'http://localhost:3000', // Must match registered redirect URI
    postLogoutRedirectUri: 'http://localhost:3000', // Where to redirect after logout
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
      logLevel: LogLevel.Verbose,
    },
  },
};

// API scopes for access token
export const loginRequest = {
  scopes: ['https://YOUR_TENANT_NAME.onmicrosoft.com/your-api/user.read'], // Replace with your API scopes
};

// MSAL instance
export const msalInstance = new PublicClientApplication(msalConfig);