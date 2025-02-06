import { Feedback } from "@/components";
import { ShipyardShopModel } from "@/models";
import { purchaseShip } from "@/utils";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";

import styles from "./BuyShipTable.module.css";
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
              <TableCell className={styles.headerCell}>Waypoint</TableCell>
              <TableCell className={styles.headerCell}>Name</TableCell>
              <TableCell className={styles.headerCell}>Description</TableCell>
              <TableCell className={styles.headerCell}>Price</TableCell>
              <TableCell className={styles.headerCell}>Action</TableCell>
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
