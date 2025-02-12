import React, { useState } from "react";
import { Label, Layer } from "react-konva";
import { Html } from "react-konva-utils";
import { IconButton } from "@mui/material";
import ExpandIcon from "@mui/icons-material/ExpandMore";
import ColapseIcon from "@mui/icons-material/ExpandLess";

import { TypeColorEnum, TypeEnum } from "@/enums";

import styles from "./Legend.module.css";

export const Legend = () => {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <Layer>
      <Label offsetY={-20} scaleX={0.7} scaleY={0.7}>
        <Html>
          <div className={styles.legendContainer}>
            {expanded ? "Hide legend" : "Show legend"}
            <IconButton
              className={styles.closeButton}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <ColapseIcon /> : <ExpandIcon />}
            </IconButton>
            {expanded &&
              (Object.keys(TypeEnum) as Array<keyof typeof TypeEnum>).map(
                (item) => (
                  <p key={item} className={styles.legendText}>
                    <span className="inline-flex">
                      <span
                        className={styles.circle}
                        style={{ backgroundColor: TypeColorEnum[item] }}
                      />

                      {item.replaceAll("_", " ")}
                    </span>
                  </p>
                )
              )}
          </div>
        </Html>
      </Label>
    </Layer>
  );
};
