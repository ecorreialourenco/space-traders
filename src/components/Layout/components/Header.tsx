import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

import { useAgent } from "@/hooks";

import { AgentHeader } from "./AgentHeader";
import styles from "./Header.module.css";

export const Header = () => {
  const router = useRouter();
  const { status } = useSession();
  const { data } = useAgent();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const isAuthenticated = status === "authenticated";

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRoute = (url: string) => {
    router.push(url);
    handleClose();
  };

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

              <Tooltip title="Account settings" placement="bottom-end">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2, mr: 1 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 24, height: 24, fontSize: 14 }}>
                    {data?.symbol.charAt(0)}
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => handleRoute("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => handleRoute("/server")}>
                  Server
                </MenuItem>
                <MenuItem onClick={() => signOut()}>Logout</MenuItem>
              </Menu>
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
