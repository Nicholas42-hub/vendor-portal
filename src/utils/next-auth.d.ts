import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
    } & DefaultSession["user"];
  }

  interface Account {
    access_token?: string;
    id_token?: string;
    provider: string;
    type: string;
  }

  interface Profile {
    sub?: string;
    name?: string;
    email?: string;
    given_name?: string;
    family_name?: string;
    preferred_username?: string;
  }
}