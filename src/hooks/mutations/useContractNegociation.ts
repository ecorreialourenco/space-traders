import { BASE_URL } from "@/constants";
import { AgentModel } from "@/models";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useContractNegociation = ({
  shipSymbol,
  updateList,
}: {
  shipSymbol: string;
  updateList: () => void;
}) => {
  const { data } = useSession();
  const token = data?.token ?? "";

  const negociateContract = async (): Promise<{ data: AgentModel }> => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      `${BASE_URL}/my/ships/${shipSymbol}/negotiate/contract`,
      options
    );

    return response.json();
  };

  return useMutation({
    mutationFn: negociateContract,
    onSuccess: () => updateList(),
  });
};
