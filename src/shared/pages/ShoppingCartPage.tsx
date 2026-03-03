import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack,
  Container,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

// ─── Types ───────────────────────────────────────────────────────────────────

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


// ─── Mock Data ────────────────────────────────────────────────────────────────

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
    quantity: 2,
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

// ─── Sub-components ───────────────────────────────────────────────────────────

const StockChip: React.FC<{ stock: number }> = ({ stock }) => (
  <Chip
    icon={
      <Box
        component="span"
        sx={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          bgcolor: stock <= 1 ? "#F59E0B" : "#22C55E",
          ml: "6px !important",
        }}
      />
    }
    label={`${stock} Left`}
    size="small"
    sx={{
      height: 20,
      fontSize: "0.65rem",
      fontWeight: 600,
      bgcolor: stock <= 1 ? "#FEF3C7" : "#DCFCE7",
      color: stock <= 1 ? "#92400E" : "#166534",
      border: "none",
      "& .MuiChip-icon": { mr: 0 },
    }}
  />
);

const QuantityControl: React.FC<{
  quantity: number;
  stock: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onSet: (value: number) => void;
}> = ({ quantity, stock, onIncrease, onDecrease, onSet }) => {
  const [inputValue, setInputValue] = useState<string>(String(quantity));
  const [isEditing, setIsEditing] = useState(false);

  React.useEffect(() => {
    if (!isEditing) setInputValue(String(quantity));
  }, [quantity, isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    const parsed = parseInt(inputValue, 10);
    if (!isNaN(parsed) && parsed > 0 && parsed <= stock) {
      onSet(parsed);
    } else if (!isNaN(parsed) && parsed > stock) {
      onSet(stock);
    } else {
      setInputValue(String(quantity));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") (e.target as HTMLInputElement).blur();
    if (e.key === "Escape") {
      setIsEditing(false);
      setInputValue(String(quantity));
    }
  };

  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <IconButton size="small" onClick={onDecrease}
        sx={{ width: 26, height: 26, bgcolor: "#F3F4F6", "&:hover": { bgcolor: "#E5E7EB" } }}
      >
        <RemoveIcon sx={{ fontSize: 14 }} />
      </IconButton>

      <Box
        component="input"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIsEditing(true);
          setInputValue(e.target.value);
        }}
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
          setIsEditing(true);
          e.target.select();
        }}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        inputMode="numeric"
        sx={{
          width: 36, height: 26, textAlign: "center",
          fontWeight: 700, fontSize: "0.875rem", fontFamily: "inherit",
          color: "#111827",
          border: isEditing ? "1.5px solid #166534" : "1.5px solid #E5E7EB",
          borderRadius: "6px", outline: "none",
          bgcolor: isEditing ? "#F0FDF4" : "white",
          transition: "border 0.15s, background 0.15s",
          cursor: "text",
        }}
      />

      <IconButton size="small" onClick={onIncrease}
        sx={{ width: 26, height: 26, bgcolor: "#166534", color: "white", "&:hover": { bgcolor: "#15803D" } }}
      >
        <AddIcon sx={{ fontSize: 14 }} />
      </IconButton>
    </Stack>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const CartPage: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const setQuantity = (id: number, value: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: value } : item))
    );
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + SERVICE_FEE;

  return (
    <Box
      sx={{
        backgroundColor: '#FAFAFA',
        minHeight: '100vh',
        pb: { xs: 3, md: 4 },
      }}
    >
      
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm:4, md: 4 }, px: { xs: 2.5, sm:5, md: 6 }}}>
        {/* ── YOUR CART ── */}
        <Typography
          variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: { xs: 20, sm: 25, md: 30},
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
                          fontSize: { xs: 18, sm: 22, md: 25},
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
                        <DeleteOutlineIcon sx={{ fontSize: {xs:18, sm:20, md:22} }} />
                      </IconButton>
                    </Stack>

                    <Typography
                      sx={{
                        fontSize: { xs: 14, sm: 15, md: 18},
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
                            fontSize: { xs: 15, sm: 20, md: 26 },
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
                          fontSize: { xs: 13, sm: 17, md: 23},
                        }}
                      >
                        ${item.originalPrice.toFixed(2)}
                      </Typography>
                    </Box>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <StockChip stock={item.stock} />
                      <QuantityControl
                        quantity={item.quantity}
                        stock={item.stock}
                        onIncrease={() => updateQuantity(item.id, 1)}
                        onDecrease={() => updateQuantity(item.id, -1)}
                        onSet={(value) => setQuantity(item.id, value)}
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
          sx={{ fontWeight: 700, fontSize: {xs:20, sm:23, md:28 }, mb: 1.2, color: "#111827" }}
        >
          Comercio
        </Typography>

        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "1px solid #F3F4F6",
            display: 'flex',
            alignItems: 'flex-start',
            mb:4
          }}
        >
          <CardContent sx={{ p: "14px !important" }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar
                // src={commerce.images?.[0]?.url || ''}
                sx={{
                  width: { xs: 60, sm: 80, md: 100},
                  height: { xs: 60, sm: 80, md: 100},
                  backgroundColor: '#77A787',
                  borderRadius:{xs:3, sm:5, md:7}
                }}
              >
                Brizha
              </Avatar>
              <Box>
                <Typography
                  sx={{ fontWeight: 700, fontSize: {xs:15, sm:18, md:21}, color: '#2D2D2D' }}
                >
                  {COMMERCE.name}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.25}>
                  <LocationOnIcon sx={{ fontSize: {xs:13, sm:15, md:17}, color: "#9CA3AF" }} />
                  <Typography sx={{ fontSize: {xs:13, sm:15, md:20}, color: "#9CA3AF" }}>
                    {COMMERCE.address}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Método de pago*/}
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, fontSize:{xs:20, sm:23, md:28}, mb: 1.5, color: "#111827" }}
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
                  <Typography sx={{ fontWeight: 600, fontSize: {xs:16, sm:19, md:23}, fontFamily: "inherit", color: "#111827" }}>
                    {PAYMENT.name}
                  </Typography>
                  <Typography sx={{ fontSize: {xs:14, sm:16, md:19}, color: "#9CA3AF", fontFamily: "inherit" }}>
                    {PAYMENT.detail}
                  </Typography>
                </Box>
              </Stack>
              <Button
                size="small"
                sx={{
                  color: "#166534",
                  fontWeight: 600,
                  fontSize: {xs:13, sm:15, md:17},
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
                <Typography sx={{ fontSize: {xs:14, sm:18, md:21}, color: "#6B7280", fontFamily: "inherit" }}>
                  Subtotal
                </Typography>
                <Typography sx={{ fontSize: {xs:16, sm:20, md:22}, fontWeight: 500, fontFamily: "inherit", color: "#374151" }}>
                  ${subtotal.toFixed(2).replace(".", ",")}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ fontSize: {xs:14, sm:18, md:21}, color: "#6B7280", fontFamily: "inherit" }}>
                  Tasa de servicio
                </Typography>
                <Typography sx={{ fontSize: {xs:16, sm:20, md:22}, fontWeight: 500, fontFamily: "inherit", color: "#374151" }}>
                  ${SERVICE_FEE.toFixed(2).replace(".", ",")}
                </Typography>
              </Stack>

              <Divider sx={{ my: 0.5 }} />

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography sx={{ fontSize: {xs:15, sm:19, md:22}, fontWeight: 700, fontFamily: "inherit", color: "#111827" }}>
                  Total
                </Typography>
                <Typography sx={{ fontSize: {xs:18, sm:23, md:26}, fontWeight: 700, color: "#166534", fontFamily: "inherit" }}>
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
                fontSize: {xs:16, ms: 19, md: 22, },
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