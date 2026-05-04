// hooks/useAddToCart.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "./useCartStore";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { AxiosError } from "axios";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import type { BusinessHoursResponse } from "@/modules/commerce/interfaces/responses/business-hours.response";
import {
  isCommerceCurrentlyClosed,
  willCommerceReopenToday,
} from "@/modules/customer/home/utils/commerceStatus";

function isClosedForDayError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    const detail: string | undefined = error.response?.data?.detail;
    return !!detail && detail.includes("cerrado por hoy");
  }
  return false;
}

export function useAddToCart(
  productId: string,
  quantityInCart: number,
  productCommerceId?: string,
  productCommerceName?: string,
  businessHours?: BusinessHoursResponse[],
) {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [commerceConflictOpen, setCommerceConflictOpen] = useState(false);
  const [closedCommerceOpen, setClosedCommerceOpen] = useState(false);
  const [closedReopensOpen, setClosedReopensOpen] = useState(false);
  const [pendingQty, setPendingQty] = useState<number | null>(null);

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const navigate = useNavigate();
  const {
    addItem,
    updateItem,
    removeItem,
    getCartItemId,
    clearCart,
    fetchCart,
    cart,
  } = useCartStore();
  const cartItemId = getCartItemId(productId);
  const inCart = quantityInCart > 0;

  const cartCommerceId = Object.keys(cart?.commerceSummaries ?? {})[0];
  const cartCommerceName = cartCommerceId
    ? cart?.commerceSummaries[cartCommerceId]?.commerceName
    : undefined;

  function hasCommerceConflict() {
    return (
      !!productCommerceId &&
      !!cartCommerceId &&
      cartCommerceId !== productCommerceId
    );
  }

  function handleOpenPopup() {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
      return;
    }
    if (businessHours && isCommerceCurrentlyClosed(businessHours)) {
      if (willCommerceReopenToday(businessHours)) {
        setQty(quantityInCart > 0 ? quantityInCart : 1);
        setClosedReopensOpen(true);
      } else {
        setClosedCommerceOpen(true);
      }
      return;
    }
    setQty(quantityInCart > 0 ? quantityInCart : 1);
    setOpen(true);
  }

  function handleReopensConfirm() {
    setClosedReopensOpen(false);
    setOpen(true);
  }

  async function handleConfirm() {
    if (hasCommerceConflict()) {
      setPendingQty(qty);
      setOpen(false);
      setCommerceConflictOpen(true);
      return;
    }
    const success = await doAddOrUpdate(qty);
    if (success) setOpen(false);
  }

  async function handleConflictConfirm() {
    const quantity = pendingQty ?? qty;
    setPendingQty(null);

    // Attempt the add BEFORE clearing. The backend validates commerce availability
    // first, so if commerce2 is closed the error is thrown immediately and the
    // commerce1 cart remains intact. doAddOrUpdate will open the closed-commerce
    // popup and return false in that case.
    const success = await doAddOrUpdate(quantity);
    if (!success) return;

    // Commerce2 is open. Clear then re-add for a clean cart.
    try {
      await clearCart();
      const readded = await doAddOrUpdate(quantity);
      if (!readded) {
        // doAddOrUpdate already handled the error (e.g. opened closedCommercePopup).
        // Cart is now empty — sync UI state.
        await fetchCart();
        return;
      }
      setCommerceConflictOpen(false);
    } catch {
      // clearCart or an unexpected network error — sync cart state and inform the user.
      await fetchCart();
      useSnackbarStore
        .getState()
        .showMessage(
          "No se pudo actualizar el carrito. Por favor, inténtalo de nuevo.",
          "error",
        );
    }
  }

  async function doAddOrUpdate(quantity: number): Promise<boolean> {
    const currentCartItemId = getCartItemId(productId);
    try {
      if (currentCartItemId) {
        await updateItem(currentCartItemId, quantity);
      } else {
        await addItem(productId, quantity);
      }
      return true;
    } catch (error: unknown) {
      if (isClosedForDayError(error)) {
        useSnackbarStore.getState().close();
        setOpen(false);
        setCommerceConflictOpen(false);
        setClosedCommerceOpen(true);
      }
      return false;
    }
  }

  /** For consumers that manage their own quantity UI (ej ProductDetailDialog). */
  async function handleAddWithQuantity(quantity: number): Promise<boolean> {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
      return false;
    }
    if (businessHours && isCommerceCurrentlyClosed(businessHours)) {
      if (willCommerceReopenToday(businessHours)) {
        setPendingQty(quantity);
        setClosedReopensOpen(true);
      } else {
        setClosedCommerceOpen(true);
      }
      return false;
    }
    if (hasCommerceConflict()) {
      setPendingQty(quantity);
      setCommerceConflictOpen(true);
      return false;
    }
    return await doAddOrUpdate(quantity);
  }

  async function handleRemove() {
    if (!cartItemId) return;
    await removeItem(cartItemId);
  }

  return {
    open,
    qty,
    inCart,
    cartItemId,
    setQty,
    handleOpenPopup,
    handleConfirm,
    handleRemove,
    handleAddWithQuantity,
    closePopup: () => setOpen(false),
    loginModalOpen,
    closeLoginModal: () => setLoginModalOpen(false),
    navigateToLogin: () => navigate("/auth/login"),
    commerceConflictOpen,
    closeCommerceConflict: () => setCommerceConflictOpen(false),
    handleConflictConfirm,
    cartCommerceName,
    productCommerceName,
    closedCommerceOpen,
    closeClosedCommercePopup: () => setClosedCommerceOpen(false),
    closedReopensOpen,
    closeClosedReopensPopup: () => setClosedReopensOpen(false),
    handleReopensConfirm,
  };
}
