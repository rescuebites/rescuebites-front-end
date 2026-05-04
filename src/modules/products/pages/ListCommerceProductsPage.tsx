import { Box, Button, CircularProgress } from "@mui/material";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useInfiniteProductsByStock } from "@/modules/products/hooks/useProductsByStock";
import { StockFilter } from "@/modules/products/api/products.api";
import LoadingState from "@/shared/components/LoadingState";
import EmptyState from "@/shared/components/EmptyState";
import { ProductCard } from "@/modules/catalog/components/ProductCard";
import { useNavigate } from "react-router-dom";
import BackButton from "@/shared/components/ui/BackButton";
import { useState } from "react";
import type { ProductResponse } from "../interfaces/responses/product-response.interface";
import CustomTitle from "@/shared/components/CustomTitle";
import ProductDetailDialog from "@/modules/customer/home/components/ProductDetailDialog";
import FilterChip from "@/shared/components/ui/FilterChip";

const STOCK_FILTERS: { value: StockFilter; label: string }[] = [
  { value: "ALL", label: "Todos" },
  { value: "IN_STOCK", label: "Con stock" },
  { value: "OUT_OF_STOCK", label: "Sin stock" },
];

export default function ListCommerceProductsPage() {
  const navigate = useNavigate();
  const commerceId = useAuthStore((state) => state.commerceId);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [stockFilter, setStockFilter] = useState<StockFilter>("ALL");

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteProductsByStock(commerceId, 20, stockFilter);

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
    <Box sx={{ px: 2.5, maxWidth: 600, mx: "auto", py: 2 }}>
      <Box sx={{ position: "relative", py: 2 }}>
        <BackButton
          sx={{ position: "absolute", left: 4, top: 15 }}
          onClick={() => navigate("/commerce", { replace: true })}
        />
        <CustomTitle
          text="Gestión de Productos"
          variant="h5"
          color="#2d2d2d"
          align="center"
        />
        <CustomTitle
          text="Visualiza y edita los productos de tu catálogo"
          variant="body2"
          align="center"
          color="#6d6d6d"
          fontWeight={400}
          sx={{ mt: -1 }}
        />
      </Box>

      {/* Filtros de stock */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          mb: 3,
          justifyContent: "center",
        }}
      >
        {STOCK_FILTERS.map((f) => (
          <FilterChip
            key={f.value}
            label={f.label}
            active={stockFilter === f.value}
            onClick={() => setStockFilter(f.value)}
          />
        ))}
      </Box>

      {products.length === 0 ? (
        <EmptyState message="No hay productos para mostrar" />
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
              mt: 2,
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
