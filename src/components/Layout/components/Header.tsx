import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { AgentHeader } from "./AgentHeader";

export const Header = () => {
  const router = useRouter();
  const { status } = useSession();

  const isAuthenticated = status === "authenticated";

  const handleRoute = (url: string) => router.push(url);

  return (
    <>
      <div className="w-full flex justify-between h-12">
        <Button variant="text" onClick={() => handleRoute("/")}>
          Space Traders
        </Button>
        <div>
          {isAuthenticated ? (
            <>
              <Button variant="text" onClick={() => handleRoute("/ships")}>
                Ships
              </Button>
              <Button variant="text" onClick={() => handleRoute("/contracts")}>
                Contracts
              </Button>
              <Button variant="text" onClick={() => signOut()}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="text" onClick={() => handleRoute("/login")}>
                Login
              </Button>
              <Button variant="text" onClick={() => handleRoute("/signup")}>
                Signup
              </Button>
            </>
          )}
        </div>
      </div>
      {isAuthenticated && (
        <div className="w-full flex justify-between h-10">
          <AgentHeader />
        </div>
      )}
    </>
  );
};
