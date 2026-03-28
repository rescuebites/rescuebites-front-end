import { useState } from "react";
import { useCartStore } from "../hooks/useCartStore";
import { useAddToCart } from "../hooks/useAddToCart";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";
import AddToCartPopup from "./AddToCartPopUp";
import { ConfirmModal } from "@/shared/components/ui/ConfirmModal";

interface AddToCartControlProps {
  productId: string;
  productName: string;
  unitPrice: number;
  availableStock: number;
  unit?: string;
  imageUrl?: string;
}

export default function AddToCartControl({
  productId,
  productName,
  unitPrice,
  availableStock,
  unit,
  imageUrl,
}: AddToCartControlProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const navigate = useNavigate();
  const { getQuantity } = useCartStore();
  const quantityInCart = getQuantity(productId);
  const cart = useAddToCart(productId, quantityInCart);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleAdd = () => {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
      return;
    }
    cart.handleOpenPopup();
  };

  return (
    <>
      <ConfirmModal
        open={loginModalOpen}
        title="Inicia sesión para continuar"
        description="Debes iniciar sesión para agregar productos al carrito."
        confirmText="Iniciar sesión"
        cancelText="Cancelar"
        onConfirm={() => navigate("/auth/login")}
        onCancel={() => setLoginModalOpen(false)}
      />
      <AddToCartButton
        inCart={cart.inCart}
        quantityInCart={quantityInCart}
        onAdd={handleAdd}
        onRemove={cart.handleRemove}
      />
      <AddToCartPopup
        open={cart.open}
        onClose={cart.closePopup}
        onConfirm={cart.handleConfirm}
        qty={cart.qty}
        onQtyChange={cart.setQty}
        inCart={cart.inCart}
        productName={productName}
        unitPrice={unitPrice}
        availableStock={availableStock}
        unit={unit}
        imageUrl={imageUrl}
      />
    </>
  );
}