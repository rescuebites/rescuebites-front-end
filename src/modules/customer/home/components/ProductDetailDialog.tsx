import {
  Dialog, IconButton, Box, Typography, Stack, Divider, Button, CircularProgress, Paper,Avatar,
} from "@mui/material";
import {
  MdClose, MdShoppingCart, MdStorefront,
} from "react-icons/md";
import { useState } from "react";
import { useProductDetail } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { ProductChips } from "@/shared/components/layout/ProductChips";
import { QuantityControl } from "@/shared/components/layout/QuantityControl";

interface ProductDetailDialogProps {
  open: boolean;
  onClose: () => void;
  productId: string | null;
}

export default function ProductDetailDialog({
  open,
  onClose,
  productId,
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
        paddingBottom: "88px",  
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
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 220,
            backgroundImage: `url(${productDetail.productImages?.[0]?.url || "/placeholder.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "0 0 24px 24px",
          }}
        >
          {/* Badge de descuento en imagen del producto */}
          <ProductChips
            discountPercentage={productDetail.discountPercentage}
            discountAsImageBadge
            showExpiration={false}
            showStock={false}
            showCondition={false}
          />
        </Box>

        {/* Contenido del producto */}
        <Box sx={{ px: 3, py: 3, pb: 3 }}>
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
                  ${Number(productDetail.discountedPrice).toFixed(2)}
                </Typography>

                {productDetail.originalPrice && (
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

              {/* Descripción del producto */}
              {productDetail.description && (
                <Typography
                  sx={{
                    color: "#666666",
                    lineHeight: 1.6,
                    fontSize: 15,
                    mb: 1,
                  }}
                >
                  {productDetail.description}
                </Typography>
              )}
            </Box>

            {/* etiquetas de información de producto (vencimiento/stock/condición)*/}
            <ProductChips
              expirationDate={productDetail.expirationDate}
              stock={productDetail.stock}
              conditionDisplayName={productDetail.conditionDisplayName}
              showDiscount={false}
            />

            <Divider sx={{ my: 1 }} />

            {/* Detalles del comercio */}
             {productDetail.commerceName && (
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "#F5F5F5",
                  p: 2,
                  borderRadius: 3,
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    src={productDetail.commerceImages?.[0]?.url}
                    alt={productDetail.commerceName}
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: "#77A787",
                      fontSize: 18,
                      fontWeight: 700,
                    }}
                  >
                    {/* Fallback: primera letra del nombre del comercio si no tiene foto de perfil */}
                    {!productDetail.commerceImages?.[0]?.url && 
                      productDetail.commerceName.charAt(0).toUpperCase()
                    }
                  </Avatar>

                  <Box flex={1}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#2D2D2D",
                        fontSize: 17,
                        mb: 0.5,
                      }}
                    >
                      {productDetail.commerceName}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#2D2D2D",
                        fontSize: 15,
                        mb: 0.7,
                      }}
                    >
                      {productDetail.commerceOpeningHours}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <MdStorefront size={14} color="#666666" />
                      <Typography
                        onClick={handleGoToCommerce}
                        sx={{
                          color: "#666666",
                          fontSize: 13,
                          fontWeight: 500,
                          cursor: "pointer",
                        }}
                      >
                        Ver comercio
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Paper>
            )}

            <Divider sx={{ my: 1 }} />

            {/* Selector de cantidad de productos para agregar al carrito */}
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
              <Typography sx={{ color: "#2D2D2D", fontWeight: 700, fontSize: 16 }}>
                Cantidad
              </Typography>
              <QuantityControl
                stock={productDetail.stock}
                initialQuantity={quantity}
                onQuantityChange={(q) => setQuantity(q)}
              />
            </Stack>
          </Stack>
        </Box>
      </Box>

      {/* Botón fijo agregar a carrito */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: "#FFFFFF",
          borderTop: "1px solid #E0E0E0",
          px: 3,
          py: 2,
          boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.08)",
          zIndex: 10,
        }}
      >
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
      </Box>
    </Dialog>
  );
}