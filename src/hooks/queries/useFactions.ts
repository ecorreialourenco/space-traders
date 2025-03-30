import { useQuery } from "@tanstack/react-query";

import { BASE_URL } from "@/constants";
import { FactionModel } from "@/models";

export const useFactions = ({ page }: { page: number }) => {
  const getFactions = async (): Promise<{
    data: FactionModel[];
    error: {
      code: number;
      message: string;
    };
  }> => {
    const response = await fetch(`${BASE_URL}/factions?page=${page}&limit=20`);

    return response.json();
  };

  return useQuery({
    queryKey: ["factions", page],
    queryFn: getFactions,
  });
};
