import { ShipModel } from "@/models";
import { Button, TableCell, TableRow } from "@mui/material";
import React from "react";

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
}: BuyShipTableRowProps) => (
  <TableRow>
    {length && <TableCell rowSpan={length}>{waypoint}</TableCell>}
    <TableCell>{ship.name}</TableCell>
    <TableCell>{ship.description}</TableCell>
    <TableCell>{ship.purchasePrice}</TableCell>
    <TableCell>
      <Button onClick={() => handlePurchase({ waypoint, shipType: ship.type })}>
        Purchase
      </Button>
    </TableCell>
  </TableRow>
);
