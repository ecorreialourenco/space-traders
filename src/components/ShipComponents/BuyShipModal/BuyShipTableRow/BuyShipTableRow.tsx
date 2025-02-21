import React from "react";
import { ShipModel } from "@/models";
import { formatCredits } from "@/utils";
import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import cn from "classnames";

import styles from "./BuyShipTableRow.module.css";

interface BuyShipTableRowProps {
  short?: boolean;
  ship: ShipModel;
  waypoint: string;
  length?: number;
  handlePurchase: ({
    waypoint,
    shipType,
  }: {
    waypoint: string;
    shipType: string;
  }) => void;
}

export const BuyShipTableRow = ({
  short,
  ship,
  length,
  waypoint,
  handlePurchase,
}: BuyShipTableRowProps) => {
  const { agent } = useSelector((state: RootState) => state.ui);
  const canPurchase = (agent?.credits ?? 0) >= ship?.purchasePrice;

  return (
    <TableRow>
      {length && !short && <TableCell rowSpan={length}>{waypoint}</TableCell>}
      <TableCell className={cn({ [styles.shortCell]: short })}>
        {ship.name}
      </TableCell>
      {!short && <TableCell>{ship.description}</TableCell>}
      <TableCell className={cn({ [styles.shortCell]: short })}>{formatCredits(ship.purchasePrice)}</TableCell>
      <TableCell className={cn({ [styles.shortCell]: short })}>
        <Tooltip title={canPurchase ? "Purchase" : "No funds"}>
          <span>
            <IconButton
              disabled={!canPurchase}
              onClick={() => handlePurchase({ waypoint, shipType: ship.type })}
            >
              <AddShoppingCartIcon className={cn({ [styles.shortIcon]: short })} />
            </IconButton>
          </span>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
