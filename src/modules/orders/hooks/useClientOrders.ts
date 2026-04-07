import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "@/modules/customer/home/interfaces/responses";
import { getClientOrders } from "../api/order.api";
import { OrderResponse } from "../interfaces/responses/order-response.interface";

export const useClientOrders = (clientId: string | null | undefined) => {
  return useQuery<PaginatedResponse<OrderResponse>, Error>({
    queryKey: ["client-orders", clientId],
    queryFn: () => getClientOrders(clientId!),
    enabled: !!clientId,
    staleTime: 30 * 1000,
    retry: 2,
  });
};
