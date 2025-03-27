import { LogLevel, Configuration } from '@azure/msal-browser';

// MSAL configuration for Azure AD (not B2C)
export const msalConfig: Configuration = {
  auth: {
    clientId: '9d17a3ef-09ed-4bfe-bac1-4f37823fbcae',
    authority: 'https://login.microsoftonline.com/e8a8a7fa-7424-4855-aea4-3b639b950c5e',
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error: console.error(message); break;
          case LogLevel.Info: console.info(message); break;
          case LogLevel.Verbose: console.debug(message); break;
          case LogLevel.Warning: console.warn(message); break;
        }
      },
      logLevel: LogLevel.Verbose,
    },
  },
};

// Change the scopes to match your API registrations
export const loginRequest = {
  scopes: ['User.Read', 'api://YOUR_API_CLIENT_ID/access_as_user'],
};