import bcrypt from "bcrypt";
import fs from "fs/promises";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import path from "path";

import { User } from "@/models";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username: string = credentials?.username ?? "";
        const password: string = credentials?.password ?? "";

        const filePath = path.join(process.cwd(), "public", "users.json");
        const fileContent = await fs.readFile(filePath, "utf8");
        const users = JSON.parse(fileContent);

        const user = users.find((user: User) => user.username === username);

        const match = user && (await bcrypt.compare(password, user.password));
        if (!match) {
          return null;
        }

        user.id = user.token;

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/register",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = user;
      session.token = token.sub ?? "";
      return session;
    },
  },
});
