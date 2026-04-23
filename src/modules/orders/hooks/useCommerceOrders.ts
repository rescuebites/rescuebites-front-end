import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "@/modules/customer/home/interfaces/responses/paginated.response";
import { getCommerceOrders } from "../api/order.api";
import { OrderSummaryForCommerceResponse } from "../interfaces/responses/order-summary-commerce-response.interface";

export const useCommerceOrders = (commerceId: string | null | undefined) => {
  return useQuery<PaginatedResponse<OrderSummaryForCommerceResponse>, Error>({
    queryKey: ["commerce-orders", commerceId],
    queryFn: () => {
      if (!commerceId) {
        throw new Error("commerceId is required to fetch commerce orders");
      }

      return getCommerceOrders(commerceId);
    },
    enabled: !!commerceId,
    staleTime: 30 * 1000,
    retry: 2,
  });
};
