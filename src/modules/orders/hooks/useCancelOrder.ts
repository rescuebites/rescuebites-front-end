import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "../api/order.api";
import { OrderResponse } from "../interfaces/responses/order-response.interface";

interface CancelOrderParams {
  clientId: string;
  orderId: string;
  reason: string;
}

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<OrderResponse, Error, CancelOrderParams>({
    mutationFn: ({ clientId, orderId, reason }) =>
      cancelOrder(clientId, orderId, reason),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["order-detail", variables.clientId, variables.orderId],
      });
    },
  });
};
