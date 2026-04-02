import { PaymentMethod } from "@/modules/orders/enums/payment-method.enum";
import { httpClient } from "@/shared/lib/httpClient";

const BASE = (clientId: string) => `/api/v1/clients/${clientId}/cart`;

export const cartApi = {
  getCart: (clientId: string) =>
    httpClient.get(BASE(clientId)).then((r) => r.data),

  addToCart: (clientId: string, productId: string, quantity: number) =>
    httpClient.post(`${BASE(clientId)}/items`, { productId, quantity }).then((r) => r.data),

  updateItem: (clientId: string, cartItemId: string, quantity: number) =>
    httpClient.patch(`${BASE(clientId)}/items/${cartItemId}`, { quantity }).then((r) => r.data),

  removeItem: (clientId: string, cartItemId: string) =>
    httpClient.delete(`${BASE(clientId)}/items/${cartItemId}`),

  clearCart: (clientId: string) =>
    httpClient.delete(BASE(clientId)),

  updatePaymentMethod: (clientId: string, paymentMethod: PaymentMethod) =>
    httpClient.patch(`${BASE(clientId)}/payment-method`, { paymentMethod }).then((r) => r.data),
};