import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";

import { NavActionStatusEnum, NavStatusEnum } from "@/enums";
import { FeedbackType } from "@/models";
import { MyShipModel } from "@/models/ship.model";
import { handleShipStatus, refuelShip } from "@/utils";

export const ShipRefuel = ({
  token,
  ship,
  onRefuel,
}: {
  token: string;
  ship: MyShipModel;
  onRefuel: ({ message, type }: FeedbackType) => void;
}) => {
  const handleRefuelShip = async ({
    miningShipSymbol,
    status,
  }: {
    miningShipSymbol: string;
    status: NavStatusEnum;
  }) => {
    if (status !== NavStatusEnum.DOCKED) {
      const dockResponse = await handleShipStatus({
        token,
        miningShipSymbol,
        status: NavActionStatusEnum.DOCKED,
      });

      if (dockResponse.data?.nav) {
        handleRefuelShip({
          miningShipSymbol,
          status: dockResponse.data.nav.status,
        });
      }
    } else {
      const response = await refuelShip({ token, miningShipSymbol });

      if (response.error) {
        onRefuel({ message: response.error.message, type: "error" });
      } else if (response) {
        onRefuel({ message: "Ship refueled", type: "success" });
      }
    }
  };

  return (
    <Tooltip title="Refuel">
      <span>
        <IconButton
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
