import { signOut, useSession } from "next-auth/react";
import { ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, status } = useSession();

  const dateNow = new Date();
  const expireDate = new Date(data?.expires ?? "");

  if (dateNow > expireDate && status === "authenticated") {
    signOut();
  }

  return children;
};
