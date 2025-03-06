import PublicIcon from "@mui/icons-material/Public";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";

import { MyShipModel, MyShipsResponse } from "@/models";
import { calculateSecondsLeft } from "@/utils";

import { ArriveCounter } from "./ArriveCounter";
import styles from "./ShipNavigationAnimation.module.css";

interface ShipNavigationAnimationProps {
  ship: MyShipModel;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<MyShipsResponse, Error>>;
}

export const ShipNavigationAnimation = ({ ship, refetch }: ShipNavigationAnimationProps) => {
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
      <div className="h-4 mt-1">
        <PublicIcon className={styles.planet} />
        <RocketLaunchIcon
          style={{ animationDuration: `${secondsLeft}s` }}
          className={styles.navShip}
        />
        <PublicIcon className={styles.planet} style={{ right: 0 }} />
      </div>
      <div className="block">
        <ArriveCounter expirationDate={expirationDate} />
      </div>
    </div>
  );
};
