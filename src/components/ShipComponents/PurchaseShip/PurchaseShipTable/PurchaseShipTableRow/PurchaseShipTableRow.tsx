import React from "react";

import { useShipyard } from "@/hooks";

import { ShipTableRow } from "../ShipTableRow";

interface PurchaseShipTableRowProps {
  asteroidWaypointSymbol: string;
  short?: boolean;
  handlePurchase: ({
    waypoint,
    shipType,
  }: {
    waypoint: string;
    shipType: string;
  }) => void;
}

export const PurchaseShipTableRow = ({
  asteroidWaypointSymbol,
  short,
  handlePurchase,
}: PurchaseShipTableRowProps) => {
  const { data: waypoints } = useShipyard({ asteroidWaypointSymbol });

  if (!waypoints.data.ships) {
    return null;
  }

  return (
    <>
      {waypoints.data.ships.length > 0 && (
        <ShipTableRow
          short={short}
          waypoint={waypoints.data.symbol}
          ship={waypoints.data.ships[0]}
          length={waypoints.data.ships.length}
          handlePurchase={handlePurchase}
        />
      )}

      {waypoints.data.ships.slice(1).map((ship) => (
        <ShipTableRow
          short={short}
          key={ship.type}
          waypoint={waypoints.data.symbol}
          ship={ship}
          handlePurchase={handlePurchase}
        />
      ))}
    </>
  );
};
