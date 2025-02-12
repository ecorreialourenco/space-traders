import { PointsModel } from "@/models";
import Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Circle, Text } from "react-konva";
import {
  Grid,
  Legend,
  MapCard,
  Orbitals,
  PointFinder,
  ZoomButton,
} from "./components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { TypeEnum } from "@/enums";
import { handleText } from "@/utils";
import { setSelectedPoint } from "@/store/slices/mapSlice";

export const SpaceMap = () => {
  const dispatch = useDispatch();
  const { center, selectedPoint, waypoints } = useSelector(
    (state: RootState) => state.map
  );
  const stageRef = useRef<Konva.Stage | null>(null);
  const [scale, setScale] = useState<number>(3);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const handleSelect = (point: PointsModel | null) => {
    dispatch(setSelectedPoint(point));
  };

  const handleClick = () => {
    if (selectedPoint) {
      handleSelect(null);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const centerOnPoint = () => {
      const stage = stageRef.current;
      if (!stage) return;

      const centerX = stage.width() / 2;
      const centerY = stage.height() / 2;

      const newOffsetX = -centerX / scale + center.x;
      const newOffsetY = -centerY / scale + center.y;

      setOffset({ x: newOffsetX, y: newOffsetY });
    };

    centerOnPoint();
  }, [stageRef, center, scale]);

  return (
    <Stage ref={stageRef} width={size.width} height={size.height - 104}>
      <PointFinder width={size.width} />
      <ZoomButton width={size.width} zoom={scale} changeZoom={setScale} />
      <Layer
        offsetX={offset.x}
        offsetY={offset.y}
        scaleX={scale}
        scaleY={scale}
        draggable
        onClick={handleClick}
      >
        <Grid points={waypoints} />
        <Circle x={0} y={0} radius={5} fill="yellow" />

        {waypoints
          .filter(
            (point) =>
              point.type !== TypeEnum.MOON &&
              point.type !== TypeEnum.ORBITAL_STATION
          )
          .map((point) => (
            <React.Fragment key={`${point.type}-${point.x}-${point.y}`}>
              <Circle
                x={point.x}
                y={point.y}
                radius={point.size}
                fill={point.color}
                onClick={() => handleSelect(point)}
              />
              <Orbitals
                point={point}
                points={waypoints}
                setSelectedPoint={handleSelect}
              />
              <Text
                x={point.x + 5}
                y={point.y + 5}
                text={handleText(point.symbol)}
                scaleX={0.2}
                scaleY={0.2}
                fill={point.color}
              />
            </React.Fragment>
          ))}

        {selectedPoint && (
          <MapCard
            selectedPoint={selectedPoint}
            onClose={() => dispatch(setSelectedPoint(null))}
          />
        )}
      </Layer>
      <Legend />
    </Stage>
  );
};
