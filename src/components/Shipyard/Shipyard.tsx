import React, { Suspense } from "react";

import { useShipyard } from "@/hooks";

import { Loading } from "../Loading";
import { PurchaseShipTable } from "../ShipComponents/PurchaseShip";

interface ShipyardProps {
  asteroidWaypointSymbol: string;
}

export const Shipyard = ({ asteroidWaypointSymbol }: ShipyardProps) => {
  const { data: shipyardData } = useShipyard({ asteroidWaypointSymbol });

  if (!shipyardData.data.ships) {
    shipyardData.data.ships = [];
  }

  return (
    <Suspense fallback={<Loading />}>
      <PurchaseShipTable short updateList={() => {}} />
    </Suspense>
  );
};
