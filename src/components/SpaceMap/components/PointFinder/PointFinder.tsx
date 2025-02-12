import { setCenter } from "@/store/slices/mapSlice";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Label, Layer } from "react-konva";
import { Html } from "react-konva-utils";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Input } from "@/components/Form";
import { RootState } from "@/store/store";
import { IconButton, Tooltip } from "@mui/material";
import { PointsModel } from "@/models";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import styles from "./PointFinder.module.css";

enum SearchMode {
  Waypoint,
  Coordinates,
}

interface PointFinderProps {
  width: number;
}

export const PointFinder = ({ width }: PointFinderProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { center, waypoints } = useSelector((state: RootState) => state.map);
  const [valueX, setValueX] = useState<string>("");
  const [valueY, setValueY] = useState<string>("");
  const [selectedWaypoint, setSelectedWaypoint] = useState<PointsModel>(
    waypoints[0]
  );
  const [searchMode, setSearchMode] = useState<SearchMode>(
    SearchMode.Coordinates
  );
  const dispatch = useDispatch();

  const navOptions = waypoints.map((item) => ({
    name: item.symbol,
    value: item.symbol,
  }));

  const handleSelect = (symbol: string) => {
    const selected = waypoints.find((waypoint) => waypoint.symbol === symbol);
    if (selected) {
      setSelectedWaypoint(selected);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchMode === SearchMode.Waypoint) {
      dispatch(setCenter({ x: selectedWaypoint.x, y: selectedWaypoint.y }));
    } else {
      dispatch(setCenter({ x: parseInt(valueX), y: parseInt(valueY) }));
    }
  };

  useEffect(() => {
    if (!selectedWaypoint) {
      setSelectedWaypoint(waypoints[0]);
    }
  }, [selectedWaypoint, waypoints]);

  useEffect(() => {
    setValueX(center.x.toString());
    setValueY(center.y.toString());
  }, [center]);

  return (
    <Layer offsetX={-width / 2 + 100} offsetY={-20}>
      <Label scaleX={0.7} scaleY={0.7}>
        <Html>
          <div className={styles.wrapper}>
            <form
              ref={formRef}
              style={{ width: 300, display: "flex" }}
              onSubmit={handleSubmit}
            >
              {selectedWaypoint?.symbol &&
              searchMode === SearchMode.Waypoint ? (
                <div className="w-full">
                  <Dropdown
                    label="Waypoint"
                    value={selectedWaypoint.symbol}
                    options={navOptions}
                    onChange={(op) => handleSelect(op.target.value)}
                  />
                </div>
              ) : (
                <>
                  <Input
                    label="X"
                    value={valueX}
                    onChange={(e) => setValueX(e.target.value)}
                  />
                  <Input
                    label="Y"
                    value={valueY}
                    onChange={(e) => setValueY(e.target.value)}
                  />
                </>
              )}

              <Button label="Go to" type="submit" />
            </form>
            <Tooltip
              title={
                searchMode === SearchMode.Waypoint
                  ? "Search by coordinates"
                  : "Search by waypoint"
              }
            >
              <IconButton
                onClick={() =>
                  setSearchMode(
                    searchMode === SearchMode.Waypoint
                      ? SearchMode.Coordinates
                      : SearchMode.Waypoint
                  )
                }
                edge="end"
              >
                <KeyboardArrowDownIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Html>
      </Label>
    </Layer>
  );
};
