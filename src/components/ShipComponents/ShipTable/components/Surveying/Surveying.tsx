import React, { useEffect, useState } from "react";

import { useSurvey } from "@/hooks";
import { FeedbackType, MyShipModel, SurveyingModel } from "@/models";
import { checkMiningLocation } from "@/utils";

import { SurveyingModal } from "./SurveyingModal";
import { SurveyingTooltip } from "./SurveyingTooltip";

interface SurveyingProps {
  ship: MyShipModel;
  updateCargo: ({ message, type }: FeedbackType) => void;
}

export const Surveying = ({ ship, updateCargo }: SurveyingProps) => {
  const [surveyingData, setSurveyingData] = useState<SurveyingModel>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data, mutate } = useSurvey({ shipId: ship.symbol, updateCargo });

  useEffect(() => {
    if (data?.data || data?.error) {
      setSurveyingData(data.data ?? data.error.data);
    }
  }, [data]);

  if (!checkMiningLocation(ship.nav.route.destination.type)) {
    return null;
  }

  const handleSuvvey = async () => {
    mutate();
    setIsOpen(true);
  };

  return (
    <>
      <SurveyingTooltip
        ship={ship}
        expirationDate={surveyingData?.cooldown.expiration ?? ""}
        onSubmit={handleSuvvey}
      />

      {surveyingData && (
        <SurveyingModal
          isOpen={isOpen}
          ship={ship}
          data={surveyingData}
          onClose={() => setIsOpen(false)}
          updateCargo={updateCargo}
        />
      )}
    </>
  );
};
