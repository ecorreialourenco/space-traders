/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { type DefaultSession } from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: User;
    token: string;
  }

  interface User {
    username: string;
    password: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    expire: string;
  }
}
