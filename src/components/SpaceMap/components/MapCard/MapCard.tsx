import React, { useEffect, useState } from "react";
import { Label } from "react-konva";
import { Html } from "react-konva-utils";
import { useSession } from "next-auth/react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { PointsModel, TraitModel } from "@/models";
import { getWaypoint } from "@/utils";

import styles from "./MapCard.module.css";

interface MapCardProps {
  selectedPoint: PointsModel;
  onClose: () => void;
}

export const MapCard = ({ selectedPoint, onClose }: MapCardProps) => {
  const { data } = useSession();
  const [traits, setTraits] = useState<TraitModel[]>([]);

  useEffect(() => {
    const handleWaypoint = async (token: string) => {
      const { data: waypointData } = await getWaypoint({
        token,
        planet: selectedPoint.symbol,
      });

      if (waypointData) {
        setTraits(waypointData.traits);
      }
    };

    if (data?.token) {
      handleWaypoint(data.token);
    }
  }, [data?.token, selectedPoint.symbol]);

  return (
    <Label
      x={selectedPoint.x + 10}
      y={selectedPoint.y - 10}
      scaleX={0.7}
      scaleY={0.7}
    >
      <Html>
        <div className={styles.mapCardWrapper}>
          <div className="inline-flex">
            <div>
              <div className={styles.symbol}>{selectedPoint.symbol}</div>
              <div className={styles.coords}>
                Coords: {selectedPoint.x}, {selectedPoint.y}
              </div>
            </div>
            <IconButton className={styles.closeButton} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className={styles.traitsGroup}>
            {traits.map((trait) => (
              <div key={trait.symbol} className={styles.traits}>
                {trait.name}
              </div>
            ))}
          </div>
        </div>
      </Html>
    </Label>
  );
};
