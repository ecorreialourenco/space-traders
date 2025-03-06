import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { BASE_URL } from "@/constants";
import { AgentModel, DeliverError, FeedbackType } from "@/models";

interface AcceptContractProps {
  contractId: string;
}

export const useAcceptContract = ({
  updateContract,
}: {
  updateContract: ({ message, type }: FeedbackType) => void;
}) => {
  const { data } = useSession();
  const token = data?.token ?? "";

  const acceptContract = async ({
    contractId,
  }: AcceptContractProps): Promise<{
    data: AgentModel;
    error: DeliverError;
  }> => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      `${BASE_URL}/my/contracts/${contractId}/accept`,
      options
    );

    return response.json();
  };

  return useMutation({
    mutationFn: acceptContract,
    onSuccess: (res) => {
      if (res.error) {
        return updateContract({ message: res.error.message, type: "error" });
      }
      return updateContract({ message: "Contract accepted", type: "success" });
    },
    onError: (error) =>
      updateContract({ message: error.message, type: "error" }),
  });
};
