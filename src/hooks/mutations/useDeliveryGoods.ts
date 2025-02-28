import { BASE_URL } from "@/constants";
import { AgentModel, DeliverError, FeedbackType } from "@/models";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface DeliveryGoodsProps {
  contractId: string;
  shipSymbol: string;
  tradeSymbol: string;
  units: number;
}

export const useDeliveryGoods = ({
  updateContract,
}: {
  updateContract: ({ message, type }: FeedbackType) => void;
}) => {
  const { data } = useSession();
  const token = data?.token ?? "";

  const deliveryGoods = async ({
    contractId,
    shipSymbol,
    tradeSymbol,
    units,
  }: DeliveryGoodsProps): Promise<{
    data: AgentModel;
    error: DeliverError;
  }> => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ shipSymbol, tradeSymbol, units }),
    };

    const response = await fetch(
      `${BASE_URL}/my/contracts/${contractId}/deliver`,
      options
    );

    return response.json();
  };

  return useMutation({
    mutationFn: deliveryGoods,
    onSuccess: (res) => {
      if (res.error) {
        return updateContract({ message: res.error.message, type: "error" });
      }
      return updateContract({ message: "Goods delivered", type: "success" });
    },
    onError: (error) =>
      updateContract({ message: error.message, type: "error" }),
  });
};
