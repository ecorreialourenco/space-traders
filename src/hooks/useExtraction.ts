import { useSession } from "next-auth/react";

import { BASE_URL } from "@/constants";
import { options } from "@/utils/requestOptions";
import { useQuery } from "@tanstack/react-query";
import { SurveysModel } from "@/models";
import { ExtractErrorModel, ExtractModel } from "@/models/extract.model";

export const useExtraction = ({
  shipId,
  survey,
}: {
  shipId: string;
  survey?: SurveysModel;
}) => {
  const { data } = useSession();
  const token = data?.token ?? "";

  const getShips = async (): Promise<{
    data: ExtractModel;
    error: ExtractErrorModel;
  }> => {
    const response = await fetch(`${BASE_URL}/my/ships/${shipId}/extract`, {
      ...options(token),
      method: "POST",
      body: survey ? JSON.stringify({ survey }) : undefined,
    });

    return response.json();
  };

  return useQuery({
    queryKey: ["extract", shipId, survey],
    queryFn: getShips,
    enabled: false,
  });
};
