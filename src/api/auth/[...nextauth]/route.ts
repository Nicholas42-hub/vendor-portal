import NextAuth from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.REACT_APP_AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.REACT_APP_AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.REACT_APP_AZURE_AD_TENANT_ID!,
      authorization: {
        params: {
          // Request token with specific scopes
          scope: "openid profile email User.Read",
        }
      }
    }),
  ],
  
  // Configure session handling
  session: {
    strategy: "jwt", // Use JSON Web Tokens for session management
    maxAge: 2 * 60 * 60, // Session expires after 2 hours (in seconds)
  },
  
  // Custom callbacks for token and session management
  callbacks: {
    async jwt({ token, account, profile }) {
      // Add additional user information to the token
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      
      // Add profile information to the token if available
      if (profile) {
        token.email = profile.email;
        token.name = profile.name;
      }
      
      return token;
    },
    
    async session({ session, token }) {
      // Pass through access token and additional user info
      session.accessToken = token.accessToken as string;
      session.user.email = token.email;
      session.user.name = token.name;
      
      return session;
    },
  },
  
  // Custom pages for authentication flow
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  
  // Debug configuration
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };