import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { MarketModal } from "./MarketModal";
import { MyShipModel } from "@/models";

interface MarketButtonProps {
  waypoint: string;
  ship: MyShipModel;
}

export const MarketButton = ({ waypoint, ship }: MarketButtonProps) => {
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
        ship={ship}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
