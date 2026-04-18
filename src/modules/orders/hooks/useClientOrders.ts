import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "@/modules/customer/home/interfaces/responses/paginated.response";
import { getClientOrders } from "../api/order.api";
import { OrderResponse } from "../interfaces/responses/order-response.interface";

export const useClientOrders = (clientId: string | null | undefined) => {
  return useQuery<PaginatedResponse<OrderResponse>, Error>({
    queryKey: ["client-orders", clientId],
    queryFn: () => {
      if (!clientId) {
        throw new Error("clientId is required to fetch client orders");
      }

      return getClientOrders(clientId);
    },
    enabled: !!clientId,
    staleTime: 30 * 1000,
    retry: 2,
  });
};
