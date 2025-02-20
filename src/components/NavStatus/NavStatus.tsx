import React, { ReactNode } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { NavActionStatusEnum } from "@/enums";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { MyShipsResponse } from "@/models/ship.model";
import { handleShipStatus } from "@/utils";

export const NavStatus = ({
  token,
  title,
  status,
  miningShipSymbol,
  children,
  refetch,
  onClick,
}: {
  token: string;
  title: string;
  status: NavActionStatusEnum;
  miningShipSymbol: string;
  children: ReactNode;
  refetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<MyShipsResponse, Error>>;
  onClick?: () => void;
}) => {
  const handleChangeShipStatus = async ({
    miningShipSymbol,
    status,
  }: {
    miningShipSymbol: string;
    status: NavActionStatusEnum;
  }) => {
    const dockResponse = await handleShipStatus({
      token,
      miningShipSymbol,
      status,
    });

    if (dockResponse.data?.nav) {
      refetch?.();
    }
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
