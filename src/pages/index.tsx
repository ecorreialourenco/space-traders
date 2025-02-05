import { Layout, SpaceMap } from "@/components";
import { TypeColorEnum, TypeEnum } from "@/enums/Types.enum";
import { PointsModel, WaypointModel } from "@/models";
import { setMapCenter, setSystems } from "@/store/slices/uiSlice";
import { getAgent, getMapPoints } from "@/utils";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const [points, setPoints] = useState<PointsModel[]>([]);
  const dispatch = useDispatch();
  const { data } = useSession();

  const getSize = ({ type }: { type: string }) => {
    switch (type) {
      case TypeEnum.HEADQUARTER:
      case TypeEnum.JUMP_GATE:
        return 4;
      case TypeEnum.PLANET:
      case TypeEnum.ASTEROID_BASE:
        return 3;
      case TypeEnum.GAS_GIANT:
      case TypeEnum.ENGINEERED_ASTEROID:
        return 2;
      default:
        return 1;
    }
  };

  useEffect(() => {
    const handleAgent = async (token: string) => {
      const { data: agentData } = await getAgent({ token });

      if (agentData.headquarters) {
        const splitedString = agentData.headquarters.split("-");
        const systems = `${splitedString[0]}-${splitedString[1]}`;

        const newPoints: PointsModel[] = [];
        const { data: headquarters } = await getMapPoints({
          token,
          systems,
        });

        dispatch(setSystems(systems));

        headquarters.waypoints.forEach((point: WaypointModel) => {
          const isHeadquarter = point.symbol === agentData.headquarters;
          if (isHeadquarter) {
            dispatch(setMapCenter({ x: point.x, y: point.y }));
          }

          newPoints.push({
            symbol: point.symbol,
            x: point.x,
            y: point.y,
            type: point.type,
            color: isHeadquarter
              ? TypeColorEnum.HEADQUARTER
              : TypeColorEnum[point.type],
            size: getSize({
              type: isHeadquarter ? TypeEnum.HEADQUARTER : point.type,
            }),
            orbitals: point.orbitals,
          });
        });

        setPoints(newPoints);
      }
    };

    if (data?.token) {
      handleAgent(data.token);
    }
  }, [data?.token, dispatch]);

  return (
    <Layout>
      <div className="flex flex-col h-full justify-center items-center">
        <SpaceMap points={points} />
      </div>
    </Layout>
  );
}
