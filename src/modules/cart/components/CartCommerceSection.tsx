import { Stack, Box } from "@mui/material";
import CommerceInfoCard from "@/shared/components/CommerceInfoCard";
import CustomTitle from "@/shared/components/CustomTitle";
import CartProductCard from "./CartProductCard";
import type { CommerceCartSummary } from "../interfaces/responses/cart-response.interface";

interface Props {
  commerce: CommerceCartSummary;
  onRemove: (cartItemId: string) => void;
  onQuantityChange: (cartItemId: string, quantity: number) => void;
  onCommerceClick?: () => void;
  onProductClick?: (productId: string) => void;
}

export default function CartCommerceSection({
  commerce,
  onRemove,
  onQuantityChange,
  onCommerceClick,
  onProductClick,
}: Props) {
  return (
    <>
      <Stack spacing={1.5} sx={{ mb: 3 }}>
        {commerce.items.map((item) => (
          <CartProductCard
            key={item.cartItemId}
            item={item}
            onRemove={onRemove}
            onQuantityChange={onQuantityChange}
            onProductClick={onProductClick}
          />
        ))}
      </Stack>

      <CustomTitle text="Comercio" color="#2d2d2d" variant="h5" align="left" />
      <Box sx={{ mb: 2 }}>
        <CommerceInfoCard
          commerceName={commerce.commerceName}
          commerceAddress={commerce.address}
          onClick={onCommerceClick}
          commerceLocality={commerce.commerceLocality}
          commerceTypes={commerce.commerceTypes}
          commerceImages={commerce.commerceImages}
        />
      </Box>
    </>
  );
}
