import { useCartStore } from "../hooks/useCartStore";
import { useAddToCart } from "../hooks/useAddToCart";
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
  commerceId?: string;
  commerceName?: string;
}

export default function AddToCartControl({
  productId,
  productName,
  unitPrice,
  availableStock,
  unit,
  imageUrl,
  commerceId,
  commerceName,
}: AddToCartControlProps) {
  const { getQuantity } = useCartStore();
  const quantityInCart = getQuantity(productId);
  const cart = useAddToCart(productId, quantityInCart, commerceId, commerceName);

  return (
    <>
      <ConfirmModal
        open={cart.loginModalOpen}
        title="Inicia sesión para continuar"
        description="Debes iniciar sesión para agregar productos al carrito."
        confirmText="Iniciar sesión"
        cancelText="Cancelar"
        onConfirm={cart.navigateToLogin}
        onCancel={cart.closeLoginModal}
      />
      <ConfirmModal
        open={cart.commerceConflictOpen}
        title="¿Cambiar comercio?"
        description={`Tu carrito tiene productos de ${cart.cartCommerceName ?? "otro comercio"}. Si continuás, se vaciará el carrito y se agregarán productos de ${cart.productCommerceName ?? "este comercio"}.`}
        confirmText="Vaciar y agregar"
        cancelText="Cancelar"
        onConfirm={cart.handleConflictConfirm}
        onCancel={cart.closeCommerceConflict}
      />
      <AddToCartButton
        inCart={cart.inCart}
        quantityInCart={quantityInCart}
        onAdd={cart.handleOpenPopup}
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