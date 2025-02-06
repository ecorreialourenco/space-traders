import { BASE_URL } from "@/constants";
import {
  MyShipModel,
  PurchaseShipModel,
  ShipyardModel,
  ShipyardShopModel,
} from "@/models";
import { options } from "./requestOptions";

interface MyShipProps {
  token: string;
}

interface FindShipyardsProps {
  token: string;
  system: string;
}

interface ShowAvailableShipsProps {
  token: string;
  system: string;
  waypoint: string;
}

interface PurchaseShipProps {
  token: string;
  shipType: string;
  waypoint: string;
}

interface PurchaseShipError {
  message: string;
  code: number;
  data: {
    creditsAvailable: number;
    creditsNeeded: number;
  };
}

export const myShips = async ({
  token,
}: MyShipProps): Promise<{ data: MyShipModel[] }> => {
  const response = await fetch(`${BASE_URL}/my/ships`, options(token));
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const findShipyards = async ({
  token,
  system,
}: FindShipyardsProps): Promise<{ data: ShipyardModel[] }> => {
  const response = await fetch(
    `${BASE_URL}/systems/${system}/waypoints?traits=SHIPYARD`,
    options(token)
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const showAvailableShips = async ({
  token,
  system,
  waypoint,
}: ShowAvailableShipsProps): Promise<{ data: ShipyardShopModel | null }> => {
  const response = await fetch(
    `${BASE_URL}/systems/${system}/waypoints/${waypoint}/shipyard`,
    options(token)
  );
  if (!response.ok) {
    return { data: null };
  }
  return response.json();
};

export const purchaseShip = async ({
  token,
  shipType,
  waypoint,
}: PurchaseShipProps): Promise<{
  data: PurchaseShipModel | null;
  error: PurchaseShipError | null;
}> => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      shipType: shipType,
      waypointSymbol: waypoint,
    }),
  };

  fetch("https://api.spacetraders.io/v2/my/ships", options).then((response) =>
    response.json()
  );

  const response = await fetch(`${BASE_URL}/my/ships`, options);
  return response.json();
};
