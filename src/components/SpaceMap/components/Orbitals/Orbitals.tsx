import React, { useEffect, useState } from "react";
import { Circle, Text } from "react-konva";

import { PointsModel } from "@/models";
import { handleText } from "@/utils";

interface OrbitalsProps {
  point: PointsModel;
  points: PointsModel[];
  setSelectedPoint: (point: PointsModel | null) => void;
}

export const Orbitals = ({
  point,
  points,
  setSelectedPoint,
}: OrbitalsProps) => {
  const [orbitals, setOrbitals] = useState<PointsModel[]>([]);

  useEffect(() => {
    const orbitalsPlacement = () => {
      const numOrbitals = point.orbitals.length;
      const angle = (2 * Math.PI) / numOrbitals;
      const orbitalPoints: PointsModel[] = [];

      for (let i = 0; i < numOrbitals; i++) {
        const currentOrbital = points.filter(
          (item) => item.symbol === point.orbitals[i].symbol
        );
        const radius = point.size + 2 * currentOrbital[0].size;
        const newX = point.x + radius * Math.cos(angle * i);
        const newY = point.y + radius * Math.sin(angle * i);

        orbitalPoints.push({ ...currentOrbital[0], x: newX, y: newY });
      }

      setOrbitals(orbitalPoints);
    };

    if (point.orbitals.length) {
      orbitalsPlacement();
    }
  }, [point, points]);

  return orbitals.map((orbital) => (
    <React.Fragment key={`${orbital.type}-${orbital.x}-${orbital.y}`}>
      <Circle
        x={orbital.x}
        y={orbital.y}
        radius={1}
        fill={orbital.color}
        onClick={() => setSelectedPoint(orbital)}
      />
      <Text
        x={orbital.x + 2}
        y={orbital.y - 1}
        text={handleText(orbital.symbol)}
        scaleX={0.2}
        scaleY={0.2}
        fill={orbital.color}
      />
    </React.Fragment>
  ));
};
