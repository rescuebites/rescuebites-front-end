// hooks/useAddToCart.ts
import { useState } from "react";
import { useCartStore } from "./useCartStore";

export function useAddToCart(productId: string, quantityInCart: number) {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);

  const { addItem, updateItem, removeItem, getCartItemId } = useCartStore();
  const cartItemId = getCartItemId(productId);
  const inCart = quantityInCart > 0;

  function handleOpenPopup() {
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
    closePopup: () => setOpen(false),
  };
}