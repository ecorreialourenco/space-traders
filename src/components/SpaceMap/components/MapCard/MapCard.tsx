import React, { useEffect, useState } from "react";
import { Label } from "react-konva";
import { Html } from "react-konva-utils";
import { useSession } from "next-auth/react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

import { RootState } from "@/store/store";
import { PointsModel, TraitModel } from "@/models";
import { getWaypoint } from "@/utils";

import styles from "./MapCard.module.css";

interface MapCardProps {
  selectedPoint: PointsModel;
  onClose: () => void;
}

export const MapCard = ({ selectedPoint, onClose }: MapCardProps) => {
  const { data } = useSession();
  const { system } = useSelector((state: RootState) => state.ui);
  const [traits, setTraits] = useState<TraitModel[]>([]);
  const token = data?.token ?? "";

  useEffect(() => {
    const handleWaypoint = async () => {
      const { data: waypointData } = await getWaypoint({
        token,
        system,
        planet: selectedPoint.symbol,
      });

      if (waypointData) {
        setTraits(waypointData.traits);
      }
    };

    if (token) {
      handleWaypoint();
    }
  }, [token, selectedPoint.symbol, system]);

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
                Coords: {Math.ceil(selectedPoint.x)},{" "}
                {Math.ceil(selectedPoint.y)}
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
