import { BASE_URL } from "@/constants";
import { NavActionStatusEnum } from "@/enums";
import { NavigationModel, PurchaseShipModel } from "@/models";

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
