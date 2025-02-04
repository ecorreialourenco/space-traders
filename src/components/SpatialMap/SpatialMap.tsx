import { PointsModel } from "@/models";
import Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Circle, Text, Tag, Label } from "react-konva";

interface SpatialMapProps {
  center: PointsModel;
  points: PointsModel[];
}

const SpatialMap = ({ points, center }: SpatialMapProps) => {
  const stageRef = useRef<Konva.Stage | null>(null);
  const [offset, setOffset] = useState({ x: center.x, y: center.y });
  const [scale, setScale] = useState(3);
  const [selectedPoint, setSelectedPoint] = useState<PointsModel | null>(null);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const handleDragMove = (e: any) => {
    const stage = e.target.getStage();
    if (stage) {
      const newOffsetX = offset.x + e.evt.offsetX - e.target.x;
      const newOffsetY = offset.y + e.evt.offsetY - e.target.y;
      if (!isNaN(newOffsetX) && !isNaN(newOffsetY)) {
        setOffset({ x: newOffsetX, y: newOffsetY });
      }
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

    centerOnPoint({ x: center.x, y: center.y });
  }, [center, scale]);

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
        onDragMove={handleDragMove}
      >
        {points
          .filter((point) => point.type !== "MOON")
          .map((point, idx) => (
            <Circle
              key={idx}
              x={point.x}
              y={point.y}
              radius={point.size}
              fill={point.color}
              onClick={() => setSelectedPoint(point)}
            />
          ))}

        {selectedPoint && (
          <Label x={selectedPoint.x + 10} y={selectedPoint.y - 10}>
            <Tag
              fill="black"
              pointerWidth={10}
              pointerHeight={10}
              lineJoin="round"
              shadowColor="black"
              shadowBlur={10}
              shadowOffsetX={10}
              shadowOffsetY={10}
              shadowOpacity={0.5}
            />
            <Text
              text={`${selectedPoint.type}, coord: ${selectedPoint.x}, ${selectedPoint.y}`}
              fontFamily="Calibri"
              fontSize={18}
              padding={5}
              fill="white"
            />
          </Label>
        )}
      </Layer>
    </Stage>
  );
};

export default SpatialMap;
