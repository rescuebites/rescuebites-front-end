import { useState, useEffect } from "react";
import { useCartStore } from "./useCartStore";
import { createOrder } from "@/modules/orders/api/order.api";
import { createPaymentPreference } from "@/modules/orders/api/payment.api";
import { PaymentMethod } from "@/modules/orders/enums/payment-method.enum";
import type { CommerceCartSummary } from "../interfaces/responses/cart-response.interface";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";

export function useCart() {
  const clientId = useAuthStore((state) => state.clientId);
  const queryClient = useQueryClient();

  const {
    cart,
    fetchCart,
    updateItem,
    removeItem,
    clearCart,
    updatePaymentMethod,
  } = useCartStore();

  const [confirming, setConfirming] = useState(false);
  const [redirectingToMP, setRedirectingToMP] = useState(false);
  const [notes, setNotes] = useState("");
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);

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
        const order = await createOrder(clientId, commerce.commerceId, cart.selectedPaymentMethod, notes || undefined);

        // Log order for debugging before creating payment preference
        // eslint-disable-next-line no-console
        console.debug("createOrder response:", order);

        if (cart.selectedPaymentMethod === PaymentMethod.MERCADO_PAGO) {
          // indicate redirecting to the user (UI will show modal)
          setRedirectingToMP(true);

          // request preference and log response for debugging 400s
          try {
            const pref = await createPaymentPreference(order.orderId);
            // eslint-disable-next-line no-console
            console.debug("createPaymentPreference response:", pref);
            const { sandboxInitPoint, initPoint } = pref;
            const redirectTarget = sandboxInitPoint || initPoint;
            if (!redirectTarget) {
              setRedirectingToMP(false);
              throw new Error("No se recibió una URL válida de Mercado Pago.");
            }
            // don't clear UI state until redirect happens on the client;
            // backend already cleared the cart on order creation, so show modal instead
            window.location.href = redirectTarget;
            return;
          } catch (prefError) {
            // Log and handle error: stop redirecting so UI returns to cart
            // eslint-disable-next-line no-console
            console.error("createPaymentPreference failed:", prefError);
            setRedirectingToMP(false);
            throw prefError;
          }
        }

      await clearCart();
      queryClient.invalidateQueries({ queryKey: ["client-orders", clientId] });
      setCreatedOrderId(order.orderId);
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
    redirectingToMP,
    createdOrderId,
    notes,
    setNotes,
    subtotal: cart?.subtotal ?? 0,
    serviceFee: cart?.serviceFee ?? 0,
    total: cart?.total ?? 0,
    handleRemove,
    handleUpdateQuantity,
    handleChangePaymentMethod,
    handleConfirmOrder,
    handleClearCart: clearCart,
  };
}