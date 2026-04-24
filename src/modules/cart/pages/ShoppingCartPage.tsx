import React, { useState } from "react";
import { Box, Typography, Container, Button, Dialog, DialogTitle, DialogContent, DialogContentText, CircularProgress, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BackButton from "@/shared/components/ui/BackButton";
import CustomTitle from "@/shared/components/CustomTitle";
import CartCommerceSection from "../components/CartCommerceSection";
import PaymentDetail from "../components/PaymentDetails";
import { useCart } from "../hooks/useCart";
import { ConfirmModal } from "@/shared/components/ui/ConfirmModal";
import OrderSuccessPage from "@/shared/pages/OrderSuccessPage";
import ProductDetailDialog from "@/modules/customer/home/components/ProductDetailDialog";
import { fieldSx } from "@/shared/styles/fieldSx";

const CartPage: React.FC = () => {
  const {
    cart,
    commerce,
    confirming,
    redirectingToMP,
    createdOrderId,
    notes,
    setNotes,
    handleRemove,
    handleUpdateQuantity,
    handleChangePaymentMethod,
    handleConfirmOrder,
    handleClearCart,
  } = useCart();

  const navigate = useNavigate();
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [selectedProductQuantity, setSelectedProductQuantity] =
    useState<number>(1);
  const [productDialogOpen, setProductDialogOpen] = useState(false);

  const handleProductClick = (productId: string) => {
    const item = commerce?.items.find((i) => i.productId === productId);
    setSelectedProductId(productId);
    setSelectedProductQuantity(item?.quantity ?? 1);
    setProductDialogOpen(true);
  };

  if (createdOrderId) {
    return <OrderSuccessPage orderId={createdOrderId} />;
  }

  return (
    <Box
      sx={{
        backgroundColor: "#FAFAFA",
        px: { xs: 2, sm: 5, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        {/* Diálogo de redirección a Mercado Pago (estilo consistente con ConfirmModal/LoadingState) */}
        <Dialog
          open={redirectingToMP}
          aria-labelledby="redirecting-dialog-full"
          PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
        >
          <DialogTitle id="redirecting-dialog-full" sx={{ fontWeight: 600, color: "#2D2D2D" }}>
            Redirigiendo a Mercado Pago
          </DialogTitle>

          <DialogContent sx={{ display: "flex", alignItems: "center", gap: 2, py: 3 }}>
            <CircularProgress sx={{ color: "#5A9A6E" }} />
            <DialogContentText sx={{ color: "#6B7280" }}>
              Estamos redirigiéndote al checkout de Mercado Pago...
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <Box
          display="grid"
          gridTemplateColumns="auto 1fr auto"
          alignItems="center"
          sx={{ mb: 2, mt: { xs: 2, sm: 3 } }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <BackButton />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {commerce && (
              <CustomTitle
                text="Mi carrito"
                color="#2d2d2d"
                variant="h4"
                align="center"
              />
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {commerce && (
              <Button
                onClick={() => setClearDialogOpen(true)}
                sx={{
                  color: "#77a77c",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: { xs: 14, sm: 16 },
                }}
              >
                Vaciar carrito
              </Button>
            )}
          </Box>
        </Box>

        {commerce && (
          <ConfirmModal
            open={clearDialogOpen}
            title="¿Vaciar el carrito?"
            description="Se eliminarán todos los productos del carrito."
            confirmText="Vaciar"
            variant="danger"
            onConfirm={async () => {
              setClearDialogOpen(false);
              await handleClearCart();
            }}
            onCancel={() => setClearDialogOpen(false)}
          />
        )}

        {!commerce ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pt: 4,
              pb: 2,
              gap: 2,
            }}
          >
            <Box
              component="img"
              src="/emptyBag.png"
              alt="Carrito vacío"
              sx={{
                width: { xs: 300, sm: 350, md: 400 },
                opacity: 0.85,
              }}
            />
            <Typography color="#2d2d2d" textAlign="center" variant="h5">
              Tu carrito está vacío
            </Typography>
          </Box>
        ) : (
          <>
            <CartCommerceSection
              commerce={commerce}
              onRemove={handleRemove}
              onQuantityChange={handleUpdateQuantity}
              onCommerceClick={() => navigate(`/stores/${commerce.commerceId}`)}
              onProductClick={handleProductClick}
            />

            <TextField
              label="Nota para el comercio (opcional)"
              multiline
              minRows={2}
              maxRows={4}
              fullWidth
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              inputProps={{ maxLength: 300 }}
              sx={{ ...fieldSx, mb: 3 }}
            />

            {cart && (
              <PaymentDetail
                cart={cart}
                confirming={confirming}
                onChangePaymentMethod={handleChangePaymentMethod}
                onConfirmOrder={handleConfirmOrder}
              />
            )}
          </>
        )}

        <ProductDetailDialog
          open={productDialogOpen}
          onClose={() => {
            setProductDialogOpen(false);
            setSelectedProductId(null);
          }}
          productId={selectedProductId}
          mode="viewOnly"
          fixedQuantity={selectedProductQuantity}
        />
      </Container>
    </Box>
  );
};

export default CartPage;
