import React, { useEffect, useState } from "react";

import { MyShipModel } from "@/models/ship.model";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { NavStatusEnum } from "@/enums";
import RadarIcon from "@mui/icons-material/Radar";

interface SurveyingTooltipProps {
  ship: MyShipModel;
  expirationDate?: string;
  onSubmit: () => void;
}

export const SurveyingTooltip = ({
  ship,
  expirationDate,
  onSubmit,
}: SurveyingTooltipProps) => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [targetDate, setTargetDate] = useState<Date>(new Date());

  useEffect(() => {
    if (expirationDate && new Date(expirationDate) > targetDate) {
      setTargetDate(new Date(expirationDate));
    }
  }, [expirationDate, targetDate]);

  useEffect(() => {
    const arrivalDate = new Date(ship.nav.route.arrival);
    if (
      ship.nav.status === NavStatusEnum.IN_TRANSIT &&
      arrivalDate !== targetDate
    ) {
      setTargetDate(new Date(ship.nav.route.arrival));
    }
  }, [ship.nav.route.arrival, ship.nav.status, targetDate]);

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
    <Tooltip title="Surveying">
      <span>
        <Badge badgeContent={secondsLeft} color="primary">
          <IconButton disabled={secondsLeft > 0} onClick={onSubmit}>
            <RadarIcon />
          </IconButton>
        </Badge>
      </span>
    </Tooltip>
  );
};
