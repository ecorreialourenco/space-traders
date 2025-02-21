import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { MarketModal } from "./MarketModal";

interface MarketButtonProps {
  waypoint: string;
}

export const MarketButton = ({ waypoint }: MarketButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Tooltip title="Marketplace">
        <span>
          <IconButton onClick={() => setIsOpen(true)}>
            <StorefrontIcon />
          </IconButton>
        </span>
      </Tooltip>
      <MarketModal
        waypoint={waypoint}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
