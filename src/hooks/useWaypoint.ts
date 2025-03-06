import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";

import { BASE_URL } from "@/constants";
import { WaypointResponse } from "@/models";
import { RootState } from "@/store/store";
import { options } from "@/utils/requestOptions";

export const useWaypoint = ({ planet }: { planet: string }) => {
  const { system } = useSelector((state: RootState) => state.ui);
  const { data } = useSession();
  const token = data?.token ?? "";

  const getWaypoint = async (): Promise<WaypointResponse> => {
    const response = await fetch(
      `${BASE_URL}/systems/${system}/waypoints/${planet}`,
      options(token)
    );

    return response.json();
  };

  return useQuery({
    queryKey: ["waypoint", planet],
    queryFn: getWaypoint,
    select: (res) => res.data,
    enabled: !!token && !!system,
  });
};
