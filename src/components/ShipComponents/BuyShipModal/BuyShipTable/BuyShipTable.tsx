import { Feedback, TableHeaderCell } from "@/components";
import { ShipyardShopModel } from "@/models";
import { purchaseShip } from "@/utils";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { BuyShipTableRow } from "../BuyShipTableRow";

interface BuyShipTableProps {
  token: string;
  waypoints: ShipyardShopModel[];
  updateList: () => void;
}

export const BuyShipTable = ({
  token,
  waypoints,
  updateList,
}: BuyShipTableProps) => {
  const [error, setError] = useState<string>("");

  const handlePurchase = async ({
    waypoint,
    shipType,
  }: {
    waypoint: string;
    shipType: string;
  }) => {
    const purchaseData = await purchaseShip({
      token,
      waypoint,
      shipType,
    });

    if (purchaseData.data) {
      updateList();
    }

    if (purchaseData.error) {
      setError(purchaseData.error.message);
    }
  };

  return (
    <>
      <Feedback
        isOpen={!!error}
        severity="error"
        message={error}
        onClose={() => setError("")}
      />
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Waypoint</TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Price</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {waypoints.map((waypoint) => (
              <React.Fragment key={waypoint.symbol}>
                <BuyShipTableRow
                  waypoint={waypoint.symbol}
                  ship={waypoint.ships[0]}
                  length={waypoint.ships.length}
                  handlePurchase={handlePurchase}
                />

                {waypoint.ships.slice(1).map((ship) => (
                  <BuyShipTableRow
                    key={ship.type}
                    waypoint={waypoint.symbol}
                    ship={ship}
                    handlePurchase={handlePurchase}
                  />
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
