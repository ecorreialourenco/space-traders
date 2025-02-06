import { PointsModel } from "@/models";
import Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Circle, Group, Text } from "react-konva";
import { Grid, Legend, MapCard, Orbitals } from "./components";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { TypeEnum } from "@/enums";
import { handleText } from "@/utils";

interface SpaceMapProps {
  points: PointsModel[];
}

export const SpaceMap = ({ points }: SpaceMapProps) => {
  const { mapCenter } = useSelector((state: RootState) => state.ui);
  const stageRef = useRef<Konva.Stage | null>(null);
  const [offset, setOffset] = useState({ x: mapCenter.x, y: mapCenter.y });
  const scale = 3;
  const [selectedPoint, setSelectedPoint] = useState<PointsModel | null>(null);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const handleClick = () => {
    if (selectedPoint) {
      setSelectedPoint(null);
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
    const centerOnPoint = ({ x, y }: { x: number; y: number }) => {
      const stage = stageRef.current;
      if (!stage) return;

      const centerX = stage.width() / 2;
      const centerY = stage.height() / 2;

      const newOffsetX = x - centerX / scale;
      const newOffsetY = y - centerY / scale;

      setOffset({ x: newOffsetX, y: newOffsetY });
    };

    centerOnPoint({ x: mapCenter.x, y: mapCenter.y });
  }, [mapCenter, scale]);

  return (
    <Stage
      ref={stageRef}
      width={size.width}
      height={size.height - 104}
      draggable
    >
      <Layer
        offsetX={offset.x}
        offsetY={offset.y}
        scaleX={scale}
        scaleY={scale}
        draggable
        onClick={handleClick}
      >
        <Grid points={points} />
        <Circle x={0} y={0} radius={5} fill="yellow" />
        {points
          .filter(
            (point) =>
              point.type !== TypeEnum.MOON &&
              point.type !== TypeEnum.ORBITAL_STATION
          )
          .map((point) => (
            <React.Fragment key={`${point.type}-${point.x}-${point.y}`}>
              <Group x={point.x} y={point.y}>
                <Circle
                  x={point.x}
                  y={point.y}
                  radius={point.size}
                  fill={point.color}
                  onClick={() => setSelectedPoint(point)}
                />
                <Orbitals
                  point={point}
                  points={points}
                  setSelectedPoint={setSelectedPoint}
                />
                <Text
                  x={point.x + 5}
                  y={point.y + 5}
                  text={handleText(point.symbol)}
                  scaleX={0.2}
                  scaleY={0.2}
                  fill={point.color}
                />
              </Group>
            </React.Fragment>
          ))}

        {selectedPoint && (
          <MapCard
            selectedPoint={selectedPoint}
            onClose={() => setSelectedPoint(null)}
          />
        )}
      </Layer>
      <Legend />
    </Stage>
  );
};
