import { httpClient } from "@/shared/lib/httpClient";
import { PaginatedResponse } from "@/modules/customer/home/interfaces/responses";
import { OrderResponse } from "../interfaces/responses/order-response.interface";

export const getClientOrders = async (
  clientId: string,
  page = 0,
  size = 20
): Promise<PaginatedResponse<OrderResponse>> => {
  const { data } = await httpClient.get<PaginatedResponse<OrderResponse>>(
    `/api/v1/clients/${clientId}/orders`,
    { params: { page, size, sort: "createdAt,desc" } }
  );
  return data;
};

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

export const createOrder = async (
  clientId: string,
  commerceId: string,
  notes?: string
): Promise<OrderResponse> => {
  const { data } = await httpClient.post<OrderResponse>(
    `/api/v1/clients/${clientId}/orders`,
    { commerceId, notes }
  );
  return data;
};
