import React from "react";
import { ShipModel } from "@/models";
import { formatCredits } from "@/utils";
import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface BuyShipTableRowProps {
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
  ship,
  length,
  waypoint,
  handlePurchase,
}: BuyShipTableRowProps) => {
  const { agent } = useSelector((state: RootState) => state.ui);
  const canPurchase = (agent?.credits ?? 0) >= ship.purchasePrice;

  return (
    <TableRow>
      {length && <TableCell rowSpan={length}>{waypoint}</TableCell>}
      <TableCell>{ship.name}</TableCell>
      <TableCell>{ship.description}</TableCell>
      <TableCell>{formatCredits(ship.purchasePrice)}</TableCell>
      <TableCell>
        <Tooltip title={canPurchase ? "Purchase" : "No funds"}>
          <span>
            <IconButton
              disabled={!canPurchase}
              onClick={() => handlePurchase({ waypoint, shipType: ship.type })}
            >
              <AddShoppingCartIcon />
            </IconButton>
          </span>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
