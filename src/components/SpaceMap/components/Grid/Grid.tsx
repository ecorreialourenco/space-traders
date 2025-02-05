import { PointsModel } from "@/models";
import React from "react";
import { Circle } from "react-konva";

export const Grid = ({ points }: { points: PointsModel[] }) => {
  const maxX = Math.max(...points.map((point) => Math.abs(point.x)));
  const maxY = Math.max(...points.map((point) => Math.abs(point.y)));
  const max = Math.max(maxX, maxY);
  const circles = [];
  const gridSize = 20;

  for (let radius = gridSize; radius <= max; radius += gridSize) {
    circles.push(
      <Circle key={radius} radius={radius} stroke="#ccc" strokeWidth={0.04} />
    );
  }

  return circles;
};
