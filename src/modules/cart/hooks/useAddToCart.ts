// hooks/useAddToCart.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "./useCartStore";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";

export function useAddToCart(productId: string, quantityInCart: number) {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const navigate = useNavigate();
  const { addItem, updateItem, removeItem, getCartItemId } = useCartStore();
  const cartItemId = getCartItemId(productId);
  const inCart = quantityInCart > 0;

  function handleOpenPopup() {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
      return;
    }
    setQty(quantityInCart > 0 ? quantityInCart : 1);
    setOpen(true);
  }

  async function handleConfirm() {
    if (cartItemId) {
      await updateItem(cartItemId, qty);
    } else {
      await addItem(productId, qty);
    }
    setOpen(false);
  }

  /** For consumers that manage their own quantity UI (e.g. ProductDetailDialog). */
  async function handleAddWithQuantity(quantity: number): Promise<boolean> {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
      return false;
    }
    if (cartItemId) {
      await updateItem(cartItemId, quantity);
    } else {
      await addItem(productId, quantity);
    }
    return true;
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
  };
}