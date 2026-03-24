import { useCartStore } from "../hooks/useCartStore";
import { useAddToCart } from "../hooks/useAddToCart";
import AddToCartButton from "./AddToCartButton";
import AddToCartPopup from "./AddToCartPopUp";

interface AddToCartControlProps {
  productId: string;
  productName: string;
  unitPrice: number;
  availableStock: number;
  unit?: string;
  image?: React.ReactNode;
}

export default function AddToCartControl({
  productId,
  productName,
  unitPrice,
  availableStock,
  unit,
  image,
}: AddToCartControlProps) {
  const { getQuantity } = useCartStore();
  const quantityInCart = getQuantity(productId);
  const cart = useAddToCart(productId, quantityInCart);

  return (
    <>
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
        image={image}
      />
    </>
  );
}