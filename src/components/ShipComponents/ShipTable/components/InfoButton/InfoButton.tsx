import InfoIcon from "@mui/icons-material/Info";
import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";

import { MyShipModel } from "@/models";

import { InfoModal } from "./InfoModal";

interface InfoButtonProps {
  ship: MyShipModel;
}

export const InfoButton = ({ ship }: InfoButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Tooltip title="Info">
        <span>
          <IconButton onClick={() => setIsOpen(true)}>
            <InfoIcon />
          </IconButton>
        </span>
      </Tooltip>

      <InfoModal ship={ship} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
