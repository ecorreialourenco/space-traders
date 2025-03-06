import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";

import { NavActionStatusEnum, NavStatusEnum } from "@/enums";
import { useShipStatus } from "@/hooks";
import { useRefuel } from "@/hooks/mutations/useRefuel";
import { FeedbackType } from "@/models";
import { MyShipModel } from "@/models/ship.model";

interface ShipRefuelProps {
  ship: MyShipModel;
  disabled: boolean;
  onRefuel: ({ message, type }: FeedbackType) => void;
}

export const ShipRefuel = ({ ship, disabled, onRefuel }: ShipRefuelProps) => {
  const { mutate: mutateShipStatus } = useShipStatus({ updateShip: onRefuel });
  const { mutate } = useRefuel({ onRefuel });

  const handleRefuelShip = async ({
    miningShipSymbol,
    status,
  }: {
    miningShipSymbol: string;
    status: NavStatusEnum;
  }) => {
    if (status !== NavStatusEnum.DOCKED) {
      mutateShipStatus({
        miningShipSymbol,
        status: NavActionStatusEnum.DOCKED,
      });
    }

    mutate({ miningShipSymbol });
  };

  return (
    <Tooltip title="Refuel">
      <span>
        <IconButton
          disabled={disabled}
          onClick={() =>
            handleRefuelShip({
              miningShipSymbol: ship.symbol,
              status: ship.nav.status,
            })
          }
        >
          <LocalGasStationIcon />
        </IconButton>
      </span>
    </Tooltip>
  );
};
