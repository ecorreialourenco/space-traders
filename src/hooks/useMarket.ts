import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";

import { BASE_URL } from "@/constants";
import { options } from "@/utils/requestOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { RootState } from "@/store/store";

export const useMarket = ({
  asteroidWaypointSymbol,
}: {
  asteroidWaypointSymbol: string;
}) => {
  const { system } = useSelector((state: RootState) => state.ui);
  const { data } = useSession();
  const token = data?.token ?? "";

  const getShips = async () => {
    const response = await fetch(
      `${BASE_URL}/systems/${system}/waypoints/${asteroidWaypointSymbol}/market`,
      options(token)
    );

    return response.json();
  };

  return useSuspenseQuery({
    queryKey: ["myShips", system, asteroidWaypointSymbol],
    queryFn: getShips,
  });
};
