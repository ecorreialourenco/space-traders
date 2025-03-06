import HardwareIcon from "@mui/icons-material/Hardware";
import { Badge, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";

import { MyShipModel } from "@/models";

interface MiningProps {
  ship: MyShipModel;
  onClick: () => void;
}

export const ExtractCountdown = ({ ship, onClick }: MiningProps) => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [targetDate, setTargetDate] = useState<Date>(new Date());

  useEffect(() => {
    const expirationDate = ship.cooldown.expiration;
    if (expirationDate && new Date(expirationDate) > targetDate) {
      setTargetDate(new Date(expirationDate));
    }
  }, [ship.cooldown.expiration, targetDate]);

  useEffect(() => {
    const calculateSecondsLeft = () => {
      const targetTime = new Date(targetDate).getTime();
      const currentTime = new Date().getTime();
      const difference = targetTime - currentTime;
      return Math.max(0, Math.floor(difference / 1000));
    };

    const interval = setInterval(() => {
      setSecondsLeft(calculateSecondsLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <Tooltip title="Extract">
      <span>
        <Badge badgeContent={secondsLeft} color="primary">
          <IconButton disabled={secondsLeft > 0} onClick={() => onClick()}>
            <HardwareIcon />
          </IconButton>
        </Badge>
      </span>
    </Tooltip>
  );
};
