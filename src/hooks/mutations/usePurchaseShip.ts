import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { BASE_URL } from "@/constants";
import { CommonError, FeedbackType, PurchaseShipModel } from "@/models";

interface PurchaseShipProps {
  shipType: string;
  waypoint: string;
}

export const usePurchaseShip = ({
  updateList,
}: {
  updateList: ({ message, type }: FeedbackType) => void;
}) => {
  const { data } = useSession();
  const token = data?.token ?? "";

  const handlePurchaseShip = async ({
    shipType,
    waypoint,
  }: PurchaseShipProps): Promise<{
    data: PurchaseShipModel;
    error: CommonError;
  }> => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        shipType: shipType,
        waypointSymbol: waypoint,
      }),
    };

    const response = await fetch(`${BASE_URL}/my/ships`, options);

    return response.json();
  };

  return useMutation({
    mutationFn: handlePurchaseShip,
    onSuccess: (res) => {
      console.log("🚀 ~ res:", res);
      if (res.error) {
        return updateList({ message: res.error.message, type: "error" });
      }
      return updateList({
        message: `Your have bought your ship ${res.data.ship.symbol}`,
        type: "success",
      });
    },
    onError: (error) => updateList({ message: error.message, type: "error" }),
  });
};
