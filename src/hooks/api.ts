import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

import { env } from "@/envConfig";

import { retrieveData } from "../helpers";
import api from "../utils/apiURL";

export const useFetch = <TData>(
  apiUrl: string,
  queryKey: string[],
  enabled?: boolean
) => {
  return useQuery({
    queryFn: async (): Promise<TData> => {
      const token = retrieveData("userToken");
      return api
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log(queryKey + ": " + res?.data?.message);
          return res.data || {};
        })
        .catch((err) => {
          console.log(queryKey + " " + err);
          console.log(err?.message);
        });
    },
    queryKey: queryKey,
    enabled: enabled,
  });
};

export const usePost = (apiUrl: string) => {
  const token = retrieveData("userToken");
  return useMutation({
    mutationFn: async (payload: any) => {
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

export const usePostNoPayload = (
  apiUrl: string,
  onSuccess: (res?: any) => void,
  onError: (res?: any) => void
) => {
  return useMutation({
    mutationFn: () => {
      return axios.post(`${env.API_HOST}${apiUrl}`);
    },
    onSuccess,
    onError,
  });
};
