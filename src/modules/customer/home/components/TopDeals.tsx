import { Box, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { useProductsByCommerceType } from "../hooks/useProducts";
import { useCommerceTypeStore } from "../hooks/useCommerceTypeStore";
import { useFilterStore } from "@/modules/filterPanel/hooks/useFilterStore";
import type { ProductResponse } from "@/modules/products/interfaces/responses/product-response.interface";
import ProductDetailDialog from "./ProductDetailDialog";
import { ProductCard } from "../../../catalog/components/ProductCard";

export default function TopDeals() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  const selectedCommerceType = useCommerceTypeStore(
    (state) => state.selectedCommerceType,
  );
  const categories = useFilterStore((state) => state.categories);
  const {
    data: products,
    isLoading,
    isFetching,
  } = useProductsByCommerceType(selectedCommerceType, 12); //obtiene los productos filtrados por categoría, si no hay categoría seleccionada, obtiene los top deals

  const handleDealClick = (product: ProductResponse) => {
    setSelectedProductId(product.productId);
  };

  const handleCloseDialog = () => {
    setSelectedProductId(null);
  };

  // Manejo de loading
  if (isLoading || isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={8}>
        <CircularProgress sx={{ color: "#77A787" }} />
      </Box>
    );
  }

  // Manejo de sin productos
  if (!products || products.length === 0) {
    const isFiltering = !!selectedCommerceType || categories.length > 0;

    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6" sx={{ color: "#2D2D2D", mb: 1 }}>
          {isFiltering
            ? "No hay productos disponibles para los filtros seleccionados"
            : "No hay productos disponibles"}
        </Typography>
        {isFiltering && (
          <Typography variant="body2" sx={{ color: "#9E9E9E" }}>
            Probá con otros filtros o limpiá la selección
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          pt: 1,
          display: "grid",
          gap: { xs: 2, sm: 2.5, md: 3 },
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
            xl: "repeat(6, 1fr)",
          },
          maxWidth: "100%",
        }}
      >
        {products?.map((product: ProductResponse) => (
          <ProductCard
            key={product.productId}
            product={product}
            onClick={() => handleDealClick(product)}
          />
        ))}
      </Box>

      <ProductDetailDialog
        open={selectedProductId !== null}
        onClose={handleCloseDialog}
        productId={selectedProductId}
      />
    </>
  );
}
