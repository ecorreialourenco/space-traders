import { BASE_URL } from "@/constants";
import { AgentModel, DeliverError, FeedbackType } from "@/models";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface FlightModeProps {
  waypointSymbol: string;
  shipId: string;
}

export const useNavigation = ({
  updateShip,
}: {
  updateShip: ({ message, type }: FeedbackType) => void;
}) => {
  const { data } = useSession();
  const token = data?.token ?? "";

  const handleNavigation = async ({
    shipId,
    waypointSymbol,
  }: FlightModeProps): Promise<{
    data: AgentModel;
    error: DeliverError;
  }> => {
    const flightOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ waypointSymbol }),
    };

    const response = await fetch(
      `${BASE_URL}/my/ships/${shipId}/navigate`,
      flightOptions
    );

    return response.json();
  };

  return useMutation({
    mutationFn: handleNavigation,
    onSuccess: (res) => {
      console.log("🚀 ~ res:", res)
      if (res.error) {
        return updateShip({ message: res.error.message, type: "error" });
      }
      return updateShip({
        message: "Traveling to selected waypoint",
        type: "success",
      });
    },
    onError: (error) => updateShip({ message: error.message, type: "error" }),
  });
};
