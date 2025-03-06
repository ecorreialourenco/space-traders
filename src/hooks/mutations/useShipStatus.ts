import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { BASE_URL } from "@/constants";
import { NavActionStatusEnum } from "@/enums";
import { CommonError, FeedbackType, NavigationModel } from "@/models";

interface ShipStatusProps {
  miningShipSymbol: string;
  status: NavActionStatusEnum;
}

export const useShipStatus = ({
  updateShip,
}: {
  updateShip: ({ message, type }: FeedbackType) => void;
}) => {
  const { data } = useSession();
  const token = data?.token ?? "";

  const handleShipStatus = async ({
    miningShipSymbol,
    status,
  }: ShipStatusProps): Promise<{
    data: { nav: NavigationModel };
    error: CommonError;
  }> => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      `${BASE_URL}/my/ships/${miningShipSymbol}/${status}`,
      options
    );

    return response.json();
  };

  return useMutation({
    mutationFn: handleShipStatus,
    onSuccess: (res) => {
      if (res.error) {
        return updateShip({ message: res.error.message, type: "error" });
      }
      return updateShip({
        message: `Your ship is now ${res.data.nav.status}`,
        type: "success",
      });
    },
    onError: (error) => updateShip({ message: error.message, type: "error" }),
  });
};
