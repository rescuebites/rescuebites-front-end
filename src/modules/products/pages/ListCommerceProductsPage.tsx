import { Box } from "@mui/material";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useProductsByStock } from "@/modules/products/hooks/useProductsByStock";
import LoadingState from "@/shared/components/LoadingState";
import EmptyState from "@/shared/components/EmptyState";
import { ProductCard } from "@/modules/catalog/components/ProductCard";
import { useNavigate } from "react-router-dom";
import BackButton from "@/shared/components/ui/BackButton";
import { useState } from "react";
import type { ProductResponse } from "../interfaces/responses/product-response.interface";
import CustomTitle from "@/shared/components/CustomTitle";
import ProductDetailDialog from "@/modules/customer/home/components/ProductDetailDialog";

export default function ListCommerceProductsPage() {
  const navigate = useNavigate();
  const commerceId = useAuthStore((state) => state.commerceId);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data, isLoading } = useProductsByStock(commerceId);

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
    <Box sx={{ px: 2.5, maxWidth: 600, mx: "auto", py: 2 }}>
      <Box sx={{ position: "relative", py: 2 }}>
        <BackButton
          sx={{ position: "absolute", left: 4, top: 4 }}
          onClick={() => navigate("/commerce", { replace: true })}
        />
        <CustomTitle text="Mis Productos" variant="h5" color="#2d2d2d" align="center" />
      </Box>

      {products.length === 0 ? (
        <EmptyState message="No hay productos disponibles" />
      ) : (
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
