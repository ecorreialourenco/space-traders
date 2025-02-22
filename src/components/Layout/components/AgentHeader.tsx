import { PointsModel, WaypointModel } from "@/models";
import { formatCredits, getSize } from "@/utils";
import React, { useEffect } from "react";
import { AgentHeaderItem } from "./AgentHeaderItem";
import { useDispatch, useSelector } from "react-redux";
import { setAgent as setAgentStore, setSystem } from "@/store/slices/uiSlice";
import { TypeColorEnum, TypeEnum } from "@/enums";
import { setCenter, setWaypoints } from "@/store/slices/mapSlice";

import styles from "./AgentHeader.module.css";
import { RootState } from "@/store/store";
import { useAgent, useHeadquarters } from "@/hooks";

export const AgentHeader = () => {
  const dispatch = useDispatch();
  const { center } = useSelector((state: RootState) => state.map);
  const { agent } = useSelector((state: RootState) => state.ui);

  const { data, error } = useAgent();
  console.log("🚀 ~ AgentHeader ~ error:", error)
  const { data: headquarters } = useHeadquarters();

  const handleSystemString = (headquarters: string) => {
    const splitedString = headquarters.split("-");
    return `${splitedString[0]}-${splitedString[1]}`;
  };

  useEffect(() => {
    const getAgentData = async () => {
      const waypoints: WaypointModel[] = headquarters?.waypoints ?? [];

      if (data) {
        const system = handleSystemString(data.headquarters);

        dispatch(setAgentStore(data));
        dispatch(setSystem(system));

        const newPoints: PointsModel[] = [];
        const isCentered = center.x !== 0 && center.y !== 0;

        waypoints.forEach((point: WaypointModel) => {
          const isHeadquarter = point.symbol === data.headquarters;

          if (isHeadquarter && !isCentered) {
            dispatch(setCenter({ x: point.x, y: point.y }));
          }

          newPoints.push({
            ...point,
            color: isHeadquarter
              ? TypeColorEnum.HEADQUARTER
              : TypeColorEnum[point.type as keyof typeof TypeColorEnum],
            size: getSize({
              type: isHeadquarter ? TypeEnum.HEADQUARTER : point.type,
            }),
          });
        });

        dispatch(setWaypoints(newPoints));
      }
    };

    getAgentData();
  }, [center, data, dispatch, headquarters]);

  if (!agent) {
    return null;
  }

  const credits = formatCredits(agent.credits);

  return (
    <div className={styles.wrapper}>
      <AgentHeaderItem label="Agent" value={agent.symbol} />
      <AgentHeaderItem label="Faction" value={agent.startingFaction} />
      <AgentHeaderItem label="Headquarters" value={agent.headquarters} />
      <AgentHeaderItem label="Ships" value={agent.shipCount.toString()} />
      <AgentHeaderItem label="Credits" value={credits} />
    </div>
  );
};
