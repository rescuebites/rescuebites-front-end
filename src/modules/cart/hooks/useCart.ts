import { useState, useEffect } from "react";
import { useCartStore } from "./useCartStore";
import { createOrder } from "@/modules/orders/api/order.api";
import { PaymentMethod } from "@/modules/orders/enums/payment-method.enum";
import type { CommerceCartSummary } from "../interfaces/responses/cart-response.interface";

const getClientId = () => "295a5546-bc99-4616-8e10-5bb9aabb1269";

export function useCart() {
  const {
    cart,
    fetchCart,
    updateItem,
    removeItem,
    clearCart,
    updatePaymentMethod,
    error,
    clearError,
  } = useCartStore();

  const [confirming, setConfirming] = useState(false);

  const commerceSummaries: CommerceCartSummary[] = Object.values(
    cart?.commerceSummaries ?? {}
  );
  const commerce = commerceSummaries[0];

  useEffect(() => {
    fetchCart();
  }, []);

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
    if (!cart?.selectedPaymentMethod || !commerce) return;
    setConfirming(true);
    try {
      await createOrder(getClientId()!, commerce.commerceId);
      await clearCart();
      // navigate("/orders");
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
    error,
    clearError,
  };
}