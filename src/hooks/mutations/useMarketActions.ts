import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { BASE_URL } from "@/constants";
import { FeedbackType, MarketResponse } from "@/models";

interface MarketActionsProps {
  miningShipSymbol: string;
  action: string;
  cargo: {
    symbol: string;
    units: number;
  };
}

export const useMarketActions = ({
  updateCargo,
}: {
  updateCargo: ({ message, type }: FeedbackType) => void;
}) => {
  const { data } = useSession();
  const token = data?.token ?? "";

  const marketAction = async ({
    miningShipSymbol,
    action,
    cargo,
  }: MarketActionsProps): Promise<MarketResponse> => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cargo),
    };

    const response = await fetch(
      `${BASE_URL}my/ships/${miningShipSymbol}/${action}`,
      options
    );

    return response.json();
  };

  return useMutation({
    mutationFn: marketAction,
    onSuccess: (res) => {
      console.log("🚀 ~ res:", res);
      if (res.error) {
        return updateCargo({ message: res.error.message, type: "error" });
      }
      const transactionType =
        res.data.transaction.type === "SELL" ? "sold" : "You have bought";

      return updateCargo({
        message: `You have ${transactionType} ${res.data.transaction.units} of ${res.data.transaction.tradeSymbol}`,
        type: "success",
      });
    },
    onError: (error) => updateCargo({ message: error.message, type: "error" }),
  });
};
