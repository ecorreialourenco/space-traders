import React, { useEffect, useMemo, useState } from "react";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PublicIcon from "@mui/icons-material/Public";
import styles from "./ShipMoving.module.css";
import { MyShipModel, MyShipsResponse } from "@/models";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { calculateSecondsLeft } from "@/utils";
import { ShipMovingCounter } from "./ShipMovingCounter";

interface ShipMovingProps {
  ship: MyShipModel;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<MyShipsResponse, Error>>;
}

export const ShipMoving = ({ ship, refetch }: ShipMovingProps) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const expirationDate = useMemo(
    () => new Date(ship.nav.route.arrival),
    [ship.nav.route.arrival]
  );

  useEffect(() => {
    const nowDate = new Date();
    if (expirationDate && expirationDate > nowDate) {
      setSecondsLeft(calculateSecondsLeft(expirationDate));
    }
  }, [expirationDate, ship]);

  useEffect(() => {
    const interval = setTimeout(() => {
      refetch();
    }, (secondsLeft - 1) * 1000);

    return () => clearInterval(interval);
  }, [refetch, secondsLeft]);

  return (
    <div style={{ position: "relative" }}>
      <PublicIcon className={styles.planet} />
      <RocketLaunchIcon
        style={{ animationDuration: `${secondsLeft}s` }}
        className={styles.navShip}
      />
      <ShipMovingCounter expirationDate={expirationDate} />
      <PublicIcon className={styles.planet} style={{ right: 0 }} />
    </div>
  );
};
