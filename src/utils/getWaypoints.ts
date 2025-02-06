import { BASE_URL } from "@/constants";
import { WaypointModel } from "@/models";
import { options } from "./requestOptions";

interface WaypointProps {
  token: string;
  systems: string;
  planet: string;
}

interface WaypointResponse {
  data: WaypointModel;
}

export const getWaypoint = async ({
  token,
  systems,
  planet,
}: WaypointProps): Promise<WaypointResponse> => {
  const response = await fetch(
    `${BASE_URL}/systems/${systems}/waypoints/${planet}`,
    options(token)
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
