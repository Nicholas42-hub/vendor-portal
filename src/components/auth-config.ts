import { LogLevel } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    // This is the ONLY mandatory field that you need to supply.
    clientId: '9d17a3ef-09ed-4bfe-bac1-4f37823fbcae',
    // Replace the placeholder with your tenant subdomain
    authority: 'https://login.microsoftonline.com/e8a8a7fa-7424-4855-aea4-3b639b950c5e',
    // Points to window.location.origin. You must register this URI on Azure Portal/App Registration.
    redirectUri: 'http://localhost:3000/api/auth/callback/azure-ad',
    // Indicates the page to navigate after logout.
    postLogoutRedirectUri: '/',
    // If "true", will navigate back to the original request location before processing the auth code response
    navigateToLoginRequestUrl: false,
  },
  cache: {
    // Configures cache location. "sessionStorage" is more secure,
    // but "localStorage" gives you SSO between tabs.
    cacheLocation: 'sessionStorage',
    // Set this to "true" if you are having issues on IE11 or Edge
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      
loggerCallback: (level: LogLevel, message: string, containsPii: boolean)=> {
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
          default:
            return;
        }
      }
    }
  }
  // Scopes you add here will be prompted for user consent during sign-in.
  // By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
  // For more information about OIDC scopes, visit:
};