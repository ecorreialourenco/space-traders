import React from "react";
import { Label, Layer } from "react-konva";
import { Html } from "react-konva-utils";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ZoomTooltipButton } from "./ZoomTooltipButton";

import styles from "./ZoomButton.module.css";

interface ZoomButtonProps {
  width: number;
  zoom: number;
  changeZoom: (value: number) => void;
}

export const ZoomButton = ({ width, zoom, changeZoom }: ZoomButtonProps) => {
  return (
    <Layer offsetX={-width + 60} offsetY={-20}>
      <Label scaleX={0.7} scaleY={0.7}>
        <Html>
          <div className={styles.wrapper}>
            <ZoomTooltipButton
              title="Zoom in"
              onClick={() => changeZoom(zoom + 1)}
            >
              <AddIcon className="fill-white" />
            </ZoomTooltipButton>
            <ZoomTooltipButton
              title="Zoom out"
              onClick={() => changeZoom(zoom - 1)}
            >
              <RemoveIcon className="fill-white" />
            </ZoomTooltipButton>
          </div>
        </Html>
      </Label>
    </Layer>
  );
};
