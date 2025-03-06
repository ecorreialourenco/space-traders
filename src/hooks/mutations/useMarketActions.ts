import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { BASE_URL } from "@/constants";

interface MarketActionsProps {
  miningShipSymbol: string;
  action: string;
  cargo: {
    symbol: string;
    units: number;
  };
}

export const useMarketActions = () => {
  const { data } = useSession();
  const token = data?.token ?? "";

  const marketAction = async ({
    miningShipSymbol,
    action,
    cargo,
  }: MarketActionsProps) => {
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

  return useMutation({ mutationFn: marketAction });
};
