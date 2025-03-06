import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import React from "react";

import { AgentHeader } from "./AgentHeader";
import styles from "./Header.module.css";

export const Header = () => {
  const router = useRouter();
  const { status } = useSession();

  const isAuthenticated = status === "authenticated";

  const handleRoute = (url: string) => router.push(url);

  return (
    <>
      <div className="w-full flex justify-between h-12">
        <Button className={styles.button} onClick={() => handleRoute("/")}>
          Space Traders
        </Button>
        <div>
          {isAuthenticated ? (
            <>
              <Button
                className={styles.button}
                onClick={() => handleRoute("/ships")}
              >
                Ships
              </Button>
              <Button
                className={styles.button}
                onClick={() => handleRoute("/contracts")}
              >
                Contracts
              </Button>
              <Button className={styles.button} onClick={() => signOut()}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                className={styles.button}
                onClick={() => handleRoute("/login")}
              >
                Login
              </Button>
              <Button
                className={styles.button}
                onClick={() => handleRoute("/signup")}
              >
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
