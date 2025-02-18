import React from "react";
import { MyShipModel, MyShipsResponse } from "@/models/ship.model";
import { handleShipStatus, refuelShip } from "@/utils";
import { IconButton, Tooltip } from "@mui/material";
import { NavActionStatusEnum, NavStatusEnum } from "@/enums";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

export const ShipRefuel = ({
  token,
  ship,
  refetch,
}: {
  token: string;
  ship: MyShipModel;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<MyShipsResponse, Error>>;
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

      if (response) {
        refetch();
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
