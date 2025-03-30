import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useWaypoint } from "@/hooks";
import { PointsModel, TraitModel } from "@/models";

import styles from "./MapCard.module.css";
import { MapTraitCard } from "./MapTraitCard";

interface MapCardProps {
  selectedPoint: PointsModel;
  onClose: () => void;
}

export const MapCard = ({ selectedPoint, onClose }: MapCardProps) => {
  const [traits, setTraits] = useState<TraitModel[]>([]);
  const { data: waypointData } = useWaypoint({
    planet: selectedPoint.symbol,
  });

  useEffect(() => {
    if (waypointData) {
      setTraits(waypointData.traits);
    }
  }, [waypointData]);

  return (
    <div className={styles.mapCardWrapper}>
      <div className="w-full inline-flex justify-between">
        <div className="mb-2">
          <div className={styles.symbol}>
            {selectedPoint.symbol} ({selectedPoint.type})
          </div>
          <div className={styles.coords}>
            Coords: {Math.ceil(selectedPoint.x)}, {Math.ceil(selectedPoint.y)}
          </div>
        </div>
        <IconButton className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={styles.traits}>
        <MapTraitCard traits={traits} selectedSymbol={selectedPoint.symbol} />
      </div>
    </div>
  );
};
