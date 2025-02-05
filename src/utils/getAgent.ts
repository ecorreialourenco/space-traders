import { BASE_URL } from "@/constants";

export const getAgent = async ({ token }: { token: string }) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BASE_URL}/my/agent`, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
