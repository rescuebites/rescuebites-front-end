import { Dialog, IconButton, Box } from "@mui/material";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { useProductDetail } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import LoadingState from "@/shared/components/LoadingState";
import EmptyState from "@/shared/components/EmptyState";
import { ProductCategory } from "@/modules/products/enums/product-category.enum";
import { ProductCategoryDisplayName } from "@/modules/products/utils/category-mapping";
import { ProductDetailHeader } from "./ProductDetailHeader";
import { ProductDetailInfo } from "./ProductDetailInfo";
import { ProductDetailCommerce } from "./ProductDetailCommerce";
import { ProductDetailQuantity } from "./ProductDetailQuantity";
import { ProductDetailActions } from "./ProductDetailActions";
import { useCartStore } from "@/modules/cart/hooks/useCartStore";
import { useAddToCart } from "@/modules/cart/hooks/useAddToCart";
import { ConfirmModal } from "@/shared/components/ui/ConfirmModal";
import ClosedCommercePopup from "@/modules/cart/components/ClosedCommercePopup";

type DialogMode = "addToCart" | "viewOnly" | "edit";

interface ProductDetailDialogProps {
  open: boolean;
  onClose: () => void;
  productId: string | null;
  mode?: DialogMode;
  fixedQuantity?: number;
  onEdit?: () => void;
  hideCommerceInfo?: boolean;
}

export default function ProductDetailDialog({
  open,
  onClose,
  productId,
  mode = "addToCart",
  fixedQuantity,
  onEdit,
  hideCommerceInfo = false,
}: ProductDetailDialogProps) {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const { getQuantity } = useCartStore();
  const quantityInCart = productId ? getQuantity(productId) : 0;

  const { data: productDetail, isLoading } = useProductDetail(productId);
  const cart = useAddToCart(productId ?? "", quantityInCart, productDetail?.commerceId, productDetail?.commerceName);

  if (!open || !productId) {
    return null;
  }

  if (isLoading) {
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
        <LoadingState message="Cargando producto..." />
      </Dialog>
    );
  }

  if (!productDetail) {
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
        <EmptyState message="No se encontró el producto" />
      </Dialog>
    );
  }

  const handleGoToCommerce = () => {
    onClose(); 
    navigate(`/stores/${productDetail.commerceId}`, { replace: true });
  };

  const handleAddToCart = async () => {
    if (!productDetail) return;
    const added = await cart.handleAddWithQuantity(quantity);
    if (added) onClose();
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
      <ConfirmModal
        open={cart.loginModalOpen}
        title="Inicia sesión para continuar"
        description="Debes iniciar sesión para agregar productos al carrito."
        confirmText="Iniciar sesión"
        cancelText="Cancelar"
        onConfirm={cart.navigateToLogin}
        onCancel={cart.closeLoginModal}
      />
      <ConfirmModal
        open={cart.commerceConflictOpen}
        title="¿Cambiar comercio?"
        description={`Tu carrito tiene productos de ${cart.cartCommerceName ?? "otro comercio"}. Si continuás, se vaciará el carrito y se agregarán productos de ${cart.productCommerceName ?? "este comercio"}.`}
        confirmText="Vaciar y agregar"
        cancelText="Cancelar"
        variant="danger"
        onConfirm={async () => { await cart.handleConflictConfirm(); onClose(); }}
        onCancel={cart.closeCommerceConflict}
      />
      <ClosedCommercePopup
        open={cart.closedCommerceOpen}
        onClose={cart.closeClosedCommercePopup}
      />

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
          scrollbarWidth: "none", 
          msOverflowStyle: "none", 
          "&::-webkit-scrollbar": {
            display: "none", 
          },
        }}
      >
        {/* Imagen del producto */}
        <ProductDetailHeader
          images={productDetail.productImages?.map((img) => img.url) ?? []}
          discountPercentage={productDetail.discountPercentage}
        />

        {/* Contenido del producto */}
        <Box sx={{ px: 3, py: 3, pb: 2 }}>
          {/* Información del producto */}
          <ProductDetailInfo
            name={productDetail.name}
            description={productDetail.description}
            discountedPrice={productDetail.discountedPrice}
            originalPrice={productDetail.originalPrice}
            expirationDate={productDetail.expirationDate}
            stock={productDetail.stock}
            conditions={productDetail.conditions}
            categoryDisplayName={
              ProductCategoryDisplayName[
                productDetail.category as ProductCategory
              ]
            }
          />

          {/* Información del comercio (oculta en modo edición o cuando se solicita) */}
          {mode !== "edit" && !hideCommerceInfo && productDetail.commerceName && (
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
            quantity={mode === "viewOnly" ? fixedQuantity || 1 : quantity}
            onQuantityChange={setQuantity}
          />
        </Box>
      </Box>

      {/* Botón de acción según el modo */}
      <ProductDetailActions
        mode={mode}
        onAddToCart={handleAddToCart}
        onEdit={onEdit}
      />
    </Dialog>
  );
}
