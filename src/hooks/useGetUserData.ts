import { useQuery } from "@tanstack/react-query";

import { retrieveData } from "../helpers";
import api from "../utils/apiURL";
import { UserData } from "../types/UserData";

export function useGetUserData() {
  const token = retrieveData("userToken");
  const fetcher = async (): Promise<UserData> => {
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
