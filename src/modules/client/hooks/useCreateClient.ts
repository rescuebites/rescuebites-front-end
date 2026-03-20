import { useMutation } from "@tanstack/react-query";
import { useClientStore } from "@/modules/client/hooks/useClientStore";
import { CreateClientParams } from "../interfaces/requests/createClient.interface";
import { createClient } from "../api/client.api";
import { API_CLIENT_KEY } from "../utils/constants";

export function useCreateClient() {
  const { setPreferences } = useClientStore();

  const { isPending, isSuccess, mutate } = useMutation({
    mutationFn: async (params: CreateClientParams) => {
      await createClient(params);
      return params.createClientRequest.preferences;
    },
    mutationKey: [API_CLIENT_KEY],
    onSuccess: (preferences: string[]) => {
      setPreferences(preferences);
    },
  });

  return { isPending, isSuccess, mutate };
}
