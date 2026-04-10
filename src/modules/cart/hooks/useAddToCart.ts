// hooks/useAddToCart.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "./useCartStore";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";

export function useAddToCart(productId: string, quantityInCart: number, productCommerceId?: string, productCommerceName?: string) {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [commerceConflictOpen, setCommerceConflictOpen] = useState(false);
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
    await doAddOrUpdate(qty);
    setOpen(false);
  }

  async function handleConflictConfirm() {
    await clearCart();
    await doAddOrUpdate(pendingQty ?? qty);
    setPendingQty(null);
    setCommerceConflictOpen(false);
  }

  async function doAddOrUpdate(quantity: number) {
    const currentCartItemId = getCartItemId(productId);
    if (currentCartItemId) {
      await updateItem(currentCartItemId, quantity);
    } else {
      await addItem(productId, quantity);
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
    await doAddOrUpdate(quantity);
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
    commerceConflictOpen,
    closeCommerceConflict: () => setCommerceConflictOpen(false),
    handleConflictConfirm,
    cartCommerceName,
    productCommerceName,
  };
}