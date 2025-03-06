import StorefrontIcon from "@mui/icons-material/Storefront";
import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";

import { FeedbackType, MyShipModel } from "@/models";

import { MarketModal } from "./MarketModal";

interface MarketButtonProps {
  waypoint: string;
  ship: MyShipModel;
  updateCargo: ({ message, type }: FeedbackType) => void;
}

export const MarketButton = ({
  waypoint,
  ship,
  updateCargo,
}: MarketButtonProps) => {
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
        updateCargo={updateCargo}
      />
    </>
  );
};
