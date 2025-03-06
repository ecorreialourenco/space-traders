import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { BASE_URL } from "@/constants";
import { CooldownModel, FeedbackType, SurveyingModel } from "@/models";

export const useSurvey = ({
  shipId,
  updateCargo,
}: {
  shipId: string;
  updateCargo: ({ message, type }: FeedbackType) => void;
}) => {
  const { data } = useSession();
  const token = data?.token ?? "";

  const handleSurvey = async (): Promise<{
    data: SurveyingModel;
    error: { data: CooldownModel };
  }> => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      `${BASE_URL}/my/ships/${shipId}/survey`,
      options
    );

    return response.json();
  };

  return useMutation({
    mutationKey: ["survey", shipId],
    mutationFn: handleSurvey,
    onSuccess: (res) => {
      if (res.error) {
        return updateCargo({
          message: `Missing ${res.error.data.remainingSeconds} seconds`,
          type: "error",
        });
      }
      return updateCargo({
        message: `Survey successfully done`,
        type: "success",
      });
    },
    onError: (error) => updateCargo({ message: error.message, type: "error" }),
  });
};
