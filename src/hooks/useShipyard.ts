import { BASE_URL } from "@/constants";
import { ShipyardShopModel } from "@/models";
import { RootState } from "@/store/store";
import { options } from "@/utils/requestOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";

export const useShipyard = ({
  asteroidWaypointSymbol,
}: {
  asteroidWaypointSymbol: string;
}) => {
  const { system } = useSelector((state: RootState) => state.ui);
  const { data } = useSession();
  const token = data?.token ?? "";

  const getShipyard = async (): Promise<{ data: ShipyardShopModel }> => {
    const response = await fetch(
      `${BASE_URL}/systems/${system}/waypoints/${asteroidWaypointSymbol}/shipyard`,
      options(token)
    );

    return response.json();
  };

  return useSuspenseQuery({
    queryKey: ["shipyard", asteroidWaypointSymbol],
    queryFn: getShipyard,
  });
};
