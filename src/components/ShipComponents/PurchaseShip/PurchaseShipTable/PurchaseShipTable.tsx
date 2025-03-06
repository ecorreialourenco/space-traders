import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import cn from "classnames";
import React, { Suspense, useState } from "react";

import { Feedback, Loading, TableHeaderCell } from "@/components";
import { useShipyardFinder } from "@/hooks";
import { usePurchaseShip } from "@/hooks/mutations/usePurchaseShip";
import { FeedbackType } from "@/models";

import styles from "./PurchaseShipTable.module.css";
import { PurchaseShipTableRow } from "./PurchaseShipTableRow";

interface PurchaseShipTableProps {
  short?: boolean;
  updateList: ({ message, type }: FeedbackType) => void;
}

export const PurchaseShipTable = ({
  short,
  updateList,
}: PurchaseShipTableProps) => {
  const [error, setError] = useState<string>("");
  const { data: shipyardData } = useShipyardFinder();

  const { mutate } = usePurchaseShip({ updateList });

  if (!shipyardData?.data) {
    return null;
  }

  const handlePurchase = async ({
    waypoint,
    shipType,
  }: {
    waypoint: string;
    shipType: string;
  }) => mutate({ waypoint, shipType });

  return (
    <Suspense fallback={<Loading />}>
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
            {shipyardData?.data.map((shipyard) => (
              <PurchaseShipTableRow
                key={shipyard.symbol}
                short={short}
                asteroidWaypointSymbol={shipyard.symbol}
                handlePurchase={handlePurchase}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Suspense>
  );
};
