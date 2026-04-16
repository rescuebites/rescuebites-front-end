// hooks/useAddToCart.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "./useCartStore";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { AxiosError } from "axios";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";

function isClosedForDayError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    const detail: string | undefined = error.response?.data?.detail;
    return !!detail && detail.includes("cerrado por hoy");
  }
  return false;
}

export function useAddToCart(productId: string, quantityInCart: number, productCommerceId?: string, productCommerceName?: string) {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [commerceConflictOpen, setCommerceConflictOpen] = useState(false);
  const [closedCommerceOpen, setClosedCommerceOpen] = useState(false);
  const [pendingQty, setPendingQty] = useState<number | null>(null);

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const navigate = useNavigate();
  const { addItem, updateItem, removeItem, getCartItemId, clearCart, cart } = useCartStore();
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
    setQty(quantityInCart > 0 ? quantityInCart : 1);
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
    await clearCart();
    const success = await doAddOrUpdate(pendingQty ?? qty);
    setPendingQty(null);
    if (success) setCommerceConflictOpen(false);
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
    open, qty, inCart, cartItemId,
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
  };
}