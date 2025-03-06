import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { BASE_URL, LIMIT } from "@/constants";
import { options } from "@/utils/requestOptions";

export const useShips = ({ page }: { page: number }) => {
  const { data } = useSession();
  const token = data?.token ?? "";

  const getShips = async () => {
    const response = await fetch(
      `${BASE_URL}/my/ships?page=${page}&limit=${LIMIT}`,
      options(token)
    );

    return response.json();
  };

  return useQuery({
    queryKey: ["myShips", page],
    queryFn: getShips,
    enabled: !!token,
  });
};
