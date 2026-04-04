import { httpClient } from "@/shared/lib/httpClient";

export interface PaymentLinkResponse {
  preferenceId: string;
  initPoint: string;
  sandboxInitPoint: string;
}

export const createPaymentPreference = async (orderId: string): Promise<PaymentLinkResponse> => {
  const { data } = await httpClient.post<PaymentLinkResponse>(
    `/api/v1/payments/orders/${orderId}/create-preference`
  );
  return data;
};
