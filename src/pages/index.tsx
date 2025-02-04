import { Layout } from "@/components";
import SpatialMap from "@/components/SpatialMap/SpatialMap";
import { PointsModel, WaypointModel } from "@/models";
import { getAgent, getWaypoints } from "@/utils";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [center, setCenter] = useState<PointsModel>({
    x: 0,
    y: 0,
    type: "",
    color: "red",
    size: 1,
    orbitals: [],
  });
  const [points, setPoints] = useState<PointsModel[]>([]);
  const { data } = useSession();

  const getColor = ({ type }: { type: string }) => {
    switch (type) {
      case "FUEL_STATION":
        return "gray";
      case "ASTEROID":
        return "red";
      case "PLANET":
        return "burlywood";
      case "ORBITAL_STATION":
        return "chocolate";
      case "JUMP_GATE":
        return "slateblue";
      case "MOON":
        return "white";
      case "ASTEROID_BASE":
        return "lemonchiffon";
      case "ENGINEERED_ASTEROID":
        return "mediumaquamarine";
      default:
        return "cornflowerblue";
    }
  };
  const getSize = ({ type }: { type: string }) => {
    switch (type) {
      case "FUEL_STATION":
        return 1;
      case "ASTEROID":
        return 1;
      case "PLANET":
        return 3;
      case "ORBITAL_STATION":
        return 2;
      case "JUMP_GATE":
        return 5;
      case "MOON":
        return 2;
      case "ASTEROID_BASE":
        return 3;
      case "ENGINEERED_ASTEROID":
        return 2;
      default:
        return 1;
    }
  };

  useEffect(() => {
    const handleAgent = async () => {
      const { data: agentData } = await getAgent({ token: data?.token ?? "" });

      if (agentData.headquarters) {
        const newPoints: PointsModel[] = [];
        const { data: headquarters } = await getWaypoints({
          token: data?.token ?? "",
          headquarters: agentData.headquarters,
        });

        headquarters.waypoints.forEach((point: WaypointModel) => {
          if (point.symbol === agentData.headquarters) {
            setCenter({
              x: point.x,
              y: point.y,
              type: point.type,
              size: 5,
              color: "red",
              orbitals: point.orbitals,
            });
          }

          newPoints.push({
            x: point.x,
            y: point.y,
            type: point.type,
            color: getColor({ type: point.type }),
            size: getSize({ type: point.type }),
            orbitals: point.orbitals,
          });
        });

        setPoints(newPoints);
      }
    };

    if (data?.token) {
      handleAgent();
    }
  }, [data?.token]);

  return (
    <Layout>
      <div className="flex flex-col h-full justify-center items-center">
        <SpatialMap points={points} center={center} />
      </div>
    </Layout>
  );
}
