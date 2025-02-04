import { BASER_URL } from "@/constants";

export const getFactions = async ({ page }: { page: number }) => {
  const response = await fetch(`${BASER_URL}/factions?page=${page}&limit=20`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
