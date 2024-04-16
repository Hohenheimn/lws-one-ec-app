import { useQuery } from "@tanstack/react-query";
import { retrieveData } from "../helpers";
import api from "../utils/apiURL";
import { CoopData } from "../types/CoopData";

export function useGetCoop() {
  const token = retrieveData("userToken");
  const fetcher = (): Promise<CoopData> => {
    return api
      .get("/api/v1/coop", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
  };
  return useQuery({
    queryKey: ["coop"],
    queryFn: fetcher,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
}
