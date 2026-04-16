import { Box, Chip } from "@mui/material";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useCommerceProductsByExpiration } from "@/modules/commerce/hooks/useCommerceData";
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
  const [selectedFilter, setSelectedFilter] = useState<ProductExpirationFilter>(ProductExpirationFilter.ALL);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data, isLoading } = useCommerceProductsByExpiration(
    commerceId,
    selectedFilter,
  );

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

  const products = data?.content || [];

  return (
    <Box sx={{ px: 2.5, maxWidth: 600, mx: "auto" }}>
      <Box sx={{ position: "relative", py: 2 }}>
        <BackButton
          sx={{ position: "absolute", left: 4, top: 4 }}
          onClick={() => navigate("/commerce", { replace: true })}
        />

        <CustomTitle text="Productos por Vencer" />
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
        {(Object.keys(FILTER_LABELS) as ProductExpirationFilter[]).map((filter) => (
          <Chip
            key={filter}
            label={FILTER_LABELS[filter]}
            onClick={() => setSelectedFilter(filter)}
            sx={{
              flexShrink: 0,
              px: 2.5,
              py: 1,
              height: "36px",
              borderRadius: "20px",
              fontSize: "19px",
              fontWeight: 500,
              border: "none",
              backgroundColor:
                selectedFilter === filter ? "#77A787" : "#fdfcfc",
              color: selectedFilter === filter ? "#FFFFFF" : "#666666",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor:
                  selectedFilter === filter ? "#5a8f6a" : "#E8E8E8",
              },
            }}
          />
        ))}
      </Box>

      {products.length === 0 ? (
        <EmptyState message="No hay productos que coincidan con este filtro" />
      ) : (
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
