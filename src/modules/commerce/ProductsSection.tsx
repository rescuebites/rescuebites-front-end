import { Box } from "@mui/material";
import { ProductCard } from "../catalog/components/ProductCard";
import type { ProductResponse } from "../products/interfaces/responses/product-response.interface";

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
