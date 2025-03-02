import React, { ReactNode } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { NavActionStatusEnum } from "@/enums";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { MyShipsResponse } from "@/models/ship.model";
import { useShipStatus } from "@/hooks";

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
