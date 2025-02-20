import React, { useEffect, useState } from "react";

import { Badge, IconButton, Tooltip } from "@mui/material";
import { useExtraction } from "@/hooks";
import { MyShipModel, MyShipsResponse, SurveysModel } from "@/models";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import HardwareIcon from "@mui/icons-material/Hardware";

interface MiningProps {
  ship: MyShipModel;
  survey?: SurveysModel;
  updateCargo: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<MyShipsResponse, Error>>;
}

export const Extract = ({ ship, survey, updateCargo }: MiningProps) => {
  const { data, refetch } = useExtraction({ shipId: ship.symbol, survey });
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [targetDate, setTargetDate] = useState<Date>(new Date());

  const handleExtract = async () => {
    refetch();
  };

  useEffect(() => {
    const expirationDate =
      data?.data?.cooldown?.expiration ??
      data?.error?.data.cooldown?.expiration;
    if (expirationDate && new Date(expirationDate) > targetDate) {
      setTargetDate(new Date(expirationDate));
    }

    if (data?.data) {
      updateCargo();
    }
  }, [data, targetDate, updateCargo]);

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
          <IconButton disabled={secondsLeft > 0} onClick={handleExtract}>
            <HardwareIcon />
          </IconButton>
        </Badge>
      </span>
    </Tooltip>
  );
};
