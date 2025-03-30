import { useQuery } from "@tanstack/react-query";

import { BASE_URL } from "@/constants";
import { ServerResponseModel } from "@/models";

export const useServerInfo = () => {
  const getServerInfo = async (): Promise<ServerResponseModel> => {
    const response = await fetch(BASE_URL);

    return response.json();
  };

  return useQuery({
    queryKey: ["serverInfo"],
    queryFn: async () => await getServerInfo(),
  });
};
