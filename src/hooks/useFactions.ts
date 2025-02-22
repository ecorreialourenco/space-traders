import { BASE_URL } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useFactions = ({ page }: { page: number }) => {
  const { data } = useSession();
  const token = data?.token ?? "";

  const getFactions = async () => {
    const response = await fetch(`${BASE_URL}/factions?page=${page}&limit=20`);

    return response.json();
  };

  return useQuery({
    queryKey: ["factions", page],
    queryFn: async () => await getFactions(),
    select: (res) => res.data,
    enabled: !!token,
  });
};
