import { httpClient } from "@/shared/lib/httpClient";

export interface PaymentLinkResponse {
  preferenceId: string;
  initPoint: string;
  sandboxInitPoint: string;
}

export const createPaymentPreference = async (orderId: string): Promise<PaymentLinkResponse> => {
  const origin = window.location.origin;

  try {
    const payload = { frontendBaseUrl: origin };
    const { data } = await httpClient.post<PaymentLinkResponse>(
      `/api/v1/payments/orders/${orderId}/create-preference`,
      payload,
      { params: { frontendBaseUrl: origin } }
    );
    return data;
  } catch (error) {
    // Loguear respuesta para debugging
    // eslint-disable-next-line no-console
    const resp = (error as any)?.response;
    console.error(
      "createPaymentPreference error for orderId=",
      orderId,
      "status=",
      resp?.status,
      "data=",
      resp?.data
    );

    // Si MercadoPago indica "invalid_auto_return" o que falta back_url.success,
    // reintentar sin enviar frontendBaseUrl (usar URLs por defecto del servidor).
    const respDataStr = JSON.stringify(resp?.data ?? "");
    const indicatesMissingBackUrl = respDataStr.includes("invalid_auto_return") || respDataStr.includes("back_url.success");

    if (indicatesMissingBackUrl) {
      // eslint-disable-next-line no-console
      console.warn("Retrying createPaymentPreference without frontendBaseUrl due to invalid_auto_return");
      try {
        const { data } = await httpClient.post<PaymentLinkResponse>(
          `/api/v1/payments/orders/${orderId}/create-preference`
        );
        return data;
      } catch (retryError) {
        // eslint-disable-next-line no-console
        console.error("Retry without frontendBaseUrl failed:", retryError);
        throw retryError;
      }
    }

    throw error;
  }
};
