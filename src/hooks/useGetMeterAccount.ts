//

import { useQuery } from "@tanstack/react-query";
import { retrieveData } from "../helpers";
import api from "../utils/apiURL";
import { MeterAccountDetails } from "../types/MeterAccountDetails";

export function useGetMeterAccount(meterNumber: number, coopId: number) {
  const token = retrieveData("userToken");
  const fetcher = (): Promise<MeterAccountDetails> => {
    return api
      .get(`/api/v1/meterAccount/${meterNumber}/${coopId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
  };
  return useQuery({
    queryKey: ["meter-account", meterNumber, coopId],
    queryFn: fetcher,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
}
