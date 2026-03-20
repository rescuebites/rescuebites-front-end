import { useQuery } from "@tanstack/react-query";
import { getOrderDetail } from "../api/order.api";
import { OrderResponse } from "../interfaces/responses/order-response.interface";

export const useOrderDetail = (
  clientId: string | undefined,
  orderId: string | undefined,
) => {
  return useQuery<OrderResponse, Error>({
    queryKey: ["order-detail", clientId, orderId],
    queryFn: () => getOrderDetail(clientId!, orderId!),
    enabled: !!clientId && !!orderId,
    staleTime: 30 * 1000,
    retry: 2,
  });
};
