import { BASE_URL } from "@/constants";
import {
  NavigationModel,
  PurchaseShipModel,
  ShipyardModel,
  ShipyardShopModel,
} from "@/models";
import { options } from "./requestOptions";
import { NavActionStatusEnum } from "@/enums";

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

interface HandleShipStatusProps {
  token: string;
  miningShipSymbol: string;
  status: NavActionStatusEnum;
}

interface RefuelShipProps {
  token: string;
  miningShipSymbol: string;
}

interface PurchaseShipError {
  message: string;
  code: number;
  data: {
    creditsAvailable: number;
    creditsNeeded: number;
  };
}

interface DockShipResonse {
  nav: NavigationModel;
}

export const findShipyards = async ({
  token,
  system,
}: FindShipyardsProps): Promise<{ data: ShipyardModel[] }> => {
  const response = await fetch(
    `${BASE_URL}/systems/${system}/waypoints?traits=SHIPYARD`,
    options(token)
  );

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

  const response = await fetch(`${BASE_URL}/my/ships`, options);
  return response.json();
};

export const handleShipStatus = async ({
  token,
  miningShipSymbol,
  status,
}: HandleShipStatusProps): Promise<{
  data: DockShipResonse | null;
  error: PurchaseShipError | null;
}> => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `${BASE_URL}/my/ships/${miningShipSymbol}/${status}`,
    options
  );

  return response.json();
};

export const refuelShip = async ({
  token,
  miningShipSymbol,
}: RefuelShipProps): Promise<{
  data: PurchaseShipModel | null;
  error: PurchaseShipError | null;
}> => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `${BASE_URL}/my/ships/${miningShipSymbol}/refuel`,
    options
  );
  return response.json();
};
