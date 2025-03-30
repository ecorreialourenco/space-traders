import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { BASE_URL } from "@/constants";
import { CargoModel, FeedbackType } from "@/models";
import { options } from "@/utils/requestOptions";

export const useJettison = ({
  shipId,
  updateCargo,
}: {
  shipId: string;
  updateCargo: ({ message, type }: FeedbackType) => void;
}) => {
  const { data } = useSession();
  const token = data?.token ?? "";

  const trowAwayCargo = async ({
    symbol,
    units,
  }: {
    symbol: string;
    units: number;
  }): Promise<{
    data: CargoModel;
    error: {
      message: string;
      code: number;
      data: {
        units: string[];
      };
    };
  }> => {
    const response = await fetch(`${BASE_URL}/my/ships/${shipId}/jettison`, {
      ...options(token),
      method: "POST",
      body: JSON.stringify({ symbol, units }),
    });

    return response.json();
  };

  return useMutation({
    mutationKey: ["jettison", shipId],
    mutationFn: trowAwayCargo,
    onSuccess: (res) => {
      if (res.error) {
        return updateCargo({ message: res.error.message, type: "error" });
      }
      return updateCargo({
        message: "Cargo removed",
        type: "success",
      });
    },
    onError: (error) => updateCargo({ message: error.message, type: "error" }),
  });
};
