import { getMapPoints } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export const useHeadquarters = ({
  token,
  system,
}: {
  token: string;
  system: string;
}) =>
  useQuery({
    queryKey: ["headquarters"],
    queryFn: async () => {
      return await getMapPoints({ token, system });
    },
    select: (res) => res.data,
    enabled: !!token && !!system,
  });
