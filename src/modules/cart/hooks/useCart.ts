import { useState, useEffect } from "react";
import { useCartStore } from "./useCartStore";
import { createOrder } from "@/modules/orders/api/order.api";
import { createPaymentPreference } from "@/modules/orders/api/payment.api";
import { PaymentMethod } from "@/modules/orders/enums/payment-method.enum";
import type { CommerceCartSummary } from "../interfaces/responses/cart-response.interface";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";

export function useCart() {
  const clientId = useAuthStore((state) => state.clientId);

  const {
    cart,
    fetchCart,
    updateItem,
    removeItem,
    clearCart,
    updatePaymentMethod,
  } = useCartStore();

  const [confirming, setConfirming] = useState(false);

  const commerceSummaries: CommerceCartSummary[] = Object.values(
    cart?.commerceSummaries ?? {}
  );
  const commerce = commerceSummaries[0];

  useEffect(() => {
    if (!clientId) return;
    fetchCart();
  }, [clientId, fetchCart]);

  const handleRemove = async (cartItemId: string) => {
    await removeItem(cartItemId);
  };

  const handleUpdateQuantity = async (cartItemId: string, quantity: number) => {
    await updateItem(cartItemId, quantity);
  };

  const handleChangePaymentMethod = async () => {
    const next =
      cart?.selectedPaymentMethod === PaymentMethod.CASH
        ? PaymentMethod.MERCADO_PAGO
        : PaymentMethod.CASH;
    await updatePaymentMethod(next);
  };

  const handleConfirmOrder = async () => {
    if (!cart?.selectedPaymentMethod || !commerce || !clientId) return;
    setConfirming(true);
    try {
      const order = await createOrder(clientId, commerce.commerceId);
      await clearCart();

      if (cart.selectedPaymentMethod === PaymentMethod.MERCADO_PAGO) {
        const { sandboxInitPoint } = await createPaymentPreference(order.orderId);
        window.location.href = sandboxInitPoint;
      }
    } catch (error) {
      console.error("Error al confirmar pedido:", error);
    } finally {
      setConfirming(false);
    }
  };

  return {
    cart,
    commerce,
    confirming,
    subtotal: cart?.subtotal ?? 0,
    serviceFee: cart?.serviceFee ?? 0,
    total: cart?.total ?? 0,
    handleRemove,
    handleUpdateQuantity,
    handleChangePaymentMethod,
    handleConfirmOrder,
  };
}