import { Layout, SpaceMap } from "@/components";
import { TypeColorEnum, TypeEnum } from "@/enums/Types.enum";
import { PointsModel, WaypointModel } from "@/models";
import { setCenter } from "@/store/slices/mapSlice";
import { RootState } from "@/store/store";
import { getMapPoints } from "@/utils";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const [points, setPoints] = useState<PointsModel[]>([]);
  const { agent, system } = useSelector((state: RootState) => state.ui);
  const { data } = useSession();
  const token = data?.token ?? "";

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
    const handleAgent = async () => {
      if (agent?.headquarters) {
        const { data: headquarters } = await getMapPoints({ token, system });
        const newPoints: PointsModel[] = [];

        headquarters.waypoints.forEach((point: WaypointModel) => {
          const isHeadquarter = point.symbol === agent.headquarters;
          if (isHeadquarter) {
            dispatch(setCenter({ x: point.x, y: point.y }));
          }

          newPoints.push({
            ...point,
            color: isHeadquarter
              ? TypeColorEnum.HEADQUARTER
              : TypeColorEnum[point.type],
            size: getSize({
              type: isHeadquarter ? TypeEnum.HEADQUARTER : point.type,
            }),
          });
        });

        setPoints(newPoints);
      }
    };

    if (token) {
      handleAgent();
    }
  }, [token, dispatch, agent, system]);

  return (
    <Layout>
      <div className="flex flex-col h-full justify-center items-center">
        <SpaceMap points={points} />
      </div>
    </Layout>
  );
}
