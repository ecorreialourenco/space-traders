import { BASE_URL } from "@/constants";

export const getFactions = async ({ page }: { page: number }) => {
  const response = await fetch(`${BASE_URL}/factions?page=${page}&limit=20`);

  return response.json();
};
