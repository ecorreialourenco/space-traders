import React, { useEffect, useState } from "react";
import { calculateSecondsLeft } from "@/utils";

interface ArriveCounterPros {
  expirationDate: Date;
}

export const ArriveCounter = ({ expirationDate }: ArriveCounterPros) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(calculateSecondsLeft(expirationDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [expirationDate]);

  return (
    <div className="flex w-full justify-center text-red-500 text-xs">
      Time to land: {new Date(secondsLeft * 1000).toISOString().slice(11, 19)}
    </div>
  );
};
