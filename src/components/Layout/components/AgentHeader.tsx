import { AgentModel, PointsModel, WaypointModel } from "@/models";
import {
  formatCredits,
  getAgent,
  getMapPoints,
  getSize,
  handleSystemString,
} from "@/utils";
import React, { useEffect, useState } from "react";
import { AgentHeaderItem } from "./AgentHeaderItem";
import { useDispatch, useSelector } from "react-redux";
import { setAgent as setAgentStore, setSystem } from "@/store/slices/uiSlice";
import { TypeColorEnum, TypeEnum } from "@/enums";
import { setCenter, setWaypoints } from "@/store/slices/mapSlice";

import styles from "./AgentHeader.module.css";
import { RootState } from "@/store/store";

interface AgentHeader {
  token: string;
}

export const AgentHeader = ({ token }: AgentHeader) => {
  const [agent, setAgent] = useState<AgentModel>();
  const dispatch = useDispatch();
  const { center } = useSelector((state: RootState) => state.map);

  useEffect(() => {
    const getAgentData = async () => {
      const { data } = await getAgent({ token });

      if (data) {
        const system = handleSystemString(data.headquarters);

        setAgent(data);

        dispatch(setAgentStore(data));
        dispatch(setSystem(system));

        const { data: headquarters } = await getMapPoints({ token, system });
        const newPoints: PointsModel[] = [];
        const isCentered = center.x !== 0 && center.y !== 0;

        headquarters.waypoints.forEach((point: WaypointModel) => {
          const isHeadquarter = point.symbol === data.headquarters;

          if (isHeadquarter && !isCentered) {
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

        dispatch(setWaypoints(newPoints));
      }
    };

    getAgentData();
  }, [dispatch, token]);

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
