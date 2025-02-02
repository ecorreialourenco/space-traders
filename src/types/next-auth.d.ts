/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { type DefaultSession } from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      password: string;
      token: string;
    };
    token: string;
  }

  interface User {
    username: string;
    password: string;
    token: string;
  }
}
