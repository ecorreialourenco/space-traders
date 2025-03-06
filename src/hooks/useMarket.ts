import { useSuspenseQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";

import { BASE_URL } from "@/constants";
import { RootState } from "@/store/store";
import { options } from "@/utils/requestOptions";

export const useMarket = ({
  asteroidWaypointSymbol,
}: {
  asteroidWaypointSymbol: string;
}) => {
  const { system } = useSelector((state: RootState) => state.ui);
  const { data } = useSession();
  const token = data?.token ?? "";

  const getMarketInfo = async () => {
    const response = await fetch(
      `${BASE_URL}/systems/${system}/waypoints/${asteroidWaypointSymbol}/market`,
      options(token)
    );

    return response.json();
  };

  return useSuspenseQuery({
    queryKey: ["market", system, asteroidWaypointSymbol],
    queryFn: getMarketInfo,
  });
};
