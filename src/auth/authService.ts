import { msalInstance, loginRequest } from './msalConfig';
import { AccountInfo, AuthenticationResult, InteractionRequiredAuthError, SilentRequest } from '@azure/msal-browser';

class AuthService {
  /**
   * Login the user
   */
  async login() {
    try {
      return await msalInstance.loginPopup(loginRequest);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  /**
   * Logout the user
   */
  logout() {
    return msalInstance.logoutPopup({
      postLogoutRedirectUri: window.location.origin,
    });
  }

  /**
   * Get the current active account
   */
  getActiveAccount(): AccountInfo | null {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length === 0) {
      return null;
    }
    return accounts[0];
  }

  /**
   * Get an access token silently
   */
  async getAccessToken(): Promise<string | null> {
    const account = this.getActiveAccount();
    if (!account) {
      return null;
    }

    const request: SilentRequest = {
      ...loginRequest,
      account,
    };

    try {
      const response: AuthenticationResult = await msalInstance.acquireTokenSilent(request);
      return response.accessToken;
    } catch (error) {
      // If silent token acquisition fails, try interactive method
      if (error instanceof InteractionRequiredAuthError) {
        try {
          const response = await msalInstance.acquireTokenPopup(request);
          return response.accessToken;
        } catch (err) {
          console.error('Error acquiring token interactively:', err);
          return null;
        }
      } else {
        console.error('Error acquiring token silently:', error);
        return null;
      }
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getActiveAccount();
  }
}

export const authService = new AuthService();