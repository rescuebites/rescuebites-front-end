import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ProductCard } from "../../catalog/components/ProductCard";
import type { ProductResponse } from "../../products/interfaces/responses/product-response.interface";
import EmptyState from "@/shared/components/EmptyState";
import ProductDetailDialog from "@/modules/customer/home/components/ProductDetailDialog";

interface Props {
  products: ProductResponse[];
}

export default function ProductsSection({ products }: Props) {
  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);

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
    }
  };

  if (products.length === 0) {
    return <EmptyState message="No hay productos para mostrar" />;
  }

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 2,
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            onClick={() => handleProductClick(product.productId)}
          />
        ))}
      </Box>

      <ProductDetailDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        productId={selectedProductId}
        mode="edit"
        onEdit={handleEditProduct}
      />
    </>
  );
}
