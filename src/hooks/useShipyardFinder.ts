import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";

import { BASE_URL } from "@/constants";
import { ShipyardModel } from "@/models";
import { RootState } from "@/store/store";
import { options } from "@/utils/requestOptions";

export const useShipyardFinder = () => {
  const { system } = useSelector((state: RootState) => state.ui);
  const { data } = useSession();
  const token = data?.token ?? "";

  const findShipyard = async (): Promise<{ data: ShipyardModel[] }> => {
    const response = await fetch(
      `${BASE_URL}/systems/${system}/waypoints?traits=SHIPYARD`,
      options(token)
    );

    return response.json();
  };

  return useQuery({
    queryKey: ["findShipyard", system],
    queryFn: findShipyard,
    enabled: !!system,
  });
};
