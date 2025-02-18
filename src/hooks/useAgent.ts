import { getAgent } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export const useAgent = (token: string) =>
  useQuery({
    queryKey: ["agent"],
    queryFn: async () => {
      return await getAgent({ token });
    },
    select: (res) => res.data,
    enabled: !!token,
  });
