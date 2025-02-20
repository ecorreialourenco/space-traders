import React, { useState } from "react";

import { MyShipModel, MyShipsResponse, SurveyingModel } from "@/models";
import { checkMiningLocation, getSurvey } from "@/utils";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

import { SurveyingModal } from "./SurveyingModal";
import { SurveyingTooltip } from "./SurveyingTooltip";

interface SurveyingProps {
  token: string;
  ship: MyShipModel;
  updateCargo: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<MyShipsResponse, Error>>;
}

export const Surveying = ({ token, ship, updateCargo }: SurveyingProps) => {
  const [surveyingData, setSurveyingData] = useState<SurveyingModel>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!checkMiningLocation(ship.nav.route.destination.type)) {
    return null;
  }

  const handleSuvvey = async () => {
    const response = await getSurvey({ token, shipId: ship.symbol });

    setSurveyingData(response.data ?? response.error.data);
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
