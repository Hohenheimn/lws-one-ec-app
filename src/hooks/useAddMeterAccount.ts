import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/apiURL";
import { retrieveData } from "../helpers";

export const useAddMeterAccount = () => {
  const token = retrieveData("userToken");
  return useMutation({
    mutationFn: (payload: unknown) => {
      return api.post("/api/v1/accountregistry/user", payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    },
  });
};
