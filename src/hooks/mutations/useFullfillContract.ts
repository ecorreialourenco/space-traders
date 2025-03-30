import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { BASE_URL } from "@/constants";
import { FeedbackType } from "@/models";

export const useFullfillContract = ({
  updateContract,
}: {
  updateContract: ({ message, type }: FeedbackType) => void;
}) => {
  const { data } = useSession();
  const token = data?.token ?? "";

  const handleFullfill = async ({ contract }: { contract: string }) => {
    const flightOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      `${BASE_URL}/my/contracts/${contract}/fulfill`,
      flightOptions
    );

    return response.json();
  };

  return useMutation({
    mutationFn: handleFullfill,
    onSuccess: (res) => {
      if (res.error) {
        return updateContract({ message: res.error.message, type: "error" });
      }
      return updateContract({
        message: "Traveling to selected waypoint",
        type: "success",
      });
    },
    onError: (error) =>
      updateContract({ message: error.message, type: "error" }),
  });
};
