import { useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../utils/apiURL";

export function useGetUserData() {
  const fetcher = async () => {
    const response = api.get("/api/v1/user", {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
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
