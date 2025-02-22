import { setCenter } from "@/store/slices/mapSlice";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Label, Layer } from "react-konva";
import { Html } from "react-konva-utils";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Input } from "@/components/Form";
import { RootState } from "@/store/store";
import { Autocomplete, IconButton, TextField, Tooltip } from "@mui/material";
import { PointsModel } from "@/models";

import PlaceIcon from "@mui/icons-material/Place";
import MapIcon from "@mui/icons-material/Map";

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
    label: item.symbol,
    id: item.symbol,
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
            <Tooltip title="Search by coordinates">
              <IconButton
                onClick={() => setSearchMode(SearchMode.Coordinates)}
                edge="end"
                color={
                  searchMode === SearchMode.Coordinates ? "primary" : "default"
                }
              >
                <PlaceIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Search by waypoint">
              <IconButton
                onClick={() => setSearchMode(SearchMode.Waypoint)}
                edge="end"
                color={
                  searchMode === SearchMode.Waypoint ? "primary" : "default"
                }
              >
                <MapIcon />
              </IconButton>
            </Tooltip>
            <form
              ref={formRef}
              style={{ width: 300, display: "flex" }}
              onSubmit={handleSubmit}
            >
              {selectedWaypoint?.symbol &&
              searchMode === SearchMode.Waypoint ? (
                <div className="w-full m-2">
                  <Autocomplete
                    disablePortal
                    options={navOptions}
                    onChange={(e, value) => handleSelect(value?.id ?? "")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        label="Place"
                        value={selectedWaypoint.symbol}
                      />
                    )}
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
          </div>
        </Html>
      </Label>
    </Layer>
  );
};
