import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Card,
  CardContent,
  Stack,
  Container,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { QuantityControl } from "../components/layout/QuantityControl";
import { ProductChips } from "../components/layout/ProductChips";
import BackButton from "../components/ui/BackButton";
import CommerceInfoCard from "../components/CommerceInfoCard";

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  quantity: number;
  stock: number;
  image: string;
}

interface Commerce {
  name: string;
  distance: string;
  address: string;
  logo: string;
}

interface PaymentMethod {
  name: string;
  detail: string;
  logo?: string;
}
/////////////////////////////////

const INITIAL_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Pasta Salad",
    description: "A fresh pasta salad made...",
    price: 13.5,
    originalPrice: 30.0,
    quantity: 2,
    stock: 4,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=80&h=80&fit=crop",
  },
  {
    id: 2,
    name: "Origen Café",
    description: "A premium coffee made...",
    price: 25.0,
    originalPrice: 50.0,
    quantity: 1,
    stock: 1,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=80&h=80&fit=crop",
  },
];

const COMMERCE: Commerce = {
  name: "Brizha Restaurant",
  distance: "1.2km",
  address: "San Luis 1234",
  logo: "",
};

const PAYMENT: PaymentMethod = {
  name: "Metodo de Pago",
  detail: "Mercado Pago **** 1234",
};

const SERVICE_FEE = 8.5;


//Main Component ───────────────────────────────────────────────────────────

const CartPage: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  //Esta función sigue acá y no es redefinida en el componente de QuantityControl para que se actualice subtotal y toal en tiempo real
  const updateItemQuantity = (id: number, quantity: number) => {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + SERVICE_FEE;

  return (
    <Box
      sx={{
        backgroundColor: '#FAFAFA',
        minHeight: '100vh',
        //pb: { xs: 3, md: 4 },
        py: { xs: 0.2, sm:0.4, md: 0.4 }, 
        px: { xs: 2, sm:5, md: 6 }
      }}
    >
      {/* Botón volver para atras */}
      <Box sx={{ pt: { xs: 1, sm: 1, md: 1 }, alignSelf: 'flex-start' , mb:3}}>
        <BackButton />
      </Box>
      
      <Container maxWidth="lg" >
        {/* ── YOUR CART ── */}
        <Typography
          variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: { xs: 21, sm: 26, md: 31},
                mb: { xs: 2.5, sm: 3, md: 4},
                lineHeight: 1,
                color: '#2D2D2D',
              }}
        >
          Tu carrito
        </Typography>
        
        {/* card de Productos agregados al carrito */}
        <Stack spacing={1.5} sx={{ mb: 3 }}>
          {items.map((item) => (
            <Card
              key={item.id}
              sx={{
              borderRadius: { xs: 4, md: 6 },
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              overflow: 'visible',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
              '&:hover': {
              transform: { md: 'translateY(-2px)' },
              boxShadow: { md: '0 4px 12px rgba(0,0,0,0.12)' },
        },
              }}
            >
              <CardContent sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
                <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2, md: 3 } }}>
                  {/* Imagen  */}
                  <Box
                    component="img"
                    src={item.image}
                    sx={{
                      borderRadius: { xs: 2, md: 4 },
                      position: 'relative',
                      width: { xs: 90, sm: 105, md: 120},
                      height: { xs: 90, sm: 105, md: 120},
                      flexShrink: 0,
                      overflow: 'hidden',
                      alignSelf: 'center',
                    }}
                  />

                  {/* Información del prod */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: 19, sm: 23, md: 26},
                          color: '#2D2D2D',
                          lineHeight: 1.3,
                        }}
                      >
                        {item.name}
                      </Typography>
                      {/* Eliminar producto de carrito */}
                      <IconButton
                        size="small"
                        onClick={() => removeItem(item.id)}
                        sx={{ color: "#9CA3AF", p: 0.5, ml: 0.5 }}
                      >
                        <DeleteOutlineIcon sx={{ fontSize: {xs:20, sm:23, md:26} }} />
                      </IconButton>
                    </Stack>

                    <Typography
                      sx={{
                        fontSize: { xs: 16, sm: 19, md: 23},
                        mb: { xs: 0.7, sm: 1, md: 1.2 },
                        color: '#2D2D2D',
                        lineHeight: 1.3,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: 160,
                      }}
                    >
                      {item.description}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            fontSize: { xs: 18, sm: 20, md: 26 },
                            color: '#77A787',
                          }}
                        >
                        ${item.price.toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: 'line-through',
                          color: '#999',
                          fontSize: { xs: 16, sm: 18, md: 24},
                        }}
                      >
                        ${item.originalPrice.toFixed(2)}
                      </Typography>
                    </Box>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <ProductChips 
                        showDiscount={false}
                        discountAsImageBadge
                        showExpiration={false}
                        showStock={true}
                        stock={item.stock}
                        showCondition={false}/>
                      <QuantityControl
                        stock={item.stock}
                        initialQuantity={item.quantity}
                        onQuantityChange={(q) => updateItemQuantity(item.id, q)}
                      />
                    </Stack>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* ── Comercio ── */}
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, fontSize: {xs:22, sm:24, md:30 }, mb: 1.2, color: "#111827" }}
        >
          Comercio
        </Typography>

        <Box sx={{ mb: 4 }}>
          <CommerceInfoCard
            commerceName={COMMERCE.name}
            commerceAddress={COMMERCE.address}
          />
        </Box>

        {/* Método de pago*/}
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, fontSize:{xs:22, sm:24, md:30}, mb: 1.5, color: "#111827" }}
        >
          Método de pago
        </Typography>

        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            border: "1px solid #F3F4F6",
            bgcolor: "white",
            mb: 3,
          }}
        >
          <CardContent sx={{ p: "14px !important" }}>
            {/* Payment method row */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    border: "2px solid #E5E7EB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#F9FAFB",
                  }}
                >
                  <SwapHorizIcon sx={{ color: "#2563EB", fontSize: 22 }} /> 
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: {xs:18, sm:21, md:25}, fontFamily: "inherit", color: "#111827" }}>
                    {PAYMENT.name}
                  </Typography>
                  <Typography sx={{ fontSize: {xs:16, sm:18, md:21}, color: "#9CA3AF", fontFamily: "inherit" }}>
                    {PAYMENT.detail}
                  </Typography>
                </Box>
              </Stack>
              <Button
                size="small"
                sx={{
                  color: "#166534",
                  fontWeight: 600,
                  fontSize: {xs:14.5, sm:16.5, md:19},
                  textTransform: "none",
                  fontFamily: "inherit",
                  minWidth: "auto",
                  p: 0,
                  "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
                }}
              >
                Cambiar
              </Button>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            {/* Summary rows */}
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ fontSize: {xs:15.5, sm:19.5, md:22.5}, color: "#6B7280", fontFamily: "inherit" }}>
                  Subtotal
                </Typography>
                <Typography sx={{ fontSize: {xs:17, sm:21, md:23}, fontWeight: 500, fontFamily: "inherit", color: "#374151" }}>
                  ${subtotal.toFixed(2).replace(".", ",")}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ fontSize: {xs:15.5, sm:19.5, md:22.5}, color: "#6B7280", fontFamily: "inherit" }}>
                  Tasa de servicio
                </Typography>
                <Typography sx={{ fontSize: {xs:17, sm:21, md:23}, fontWeight: 500, fontFamily: "inherit", color: "#374151" }}>
                  ${SERVICE_FEE.toFixed(2).replace(".", ",")}
                </Typography>
              </Stack>

              <Divider sx={{ my: 0.5 }} />

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography sx={{ fontSize: {xs:16, sm:20, md:23}, fontWeight: 700, fontFamily: "inherit", color: "#111827" }}>
                  Total
                </Typography>
                <Typography sx={{ fontSize: {xs:19.5, sm:24.5, md:27.5}, fontWeight: 700, color: "#166534", fontFamily: "inherit" }}>
                  ${total.toFixed(2).replace(".", ",")}
                </Typography>
              </Stack>
            </Stack>

            {/* Confirm button */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2.5,
                bgcolor: "#166534",
                color: "white",
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 600,
                fontSize: {xs:18, ms: 22, md: 25, },
                fontFamily: "inherit",
                py: 1.25,
                boxShadow: "0 4px 14px rgba(22,101,52,0.3)",
                "&:hover": {
                  bgcolor: "#15803D",
                  boxShadow: "0 6px 20px rgba(22,101,52,0.4)",
                },
              }}
            >
              Confirmar Pedido
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};


export default CartPage;