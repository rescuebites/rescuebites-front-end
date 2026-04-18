import { useQuery } from "@tanstack/react-query";
import { getCommerceOrderDetail } from "../api/order.api";
import { OrderResponse } from "../interfaces/responses/order-response.interface";

export const useCommerceOrderDetail = (
  commerceId: string | undefined,
  orderId: string | undefined,
) => {
  return useQuery<OrderResponse, Error>({
    queryKey: ["commerce-order-detail", commerceId, orderId],
    queryFn: () => getCommerceOrderDetail(commerceId!, orderId!),
    enabled: !!commerceId && !!orderId,
    staleTime: 30 * 1000,
    retry: 2,
  });
};