import React from "react";
import { useSelector } from "react-redux";

import { Navigation } from "@/components/ShipComponents/ShipTable/components/Navigation";
import { DeliverModel, LocalModel } from "@/models";
import { RootState } from "@/store/store";

interface DeliveryWaypointProps {
  deliver: DeliverModel;
}

export const DeliveryWaypoint = ({ deliver }: DeliveryWaypointProps) => {
  const { waypoints } = useSelector((state: RootState) => state.map);
  const { system } = useSelector((state: RootState) => state.ui);

  const selectedWaypoint = waypoints.find(
    (waypoint) => waypoint.symbol === deliver.destinationSymbol
  );

  if (!selectedWaypoint) {
    return null;
  }

  const route: LocalModel = {
    systemSymbol: system,
    symbol: selectedWaypoint.symbol,
    type: selectedWaypoint.type,
    x: selectedWaypoint.x,
    y: selectedWaypoint.y,
  };

  return <Navigation key={route.symbol} route={route} />;
};
