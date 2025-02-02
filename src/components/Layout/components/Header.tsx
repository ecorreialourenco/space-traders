import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();

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
        <Button variant="text" onClick={() => handleRoute("/login")}>
          Login
        </Button>
        <Button variant="text" onClick={() => handleRoute("/signup")}>
          Signup
        </Button>
      </div>
    </div>
  );
};
