import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { BASE_URL } from "@/constants";
import { CommonError, FeedbackType, RefuelModel } from "@/models";

interface ShipStatusProps {
  miningShipSymbol: string;
}

export const useRefuel = ({
  onRefuel,
}: {
  onRefuel: ({ message, type }: FeedbackType) => void;
}) => {
  const { data } = useSession();
  const token = data?.token ?? "";

  const handleShipStatus = async ({
    miningShipSymbol,
  }: ShipStatusProps): Promise<{
    data: RefuelModel;
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
      `${BASE_URL}/my/ships/${miningShipSymbol}/refuel`,
      options
    );

    return response.json();
  };

  return useMutation({
    mutationFn: handleShipStatus,
    onSuccess: (res) => {
      if (res.error) {
        return onRefuel({ message: res.error.message, type: "error" });
      }
      return onRefuel({
        message: `${res.data.transaction.shipSymbol} refueled with ${res.data.fuel.consumed.amount}`,
        type: "success",
      });
    },
    onError: (error) => onRefuel({ message: error.message, type: "error" }),
  });
};
