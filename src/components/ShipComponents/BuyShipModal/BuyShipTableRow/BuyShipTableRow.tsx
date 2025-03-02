import React from "react";
import { ShipModel } from "@/models";
import { formatCredits } from "@/utils";
import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import cn from "classnames";

import styles from "./BuyShipTableRow.module.css";
import { useAgent } from "@/hooks";
import { setAgent } from "@/store/slices/uiSlice";

interface Purchase {
  waypoint: string;
  shipType: string;
}

interface BuyShipTableRowProps {
  short?: boolean;
  ship: ShipModel;
  waypoint: string;
  length?: number;
  handlePurchase: ({ waypoint, shipType }: Purchase) => void;
}

export const BuyShipTableRow = ({
  short,
  ship,
  length,
  waypoint,
  handlePurchase,
}: BuyShipTableRowProps) => {
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
