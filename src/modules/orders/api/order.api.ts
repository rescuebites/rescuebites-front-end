import { httpClient } from "@/shared/lib/httpClient";
import { OrderResponse } from "../interfaces/responses/order-response.interface";

export const getOrderDetail = async (clientId: string, orderId: string): Promise<OrderResponse> => {
  const { data } = await httpClient.get<OrderResponse>(
    `/api/v1/clients/${clientId}/orders/${orderId}`
  );
  return data;
};

export const cancelOrder = async (
  clientId: string,
  orderId: string,
  reason: string
): Promise<OrderResponse> => {
  const { data } = await httpClient.patch<OrderResponse>(
    `/api/v1/clients/${clientId}/orders/${orderId}/cancel`,
    null,
    {
      params: { reason },
    }
  );
  return data;
};
