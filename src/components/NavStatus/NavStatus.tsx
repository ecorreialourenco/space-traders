import { IconButton, Tooltip } from "@mui/material";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import React, { ReactNode } from "react";

import { NavActionStatusEnum } from "@/enums";
import { useShipStatus } from "@/hooks";
import { MyShipsResponse } from "@/models/ship.model";

export const NavStatus = ({
  title,
  status,
  miningShipSymbol,
  children,
  refetch,
  onClick,
}: {
  title: string;
  status: NavActionStatusEnum;
  miningShipSymbol: string;
  children: ReactNode;
  refetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<MyShipsResponse, Error>>;
  onClick?: () => void;
}) => {
  const updateShip = () => {
    refetch?.();
  };

  const { mutate } = useShipStatus({ updateShip });

  const handleChangeShipStatus = async ({
    miningShipSymbol,
    status,
  }: {
    miningShipSymbol: string;
    status: NavActionStatusEnum;
  }) => {
    mutate({ miningShipSymbol, status });
  };

  return (
    <Tooltip title={title}>
      <span>
        <IconButton
          onClick={() => {
            handleChangeShipStatus({ miningShipSymbol, status });
            onClick?.();
          }}
        >
          {children}
        </IconButton>
      </span>
    </Tooltip>
  );
};
