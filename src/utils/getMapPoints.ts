import { BASE_URL } from "@/constants";

interface WaypointProps {
  token: string;
  systems: string;
}

export const getMapPoints = async ({ token, systems }: WaypointProps) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BASE_URL}/systems/${systems}`, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
