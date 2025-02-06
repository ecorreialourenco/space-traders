import { AgentModel } from "@/models";
import { getAgent, handleSystemString } from "@/utils";
import React, { useEffect, useState } from "react";
import { AgentHeaderItem } from "./AgentHeaderItem";

import styles from "./AgentHeader.module.css";
import { useDispatch } from "react-redux";
import { setAgent as setAgentStore, setSystem } from "@/store/slices/uiSlice";

interface AgentHeader {
  token: string;
}

export const AgentHeader = ({ token }: AgentHeader) => {
  const [agent, setAgent] = useState<AgentModel>();
  const dispatch = useDispatch();

  useEffect(() => {
    const getAgentData = async () => {
      const { data } = await getAgent({ token });

      if (data) {
        const system = handleSystemString(data.headquarters);

        setAgent(data);

        dispatch(setAgentStore(data));
        dispatch(setSystem(system));
      }
    };

    getAgentData();
  }, [dispatch, token]);

  if (!agent) {
    return null;
  }

  const credits = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    currencyDisplay: "narrowSymbol",
  }).format(agent.credits);

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
