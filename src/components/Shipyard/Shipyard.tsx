import { useShipyard } from "@/hooks";
import React, { Suspense } from "react";
import { BuyShipTable } from "../ShipComponents/BuyShipModal/BuyShipTable";
import { useSession } from "next-auth/react";
import { Loading } from "../Loading";

interface ShipyardProps {
  asteroidWaypointSymbol: string;
}

export const Shipyard = ({ asteroidWaypointSymbol }: ShipyardProps) => {
  const { data: shipyardData } = useShipyard({ asteroidWaypointSymbol });
  const { data } = useSession();
  const token = data?.token ?? "";

  if (!shipyardData.data.ships) {
    shipyardData.data.ships = [];
  }

  return (
    <Suspense fallback={<Loading />}>
      <BuyShipTable
        short
        token={token}
        waypoints={[shipyardData.data]}
        updateList={() => {}}
      />
    </Suspense>
  );
};
