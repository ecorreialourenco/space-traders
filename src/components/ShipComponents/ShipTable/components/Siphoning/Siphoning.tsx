import React from "react";

import { useShiphon } from "@/hooks";
import { FeedbackType, MyShipModel } from "@/models";

import { SiphonCountdown } from "./SiphonCountdown";

interface SiphoningProps {
  ship: MyShipModel;
  updateCargo: ({ message, type }: FeedbackType) => void;
}

export const Siphoning = ({ ship, updateCargo }: SiphoningProps) => {
  const { refetch } = useShiphon({ shipId: ship.symbol });

  const handleExtract = async () => {
    refetch().then(({ data }) => {
      if (data?.data) {
        const yieldData = data.data.siphon.yield;
        updateCargo({
          message: `Siphoned ${yieldData.units} pieces of ${yieldData.symbol}`,
          type: "success",
        });
      }
    });
  };

  return <SiphonCountdown ship={ship} onClick={handleExtract} />;
};
