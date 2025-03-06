import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import cn from "classnames";
import React from "react";
import { useDispatch } from "react-redux";

import { useAgent } from "@/hooks";
import { ShipModel } from "@/models";
import { setAgent } from "@/store/slices/uiSlice";
import { formatCredits } from "@/utils";

import styles from "./ShipTableRow.module.css";

interface Purchase {
  waypoint: string;
  shipType: string;
}

interface ShipTableRowProps {
  short?: boolean;
  ship: ShipModel;
  waypoint: string;
  length?: number;
  handlePurchase: ({ waypoint, shipType }: Purchase) => void;
}

export const ShipTableRow = ({
  short,
  ship,
  length,
  waypoint,
  handlePurchase,
}: ShipTableRowProps) => {
  const { data: agent, refetch } = useAgent();
  const dispatch = useDispatch();

  const handlePurchaseShip = ({ waypoint, shipType }: Purchase) => {
    handlePurchase({ waypoint, shipType });

    setTimeout(async () => {
      const newAgentData = await refetch();

      if (newAgentData.data) {
        dispatch(setAgent(newAgentData.data));
      }
    }, 500);
  };

  const canPurchase = (agent?.credits ?? 0) >= ship?.purchasePrice;

  return (
    <TableRow>
      {length && !short && <TableCell rowSpan={length}>{waypoint}</TableCell>}
      <TableCell className={cn({ [styles.shortCell]: short })}>
        {ship.name}
      </TableCell>
      {!short && <TableCell>{ship.description}</TableCell>}
      <TableCell className={cn({ [styles.shortCell]: short })}>
        {formatCredits(ship.purchasePrice)}
      </TableCell>
      <TableCell className={cn({ [styles.shortCell]: short })}>
        <Tooltip title={canPurchase ? "Purchase" : "No funds"}>
          <span>
            <IconButton
              disabled={!canPurchase}
              onClick={() =>
                handlePurchaseShip({ waypoint, shipType: ship.type })
              }
            >
              <AddShoppingCartIcon
                className={cn({ [styles.shortIcon]: short })}
              />
            </IconButton>
          </span>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
