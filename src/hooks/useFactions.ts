import { BASE_URL } from "@/constants";
import { FactionModel } from "@/models";
import { useQuery } from "@tanstack/react-query";

export const useFactions = ({ page }: { page: number }) => {
  const getFactions = async (): Promise<{ data: FactionModel[] }> => {
    const response = await fetch(`${BASE_URL}/factions?page=${page}&limit=20`);

    return response.json();
  };

  return useQuery({
    queryKey: ["factions", page],
    queryFn: getFactions,
    select: (res) => res.data,
  });
};
