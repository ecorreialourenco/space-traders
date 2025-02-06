import { BASE_URL } from "@/constants";
import { options } from "./requestOptions";

interface WaypointProps {
  token: string;
  systems: string;
}

export const getMapPoints = async ({ token, systems }: WaypointProps) => {
  const response = await fetch(
    `${BASE_URL}/systems/${systems}`,
    options(token)
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
