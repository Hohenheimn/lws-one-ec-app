import { useQuery } from "@tanstack/react-query";

import { retrieveData } from "../helpers";
import api from "../utils/apiURL";

export function useGetUserData() {
  const token = retrieveData("userToken");
  const fetcher = async () => {
    const response = api.get("/api/v1/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = (await response).data;
    return data;
  };
  return useQuery({
    queryKey: ["user"],
    queryFn: fetcher,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
}
