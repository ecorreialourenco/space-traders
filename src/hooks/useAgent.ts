import { BASE_URL } from "@/constants";
import { AgentModel } from "@/models";
import { options } from "@/utils/requestOptions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useAgent = () => {
  const { data } = useSession();
  const token = data?.token ?? "";

  const getAgent = async (): Promise<{ data: AgentModel }> => {
    const response = await fetch(`${BASE_URL}/my/agent`, options(token));

    return response.json();
  };

  return useQuery({
    queryKey: ["agent"],
    queryFn: async () => await getAgent(),
    select: (res) => res.data,
    enabled: !!token,
    refetchInterval: false
  });
};
