import { BASE_URL, LIMIT } from "@/constants";
import { options } from "@/utils/requestOptions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useContracts = ({ page }: { page: number }) => {
  const { data } = useSession();
  const token = data?.token ?? "";

  const getContracts = async () => {
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
