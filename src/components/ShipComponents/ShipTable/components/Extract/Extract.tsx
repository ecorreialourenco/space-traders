import React from "react";

import { useExtraction } from "@/hooks";
import { FeedbackType, MyShipModel, SurveysModel } from "@/models";
import { ExtractCountdown } from "./ExtractCountdown";

interface MiningProps {
  ship: MyShipModel;
  survey?: SurveysModel;
  updateCargo: ({ message, type }: FeedbackType) => void;
}

export const Extract = ({ ship, survey, updateCargo }: MiningProps) => {
  const { refetch } = useExtraction({ shipId: ship.symbol, survey });

  const handleExtract = async () => {
    refetch().then(({ data }) => {
      if (data?.data) {
        const yieldData = data.data.extraction.yield;
        updateCargo({
          message: `Extracted ${yieldData.units} pieces of ${yieldData.symbol}`,
          type: "success",
        });
      }
    });
  };

  return <ExtractCountdown ship={ship} onClick={handleExtract} />;
};
