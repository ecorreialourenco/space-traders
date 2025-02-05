import { BASE_URL } from "@/constants";

interface GetContractProps {
  token: string;
}

export const myShips = async ({ token }: GetContractProps) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BASE_URL}/my/ships`, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
