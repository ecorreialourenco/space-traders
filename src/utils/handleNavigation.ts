import { BASE_URL } from "@/constants";
import { FlightModeEnum } from "@/enums";
import { FuelModel, NavigationModel } from "@/models";

interface NavigateResponse {
  nav: NavigationModel;
  fuel: FuelModel;
  events: [];
}

export const navigateToWaypoint = async ({
  token,
  flightMode,
  waypointSymbol,
  shipId,
}: {
  token: string;
  waypointSymbol: string;
  flightMode: FlightModeEnum;
  shipId: string;
}): Promise<{ data: NavigateResponse }> => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const flightOptions = {
    method: "PATCH",
    headers,
    body: JSON.stringify({ flightMode }),
  };
  // change flight mode
  const flightResponse = await fetch(
    `${BASE_URL}/my/ships/${shipId}/nav`,
    flightOptions
  );

  if (!flightResponse.ok) {
    throw new Error("Network response was not ok");
  }

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ waypointSymbol }),
  };

  const response = await fetch(
    `${BASE_URL}/my/ships/${shipId}/navigate`,
    options
  );

  return response.json();
};

export const getSurvey = async ({
  token,
  shipId,
}: {
  token: string;
  shipId: string;
}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const options = {
    method: "POST",
    headers,
  };

  const response = await fetch(
    `${BASE_URL}/my/ships/${shipId}/survey`,
    options
  );

  return response.json();
};
