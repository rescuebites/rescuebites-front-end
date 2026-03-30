import { PaymentMethod } from "../enums/payment-method.enum";

export const PaymentMethodDisplayName: Record<PaymentMethod, string> = {
  [PaymentMethod.CASH]: "Efectivo",
  [PaymentMethod.MERCADO_PAGO]: "Mercado Pago",
};
