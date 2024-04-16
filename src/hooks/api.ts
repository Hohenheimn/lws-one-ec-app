import axios, { ResponseType } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

import { env } from "@/envConfig";

import { retrieveData } from "../helpers";

const token = retrieveData("userToken");
export const useFetch = (
  apiUrl: string,
  queryKey: string[],
  enabled?: boolean
) => {
  return useQuery({
    queryFn: async () => {
      return axios.get(`${env.API_HOST}${apiUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    queryKey: queryKey,
    enabled: enabled,
  });
};

export const usePost = (
  apiUrl: string,
  onSuccess: (res?: any) => void,
  onError: (res?: any) => void
) => {
  return useMutation({
    mutationFn: async (payload: any) => {
      return axios.post(`${env.API_HOST}${apiUrl}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: onSuccess,
    onError: onError,
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
