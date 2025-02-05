import { BASE_URL } from "@/constants";
import { WaypointModel } from "@/models";

interface WaypointProps {
  token: string;
  planet: string;
}

interface WaypointResponse {
  data: WaypointModel;
}

export const getWaypoint = async ({
  token,
  planet,
}: WaypointProps): Promise<WaypointResponse> => {
  const splitedString = planet.split("-");
  const systems = `${splitedString[0]}-${splitedString[1]}`;

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `${BASE_URL}/systems/${systems}/waypoints/${planet}`,
    options
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
