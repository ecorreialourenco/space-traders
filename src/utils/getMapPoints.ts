import { BASE_URL } from "@/constants";
import { options } from "./requestOptions";

interface WaypointProps {
  token: string;
  system: string;
}

export const getMapPoints = async ({ token, system }: WaypointProps) => {
  const response = await fetch(
    `${BASE_URL}/systems/${system}`,
    options(token)
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
