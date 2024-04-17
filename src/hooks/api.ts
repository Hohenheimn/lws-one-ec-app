import axios, { ResponseType } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

import { env } from "@/envConfig";

import { retrieveData } from "../helpers";
import api from "../utils/apiURL";

const token = retrieveData("userToken");
export const useFetch = <TData>(
  apiUrl: string,
  queryKey: string[],
  enabled?: boolean
) => {
  return useQuery({
    queryFn: async (): Promise<TData> => {
      return api
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data);
    },
    queryKey: queryKey,
    enabled: enabled,
  });
};

export const usePost = (apiUrl: string) => {
  return useMutation({
    mutationFn: async (payload: unknown) => {
      return api.post(apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
};

export const usePostNoToken = (
  apiUrl: string,
  onSuccess: (res?: any) => void,
  onError: (res?: any) => void
) => {
  return useMutation({
    mutationFn: (payload: any) => {
      return axios.post(`${env.API_HOST}${apiUrl}`, payload);
    },
    onSuccess,
    onError,
  });
};
