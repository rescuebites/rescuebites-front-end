import {
  Dialog, IconButton, Box, CircularProgress,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { useProductDetail } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { ProductCategory } from "@/modules/products/enums/product-category.enum";
import { ProductCategoryDisplayName } from "@/modules/products/utils/category-mapping";
import { ProductDetailHeader } from "./ProductDetailHeader";
import { ProductDetailInfo } from "./ProductDetailInfo";
import { ProductDetailCommerce } from "./ProductDetailCommerce";
import { ProductDetailQuantity } from "./ProductDetailQuantity";
import { ProductDetailActions } from "./ProductDetailActions";

type DialogMode = "addToCart" | "viewOnly" | "edit";

interface ProductDetailDialogProps {
  open: boolean;
  onClose: () => void;
  productId: string | null;
  mode?: DialogMode;
  fixedQuantity?: number;
  onEdit?: () => void;
}

export default function ProductDetailDialog({
  open,
  onClose,
  productId,
  mode = "addToCart",
  fixedQuantity,
  onEdit,
}: ProductDetailDialogProps) {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const { data: productDetail, isLoading } = useProductDetail(productId);

  if (!open || !productId) {
    return null;
  }

  // Mostrar loading mientras se carga el detalle
  if (isLoading || !productDetail) {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            bgcolor: "#FFFFFF",
          },
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center" py={8}>
          <CircularProgress sx={{ color: "#5FB574" }} />
        </Box>
      </Dialog>
    );
  }

  const handleGoToCommerce = () => {
    onClose(); 
    navigate(`/customer/stores/${productDetail.commerceId}`, { replace: true });
  };

  const handleEditProduct = () => {
    onClose();
    navigate(`/create-product?productId=${productId}`, { replace: true });
  };

  const handleAddToCart = () => {
    console.log("Agregar al carrito:", {
      productId: productDetail.productId,
      quantity,
      price: productDetail.discountedPrice,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          maxHeight: "95vh",
          bgcolor: "#FFFFFF",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      }}
    >
      {/* Botón cerrar */}
      <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
        <IconButton
          onClick={onClose}
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            "&:hover": { bgcolor: "rgba(255, 255, 255, 1)" },
          }}
        >
          <MdClose size={24} />
        </IconButton>
      </Box>

      {/* Contenedor scrolleable*/}
    <Box
      sx={{
        flex: 1,
        overflow: "auto",
        paddingBottom: mode !== "viewOnly" ? "88px" : "16px",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      }}
    >
        {/* Imagen del producto */}
        <ProductDetailHeader
          imageUrl={productDetail.productImages?.[0]?.url}
          discountPercentage={productDetail.discountPercentage}
        />

        {/* Contenido del producto */}
        <Box sx={{ px: 3, py: 3, pb: 3 }}>
          {/* Información del producto */}
          <ProductDetailInfo
            name={productDetail.name}
            description={productDetail.description}
            discountedPrice={productDetail.discountedPrice}
            originalPrice={productDetail.originalPrice}
            expirationDate={productDetail.expirationDate}
            stock={productDetail.stock}
            condition={productDetail.condition}
            conditionDisplayName={productDetail.conditionDisplayName}
            categoryDisplayName={ProductCategoryDisplayName[productDetail.category as ProductCategory]}
          />

          {/* Información del comercio */}
          {productDetail.commerceName && (
            <ProductDetailCommerce
              commerceName={productDetail.commerceName}
              commerceOpeningHours={productDetail.commerceOpeningHours}
              commerceImages={productDetail.commerceImages}
              onCommerceClick={handleGoToCommerce}
            />
          )}

          {/* Control de cantidad */}
          <ProductDetailQuantity
            mode={mode}
            stock={productDetail.stock}
            quantity={mode === "viewOnly" ? (fixedQuantity || 1) : quantity}
            onQuantityChange={setQuantity}
          />
        </Box>
      </Box>

      {/* Botón de acción según el modo */}
      <ProductDetailActions
        mode={mode}
        onAddToCart={handleAddToCart}
        onEdit={onEdit || handleEditProduct}
      />
    </Dialog>
  );
}