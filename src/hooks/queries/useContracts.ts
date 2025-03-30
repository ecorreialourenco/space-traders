import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { BASE_URL, LIMIT } from "@/constants";
import { ContractModel } from "@/models";
import { options } from "@/utils/requestOptions";

export const useContracts = ({ page }: { page: number }) => {
  const { data } = useSession();
  const token = data?.token ?? "";

  const getContracts = async (): Promise<{
    data: ContractModel[];
    meta: { page: number; total: number };
  }> => {
    const response = await fetch(
      `${BASE_URL}/my/contracts?page=${page}&limit=${LIMIT}`,
      options(token)
    );
    return response.json();
  };

  return useQuery({
    queryKey: ["myContracts", page],
    queryFn: getContracts,
    enabled: !!token,
  });
};
