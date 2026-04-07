import React, { useState } from "react";
import { Box, Typography, Container, TextField, Button } from "@mui/material";
import BackButton from "@/shared/components/ui/BackButton";
import CustomTitle from "@/shared/components/CustomTitle";
import CartCommerceSection from "../components/CartCommerceSection";
import PaymentDetail from "../components/PaymentDetails";
import { useCart } from "../hooks/useCart";
import { ConfirmModal } from "@/shared/components/ui/ConfirmModal";

const CartPage: React.FC = () => {
  const {
    cart,
    commerce,
    confirming,
    notes,
    setNotes,
    handleRemove,
    handleUpdateQuantity,
    handleChangePaymentMethod,
    handleConfirmOrder,
    handleClearCart,
  } = useCart();

  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  return (
    <Box sx={{ backgroundColor: "#FAFAFA", minHeight: "100vh", py: { xs: 0.2, sm: 0.4 }, px: { xs: 2, sm: 5, md: 6 } }}>
      <Box sx={{ pt: 1, mb: 3 }}>
        <BackButton />
      </Box>

      <Container maxWidth="lg">
        

        {!commerce ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 8,
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
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
            <CustomTitle text="Tu carrito" color="#2d2d2d" variant="h4" align="left" />
            <Button
              onClick={() => setClearDialogOpen(true)}
              sx={{ color: "#77a77c", fontWeight: 600, textTransform: "none", fontSize: { xs: 14, sm: 16 } }}
            >
              Vaciar carrito
            </Button>
          </Box>
          <ConfirmModal
            open={clearDialogOpen}
            title="¿Vaciar el carrito?"
            description="Se eliminarán todos los productos del carrito."
            confirmText="Vaciar"
            variant="danger"
            onConfirm={async () => { setClearDialogOpen(false); await handleClearCart(); }}
            onCancel={() => setClearDialogOpen(false)}
          />
            <CartCommerceSection
              commerce={commerce}
              onRemove={handleRemove}
              onQuantityChange={handleUpdateQuantity}
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
              sx={{
                mb: 3,
                backgroundColor: "white",
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#6b7280", 
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px", 
                  "& fieldset": { 
                    borderColor: "#E5E7EB" 
                  },
                  "&:hover fieldset": { 
                    borderColor: "#77a77c" 
                  },
                  "&.Mui-focused fieldset": { 
                    borderColor: "#77a77c",
                    borderWidth: "1px"
                  },
                },
              }}
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
      </Container>
    </Box>
  );
};

export default CartPage;