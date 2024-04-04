import axios, { ResponseType } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

import { env } from "@/envConfig";

const token = "";
export const useFetch = (apiUrl: string, queryKey: string[]) => {
  return useQuery({
    queryFn: async () => {
      return axios.get(`${env.API_HOST}${apiUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    queryKey: queryKey,
  });
};

export const usePost = (
  apiUrl: string,
  onSuccess: (res?: any) => void,
  onError: (res?: any) => void
) => {
  return useMutation({
    mutationFn: async (payload) => {
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
