import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { BASE_URL } from "@/constants";
import { ShiphonResponseModel, SurveysModel } from "@/models";
import { ExtractErrorModel } from "@/models/extract.model";
import { options } from "@/utils/requestOptions";

export const useShiphon = ({
  shipId,
  survey,
}: {
  shipId: string;
  survey?: SurveysModel;
}) => {
  const { data } = useSession();
  const token = data?.token ?? "";

  const getGas = async (): Promise<{
    data: ShiphonResponseModel;
    error: ExtractErrorModel;
  }> => {
    const response = await fetch(`${BASE_URL}/my/ships/${shipId}/siphon`, {
      ...options(token),
      method: "POST",
    });

    return response.json();
  };

  return useQuery({
    queryKey: ["extract", shipId, survey],
    queryFn: getGas,
    enabled: false,
  });
};
