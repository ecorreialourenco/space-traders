import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export const Header = () => {
  const router = useRouter();
  const { status } = useSession();

  const handleRoute = (url: string) => {
    router.push(url);
  };

  return (
    <div className="w-full flex justify-between h-12">
      <div>
        <Button variant="text" onClick={() => handleRoute("/")}>
          Space Traders
        </Button>
      </div>
      <div>
        {status === "authenticated" ? (
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
  );
};
