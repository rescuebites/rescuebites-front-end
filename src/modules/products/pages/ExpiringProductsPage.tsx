import { Box, Button, CircularProgress } from "@mui/material";
import FilterChip from "@/shared/components/ui/FilterChip";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useInfiniteProductsByExpiration } from "@/modules/commerce/hooks/useCommerceData";
import LoadingState from "@/shared/components/LoadingState";
import EmptyState from "@/shared/components/EmptyState";
import { ProductCard } from "@/modules/catalog/components/ProductCard";
import BackButton from "@/shared/components/ui/BackButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { ProductResponse } from "../interfaces/responses/product-response.interface";
import CustomTitle from "@/shared/components/CustomTitle";
import ProductDetailDialog from "@/modules/customer/home/components/ProductDetailDialog";
import { ProductExpirationFilter } from "../enums/product-expiration-filter.enum";

const FILTER_LABELS: Record<ProductExpirationFilter, string> = {
  ALL: "Todos",
  EXPIRING_SOON: "Por vencer (7 días)",
  CRITICAL: "Críticos (2 días)",
  EXPIRED: "Vencidos",
};

export default function ExpiringProductsPage() {
  const navigate = useNavigate();
  const commerceId = useAuthStore((state) => state.commerceId);
  const [selectedFilter, setSelectedFilter] = useState<ProductExpirationFilter>(
    ProductExpirationFilter.ALL,
  );
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteProductsByExpiration(commerceId, selectedFilter);

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedProductId(null);
  };

  const handleEditProduct = () => {
    if (selectedProductId) {
      navigate(`/commerce/products/${selectedProductId}/edit-product`);
      handleCloseDialog();
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  const products = data?.pages.flatMap((p) => p.content) ?? [];

  return (
    <Box sx={{ mt: 2, px: 2.5, maxWidth: 600, mx: "auto" }}>
      <Box sx={{ position: "relative", py: 2 }}>
        <BackButton
          sx={{ position: "absolute", left: 4, top: 4 }}
          onClick={() => navigate("/commerce", { replace: true })}
        />

        <CustomTitle
          text="Productos por Vencer"
          variant="h5"
          color="#2d2d2d"
          align="center"
        />
      </Box>

      {/* Filtros */}
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          overflowX: "auto",
          pb: 1,
          mb: 2,
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {(Object.keys(FILTER_LABELS) as ProductExpirationFilter[]).map(
          (filter) => {
            const isActive = selectedFilter === filter;
            return (
              <FilterChip
                key={filter}
                label={FILTER_LABELS[filter]}
                active={isActive}
                onClick={() => setSelectedFilter(filter)}
              />
            );
          },
        )}
      </Box>

      {products.length === 0 ? (
        <EmptyState message="No hay productos que coincidan con este filtro" />
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
            }}
          >
            {products.map((product: ProductResponse) => (
              <ProductCard
                key={product.productId}
                product={product}
                onClick={() => handleProductClick(product.productId)}
              />
            ))}
          </Box>

          {hasNextPage && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Button
                variant="outlined"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                sx={{
                  borderRadius: 8,
                  borderColor: "#77A787",
                  color: "#77A787",
                  px: 4,
                  "&:hover": {
                    borderColor: "#3E6A53",
                    color: "#3E6A53",
                    bgcolor: "transparent",
                  },
                }}
              >
                {isFetchingNextPage ? (
                  <CircularProgress size={20} sx={{ color: "#77A787" }} />
                ) : (
                  "Cargar más"
                )}
              </Button>
            </Box>
          )}
        </>
      )}

      <ProductDetailDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        productId={selectedProductId}
        mode="edit"
        onEdit={handleEditProduct}
      />
    </Box>
  );
}
