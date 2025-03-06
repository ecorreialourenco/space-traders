import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";

import { BASE_URL } from "@/constants";
import { RootState } from "@/store/store";
import { options } from "@/utils/requestOptions";

export const useHeadquarters = () => {
  const { system } = useSelector((state: RootState) => state.ui);
  const { data } = useSession();
  const token = data?.token ?? "";

  const getMapPoints = async () => {
    const response = await fetch(
      `${BASE_URL}/systems/${system}`,
      options(token)
    );

    return response.json();
  };

  return useQuery({
    queryKey: ["headquarters"],
    queryFn: async () => await getMapPoints(),
    select: (res) => res.data,
    enabled: !!token && !!system,
  });
};
