import React, { useEffect, useState } from "react";
import { calculateSecondsLeft } from "@/utils";
import { Badge } from "@mui/material";

interface PlanetPros {
  expirationDate: Date;
}

export const ShipMovingCounter = ({ expirationDate }: PlanetPros) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(calculateSecondsLeft(expirationDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [expirationDate]);

  return (
    <div className="flex w-full justify-center">
      <Badge
        badgeContent={secondsLeft}
        color="primary"
        style={{ opacity: 0.5 }}
      />
    </div>
  );
};
