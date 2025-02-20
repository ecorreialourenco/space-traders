import React, { useState } from "react";

import { MyShipModel } from "@/models/ship.model";
import { TypeEnum } from "@/enums";
import { getSurvey } from "@/utils/handleNavigation";
import { SurveyingModel } from "@/models";

import { SurveyingModal } from "./SurveyingModal";
import { SurveyingTooltip } from "./SurveyingTooltip";

interface SurveyingProps {
  token: string;
  ship: MyShipModel;
}

export const Surveying = ({ token, ship }: SurveyingProps) => {
  const [surveyingData, setSurveyingData] = useState<SurveyingModel>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const availableTyles = [
    TypeEnum.ASTEROID,
    TypeEnum.ASTEROID_FIELD,
    TypeEnum.ENGINEERED_ASTEROID,
  ];

  if (!availableTyles.includes(ship.nav.route.destination.type)) {
    return null;
  }

  const handleSuvvey = async () => {
    const response = await getSurvey({ token, shipId: ship.symbol });

    setSurveyingData(response.data);
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
          data={surveyingData}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
