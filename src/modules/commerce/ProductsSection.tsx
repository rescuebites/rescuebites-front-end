import { Box } from "@mui/material";
import { ProductCard } from "../customer/home/components/ProductCard";
import type { ProductResponse } from "../customer/home/interfaces/responses";
interface Props {
  products: ProductResponse[];
}

export default function ProductsSection({ products }: Props) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 2,
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.commerceId}
          product={product}
          onClick={() => {}}
        />
      ))}
    </Box>
  );
}
