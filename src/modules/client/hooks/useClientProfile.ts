import { useQuery } from "@tanstack/react-query";
import { getClientById } from "../api/client.api";
import { ClientResponse } from "../interfaces/responses/client.response";

export const useClientProfile = (clientId: string | undefined) => {
  return useQuery<ClientResponse>({
    queryKey: ["client", clientId],
    queryFn: () => getClientById(clientId!),
    enabled: !!clientId,
  });
};
