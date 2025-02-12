import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { Label, Layer } from "react-konva";
import { Html } from "react-konva-utils";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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
            <Tooltip placement="left" title="Zoom in">
              <span>
                <IconButton onClick={() => changeZoom(zoom + 1)} edge="end">
                  <AddIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip placement="left" title="Zoom out">
              <span>
                <IconButton
                  onClick={() => changeZoom(zoom - 1)}
                  edge="end"
                  disabled={zoom === 1}
                >
                  <RemoveIcon />
                </IconButton>
              </span>
            </Tooltip>
          </div>
        </Html>
      </Label>
    </Layer>
  );
};
