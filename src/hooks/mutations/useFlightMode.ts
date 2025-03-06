import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { BASE_URL } from "@/constants";
import { FlightModeEnum } from "@/enums";
import { AgentModel, CommonError, FeedbackType } from "@/models";

interface FlightModeProps {
  flightMode: FlightModeEnum;
  shipId: string;
}

export const useFlightMode = ({
  updateShip,
}: {
  updateShip: ({ message, type }: FeedbackType) => void;
}) => {
  const { data } = useSession();
  const token = data?.token ?? "";

  const setFlightMode = async ({
    shipId,
    flightMode,
  }: FlightModeProps): Promise<{
    data: AgentModel;
    error: CommonError;
  }> => {
    const flightOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ flightMode }),
    };
    // change flight mode
    const response = await fetch(
      `${BASE_URL}/my/ships/${shipId}/nav`,
      flightOptions
    );

    return response.json();
  };

  return useMutation({
    mutationFn: setFlightMode,
    onSuccess: (res) => {
      console.log("🚀 ~ res:", res);
      if (res.error) {
        return updateShip({ message: res.error.message, type: "error" });
      }
      return updateShip({
        message: "Fligh mode changed",
        type: "success",
      });
    },
    onError: (error) => updateShip({ message: error.message, type: "error" }),
  });
};
