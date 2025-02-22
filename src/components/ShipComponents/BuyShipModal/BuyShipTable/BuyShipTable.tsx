import { Feedback, TableHeaderCell } from "@/components";
import { FeedbackType, ShipyardShopModel } from "@/models";
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
import cn from "classnames";

import styles from "./BuyShipTable.module.css";

interface BuyShipTableProps {
  short?: boolean;
  token: string;
  waypoints: ShipyardShopModel[];
  updateList: ({ message, type }: FeedbackType) => void;
}

export const BuyShipTable = ({
  short,
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
      updateList({
        message: `You have bougth new ship -> ${purchaseData.data.ship.symbol}`,
        type: "success",
      });
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
      <TableContainer
        component={Paper}
        className={cn({ [styles.table]: short })}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {!short && <TableHeaderCell>Waypoint</TableHeaderCell>}
              <TableHeaderCell className={cn({ [styles.shortCell]: short })}>
                Name
              </TableHeaderCell>
              {!short && <TableHeaderCell>Description</TableHeaderCell>}
              <TableHeaderCell className={cn({ [styles.shortCell]: short })}>
                Price
              </TableHeaderCell>
              <TableHeaderCell className={cn({ [styles.shortCell]: short })}>
                Action
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {waypoints.map((waypoint) => (
              <React.Fragment key={waypoint.symbol}>
                {waypoint.ships.length > 0 && (
                  <BuyShipTableRow
                    short={short}
                    waypoint={waypoint.symbol}
                    ship={waypoint.ships[0]}
                    length={waypoint.ships.length}
                    handlePurchase={handlePurchase}
                  />
                )}

                {waypoint.ships.slice(1).map((ship) => (
                  <BuyShipTableRow
                    short={short}
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
