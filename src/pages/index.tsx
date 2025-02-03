import { Layout, ThreeDScene } from "@/components";
import { PointsModel, WaypointModel } from "@/models";
import { getAgent, getWaypoints } from "@/utils";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [center, setCenter] = useState<PointsModel>({
    x: 0,
    y: 0,
    z: 0,
    type: "",
  });
  const [points, setPoints] = useState<PointsModel[]>([]);
  const { data } = useSession();

  const getColor = ({ type }: { type: string }) => {
    switch (type) {
      case "FUEL_STATION":
        return 0x808080;
      case "ASTEROID":
        return 0xff0000;
      case "PLANET":
        return 0x808f85;
      case "ORBITAL_STATION":
        return 0x669bbc;
      case "JUMP_GATE":
        return 0xbbd8b3;
      case "MOON":
        return 0xffffff;
      case "ASTEROID_BASE":
        return 0xe76f51;
      case "ENGINEERED_ASTEROID":
        return 0x808080;
      case "GAS_GIANT":
        return 0xa29f15;
    }
  };
  const getSize = ({ type }: { type: string }) => {
    switch (type) {
      case "FUEL_STATION":
        return 0.1;
      case "ASTEROID":
        return 0.1;
      case "PLANET":
        return 0.4;
      case "ORBITAL_STATION":
        return 0.2;
      case "JUMP_GATE":
        return 0.5;
      case "MOON":
        return 0.2;
      case "ASTEROID_BASE":
        return 1;
      case "ENGINEERED_ASTEROID":
        return 0.2;
      case "GAS_GIANT":
        return 0.3;
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
              z: 0,
              type: point.type,
            });
          }

          newPoints.push({
            x: point.x,
            y: point.y,
            z: 0,
            type: point.type,
            color: getColor({ type: point.type }),
            size: getSize({ type: point.type }),
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
        <ThreeDScene points={points} center={center} />
      </div>
    </Layout>
  );
}
