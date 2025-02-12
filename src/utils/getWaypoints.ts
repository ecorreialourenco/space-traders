import { BASE_URL } from "@/constants";
import { PaginationModel, WaypointModel } from "@/models";
import { options } from "./requestOptions";

interface WaypointProps {
  token: string;
  system: string;
  planet: string;
}

interface WaypointResponse {
  data: WaypointModel;
}

export const getWaypoint = async ({
  token,
  system,
  planet,
}: WaypointProps): Promise<WaypointResponse> => {
  const response = await fetch(
    `${BASE_URL}/systems/${system}/waypoints/${planet}`,
    options(token)
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const listWaypoints = async ({
  token,
  system,
  page,
  limit,
}: {
  token: string;
  system: string;
  page: number;
  limit: number;
}): Promise<{
  data: WaypointModel[];
  meta: PaginationModel;
  error: {
    message: string;
    code: number;
  };
}> => {
  const response = await fetch(
    `${BASE_URL}/systems/${system}/waypoints?page=${page}&limit=${limit}`,
    options(token)
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
