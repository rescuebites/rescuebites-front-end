import React from "react";
import { Box, Typography, Container } from "@mui/material";
import BackButton from "@/shared/components/ui/BackButton";
import CustomTitle from "@/shared/components/CustomTitle";
import CartCommerceSection from "../components/CartCommerceSection";
import PaymentDetail from "../components/PaymentDetails";
import { useCart } from "../hooks/useCart";

const CartPage: React.FC = () => {
  const {
    cart,
    commerce,
    confirming,
    handleRemove,
    handleUpdateQuantity,
    handleChangePaymentMethod,
    handleConfirmOrder,
  } = useCart();

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
              src="../../../../public/emptyBag.png" 
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
          <CustomTitle text="Tu carrito" color="#2d2d2d" variant="h4" align="left" />
            <CartCommerceSection
              commerce={commerce}
              onRemove={handleRemove}
              onQuantityChange={handleUpdateQuantity}
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