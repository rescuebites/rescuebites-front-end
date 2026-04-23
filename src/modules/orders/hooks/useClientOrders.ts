import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "@/modules/customer/home/interfaces/responses/paginated.response";
import { getClientOrders } from "../api/order.api";
import { OrderSummaryForClientResponse } from "../interfaces/responses/order-summary-client-response.interface";

export const useClientOrders = (clientId: string | null | undefined) => {
  return useQuery<PaginatedResponse<OrderSummaryForClientResponse>, Error>({
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
