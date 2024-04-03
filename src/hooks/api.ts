import axios, { ResponseType } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery } from "@tanstack/react-query";

import { env } from "@/envConfig";

export const useFetch = (apiUrl: string, queryKey: string[]) => {
  return useQuery({
    queryFn: async () => {
      return axios.get(`${env.API_HOST}${apiUrl}`, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      });
    },
    queryKey: queryKey,
  });
};

export const usePost = (
  apiUrl: string,
  onSuccess: (res: ResponseType) => void,
  onError: (res: ResponseType) => void
) => {
  return useMutation({
    mutationFn: (payload) => {
      return axios.post(`${env.API_HOST}${apiUrl}`, payload);
    },
    onSuccess: onSuccess,
    onError: onError,
  });
};
