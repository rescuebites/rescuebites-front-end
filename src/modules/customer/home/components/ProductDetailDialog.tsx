import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Stack,
  Chip,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  MdClose,
  MdAdd,
  MdRemove,
  MdShoppingCart,
} from "react-icons/md";
import { useState } from "react";
import type { ProductResponse } from "../interfaces/responses";
import { useProductDetail } from "../hooks/useProducts";

interface ProductDetailDialogProps {
  open: boolean;
  onClose: () => void;
  product: ProductResponse | null;
}

// Helper para calcular días hasta vencimiento
function getDaysUntilExpiration(expirationDate: string): number {
  const exp = new Date(expirationDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  exp.setHours(0, 0, 0, 0);
  const ms = exp.getTime() - today.getTime();
  const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
  return Math.max(0, days);
}

export default function ProductDetailDialog({
  open,
  onClose,
  product,
}: ProductDetailDialogProps) {
  const [quantity, setQuantity] = useState(1);

  // Fetch del detalle completo del producto cuando se abre el dialog
  const { data: productDetail, isLoading } = useProductDetail(
    product?.productId.toString() || null
  );

  if (!open || !product) {
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
        <DialogContent>
          <Box display="flex" justifyContent="center" alignItems="center" py={8}>
            <CircularProgress sx={{ color: "#5FB574" }} />
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  const daysUntilExpiration = productDetail.expirationDate
    ? getDaysUntilExpiration(productDetail.expirationDate)
    : null;

  const handleIncrement = () => {
    if (quantity < productDetail.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = (Number(productDetail.discountedPrice) * quantity).toFixed(2);

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

      <DialogContent sx={{ p: 0 }}>
        {/* Imagen del producto */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 320,
            backgroundImage: `url(${product.images[0]?.url || "/placeholder.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "0 0 24px 24px",
          }}
        >
          {/* Badge de descuento */}
          {Number(productDetail.discountPercentage) > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: 20,
                left: 20,
                px: 2,
                py: 0.75,
                borderRadius: "8px",
                bgcolor: "rgba(255, 138, 101, 0.95)",
                fontSize: 16,
                fontWeight: 700,
                color: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              {Math.round(Number(productDetail.discountPercentage))}%
            </Box>
          )}

          {/* Badge del comercio */}
          {productDetail.commerce?.name && (
            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                right: 20,
                px: 2,
                py: 0.75,
                borderRadius: "8px",
                bgcolor: "rgba(95, 181, 116, 0.95)",
                fontSize: 13,
                fontWeight: 600,
                color: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              {productDetail.commerce.name}
            </Box>
          )}
        </Box>

        {/* Contenido del producto */}
        <Box sx={{ px: 3, py: 3 }}>
          <Stack spacing={2.5}>
            {/* Título y precio */}
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#2D2D2D",
                  mb: 1,
                  fontSize: 24,
                }}
              >
                {productDetail.name}
              </Typography>

              <Stack direction="row" spacing={2} alignItems="baseline" mb={1.5}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "#5FB574",
                    fontSize: 32,
                  }}
                >
                  ${totalPrice}
                </Typography>

                {productDetail.originalPrice && quantity === 1 && (
                  <Typography
                    sx={{
                      textDecoration: "line-through",
                      color: "#BDBDBD",
                      fontSize: 18,
                      fontWeight: 500,
                    }}
                  >
                    ${Number(productDetail.originalPrice).toFixed(2)}
                  </Typography>
                )}
              </Stack>

              {/* Descripción */}
              {productDetail.description && (
                <Typography
                  sx={{
                    color: "#666666",
                    lineHeight: 1.6,
                    fontSize: 15,
                    mb: 2,
                  }}
                >
                  {productDetail.description}
                </Typography>
              )}
            </Box>

            {/* Badges de información */}
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              {/* Días para vencer */}
              {daysUntilExpiration !== null && (
                <Chip
                  label={`Expires in ${daysUntilExpiration} ${daysUntilExpiration === 1 ? "day" : "days"}`}
                  size="small"
                  sx={{
                    bgcolor: "#ffebee",
                    color: "#c62828",
                    fontSize: 13,
                    height: 32,
                    fontWeight: 600,
                    "& .MuiChip-label": { px: 2.5 },
                  }}
                />
              )}

              {/* Stock disponible */}
              <Chip
                label={`${productDetail.stock} Left`}
                size="small"
                sx={{
                  bgcolor: "#fff3e0",
                  color: "#bc544b",
                  fontSize: 14,
                  height: 30,
                  fontWeight: 700,
                  "& .MuiChip-label": { px: 2.5 },
                }}
              />

              {/* Tags dinámicos del producto -------- agregar si se agrega enback*/}
              {/* {productDetail.tags?.map((tag: string) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    bgcolor: "#E8F5E9",
                    color: "#77A787",
                    fontSize: 14,
                    height: 30,
                    fontWeight: 600,
                    "& .MuiChip-label": { px: 2.5 },
                  }}
                />
              ))}*/}
            </Box> 

            <Divider sx={{ my: 1 }} />

            {/* Store Details */}
            {productDetail.commerce && (
              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#2D2D2D",
                    fontSize: 16,
                    mb: 2,
                  }}
                >
                  Información del comercio
                </Typography>

                <Stack spacing={2}>
                  {/* Logo y nombre del comercio */}
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        backgroundImage: `url(${productDetail.commerce.images?.[0]?.url || "/placeholder-store.jpg"})`,
                        backgroundColor: "#5FB574",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 20,
                      }}
                    >
                      {!productDetail.commerce.images?.[0]?.url &&
                        productDetail.commerce.name.substring(0, 2).toUpperCase()}
                    </Box>
                    <Box flex={1}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: "#2D2D2D",
                          fontSize: 16,
                        }}
                      >
                        {productDetail.commerce.name}
                      </Typography>
                      {productDetail.commerce.openingHours && (
                        <Typography
                          sx={{
                            color: "#666666",
                            fontSize: 13,
                            lineHeight: 1.4,
                          }}
                        >
                          {productDetail.commerce.openingHours}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            )}

            <Divider sx={{ my: 1 }} />

            {/* Quantity selector */}
            <Box>
              <Typography
                sx={{
                  color: "#2D2D2D",
                  fontWeight: 700,
                  mb: 2,
                  fontSize: 16,
                }}
              >
                Quantity
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack
                  direction="row"
                  spacing={0}
                  alignItems="center"
                  sx={{
                    border: "2px solid #E0E0E0",
                    borderRadius: 2,
                    overflow: "hidden",
                    bgcolor: "#FAFAFA",
                  }}
                >
                  <IconButton
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    sx={{
                      borderRadius: 0,
                      px: 2.5,
                      py: 1.5,
                      color: "#2D2D2D",
                      "&:hover": { bgcolor: "#F5F5F5" },
                      "&:disabled": { color: "#BDBDBD" },
                    }}
                  >
                    <MdRemove size={20} />
                  </IconButton>

                  <Typography
                    sx={{
                      px: 4,
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#2D2D2D",
                      minWidth: 50,
                      textAlign: "center",
                    }}
                  >
                    {quantity}
                  </Typography>

                  <IconButton
                    onClick={handleIncrement}
                    disabled={quantity >= productDetail.stock}
                    sx={{
                      borderRadius: 0,
                      px: 2.5,
                      py: 1.5,
                      color: "#2D2D2D",
                      "&:hover": { bgcolor: "#F5F5F5" },
                      "&:disabled": { color: "#BDBDBD" },
                    }}
                  >
                    <MdAdd size={20} />
                  </IconButton>
                </Stack>
              </Stack>
            </Box>

            {/* Add to Cart Button */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<MdShoppingCart size={22} />}
              sx={{
                bgcolor: "#5FB574",
                color: "#fff",
                fontWeight: 700,
                py: 2,
                borderRadius: 3,
                textTransform: "none",
                fontSize: 16,
                boxShadow: "0 4px 12px rgba(95, 181, 116, 0.3)",
                "&:hover": {
                  bgcolor: "#4E9A5F",
                  boxShadow: "0 6px 16px rgba(95, 181, 116, 0.4)",
                },
                "&:active": {
                  transform: "scale(0.98)",
                },
              }}
              onClick={() => {
                console.log("Agregar al carrito:", {
                  productId: productDetail.productId,
                  quantity,
                  price: productDetail.discountedPrice,
                });
              }}
            >
              Agregar a carrito
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}