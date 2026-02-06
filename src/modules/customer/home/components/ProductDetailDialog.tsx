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
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  MdClose,
  MdStorefront,
  MdSchedule,
  MdLocationOn,
  MdPhone,
  MdAdd,
  MdRemove,
} from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import type { ProductResponse } from "../interfaces/responses";
import { useProductDetail } from "../hooks/useProductDetail";

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

// Helper para obtener color según condición
function getConditionColor(condition: string): string {
  if (["EXCELLENT", "GOOD", "FRESHLY_BAKED", "READY_TO_SERVE"].includes(condition)) {
    return "#4caf50";
  }
  if (["ALMOST_RIPE", "RIPE", "NEAR_EXPIRY", "PREVIOUS_DAY"].includes(condition)) {
    return "#ff9800";
  }
  if (["OVERRIPE", "EXPIRED_TODAY", "SAME_DAY"].includes(condition)) {
    return "#ff5252";
  }
  return "#9e9e9e";
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
            borderRadius: 3,
            bgcolor: "#FDFBF6",
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
        <DialogContent>
          <Box display="flex" justifyContent="center" alignItems="center" py={8}>
            <CircularProgress sx={{ color: "#77A787" }} />
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  const daysUntilExpiration = productDetail.expirationDate
    ? getDaysUntilExpiration(productDetail.expirationDate)
    : null;
  const isExpiringSoon = daysUntilExpiration !== null && daysUntilExpiration <= 2;

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
          borderRadius: 3,
          maxHeight: "90vh",
          bgcolor: "#FDFBF6",
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
      <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
        <IconButton
          onClick={onClose}
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.95)",
            "&:hover": { bgcolor: "rgba(255, 255, 255, 1)" },
          }}
        >
          <MdClose />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 280,
            backgroundImage: `url(${productDetail.imageUrls[0] || "/placeholder.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {Number(productDetail.discountPercentage) > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
                px: 2.5,
                py: 1,
                borderRadius: "50px",
                bgcolor: "#77A787",
                fontSize: 18,
                fontWeight: 700,
                color: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              {Math.round(Number(productDetail.discountPercentage))}%
            </Box>
          )}
        </Box>

        <Box sx={{ p: 3 }}>
          <Stack spacing={2.5}>
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#0e1b0e", mb: 1.5 }}
              >
                {productDetail.name}
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip
                  label={productDetail.categoryDisplayName}
                  size="small"
                  sx={{
                    bgcolor: "#77A787",
                    color: "#fff",
                    fontWeight: 600,
                  }}
                />

                {daysUntilExpiration !== null && (
                  <Chip
                    icon={<MdSchedule />}
                    label={`Vence en ${daysUntilExpiration} ${daysUntilExpiration === 1 ? "día" : "días"}`}
                    size="small"
                    sx={{
                      bgcolor: isExpiringSoon ? "#ff525220" : "#ff980020",
                      color: isExpiringSoon ? "#d32f2f" : "#ff9800",
                      fontWeight: 600,
                      "& .MuiChip-icon": {
                        color: isExpiringSoon ? "#d32f2f" : "#ff9800",
                      },
                    }}
                  />
                )}

                <Chip
                  label={`${productDetail.stock} unid. disponibles`}
                  size="small"
                  sx={{
                    bgcolor: productDetail.stock < 5 ? "#ff980020" : "#4caf5020",
                    color: productDetail.stock < 5 ? "#ff9800" : "#4caf50",
                    fontWeight: 600,
                  }}
                />
              </Stack>
            </Box>

            {productDetail.description && (
              <Typography sx={{ color: "#0e1b0e", lineHeight: 1.6, fontSize: 15 }}>
                {productDetail.description}
              </Typography>
            )}

            {isExpiringSoon && (
              <Alert
                severity="warning"
                sx={{
                  borderRadius: 2,
                  bgcolor: "#fff3e0",
                  "& .MuiAlert-icon": { color: "#ff9800" },
                }}
              >
                Este producto vence en {daysUntilExpiration}{" "}
                {daysUntilExpiration === 1 ? "día" : "días"}. Se recomienda consumo
                inmediato.
              </Alert>
            )}

            {productDetail.conditionDisplayName && (
              <Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  <FaCheckCircle
                    size={18}
                    color={getConditionColor(productDetail.condition)}
                  />
                  <Typography
                    sx={{
                      color: getConditionColor(productDetail.condition),
                      fontWeight: 600,
                      fontSize: 15,
                    }}
                  >
                    {productDetail.conditionDisplayName}
                  </Typography>
                </Stack>
              </Box>
            )}

            <Divider />

            {productDetail.commerce && (
              <Box>
                <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                  <MdStorefront size={22} color="#77A787" />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#0e1b0e", fontSize: 17 }}
                  >
                    Información del comercio
                  </Typography>
                </Stack>

                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        backgroundImage: `url(${productDetail.commerce.images?.[0]?.imageUrl || "/placeholder-store.jpg"})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        border: "2px solid #77A787",
                      }}
                    />
                    <Box flex={1}>
                      <Typography sx={{ fontWeight: 600, color: "#0e1b0e" }}>
                        {productDetail.commerce.name}
                      </Typography>
                      {productDetail.commerce.description && (
                        <Typography
                          sx={{
                            color: "#77A787",
                            fontSize: 13,
                            lineHeight: 1.4,
                          }}
                        >
                          {productDetail.commerce.description}
                        </Typography>
                      )}
                    </Box>
                  </Stack>

                  {productDetail.commerce.address && (
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      <MdLocationOn
                        size={20}
                        color="#77A787"
                        style={{ marginTop: 2 }}
                      />
                      <Typography sx={{ color: "#0e1b0e", flex: 1, fontSize: 14 }}>
                        {productDetail.commerce.address}, {productDetail.commerce.locality}
                      </Typography>
                    </Stack>
                  )}

                  {productDetail.commerce.openingHours && (
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      <MdSchedule
                        size={20}
                        color="#77A787"
                        style={{ marginTop: 2 }}
                      />
                      <Typography sx={{ color: "#0e1b0e", flex: 1, fontSize: 14 }}>
                        {productDetail.commerce.openingHours}
                      </Typography>
                    </Stack>
                  )}

                  {productDetail.commerce.phone && (
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <MdPhone size={20} color="#77A787" />
                      <Typography sx={{ color: "#0e1b0e", fontSize: 14 }}>
                        {productDetail.commerce.phone}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Box>
            )}

            <Divider />

            <Box>
              <Typography
                sx={{ color: "#0e1b0e", fontWeight: 600, mb: 1.5, fontSize: 15 }}
              >
                Cantidad
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
                    border: "2px solid #77A787",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <IconButton
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    sx={{
                      borderRadius: 0,
                      px: 2,
                      py: 1,
                      color: "#77A787",
                      "&:hover": { bgcolor: "#77A78710" },
                      "&:disabled": { color: "#ccc" },
                    }}
                  >
                    <MdRemove size={20} />
                  </IconButton>
                  <Typography
                    sx={{
                      px: 3,
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#0e1b0e",
                      minWidth: 40,
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
                      px: 2,
                      py: 1,
                      color: "#77A787",
                      "&:hover": { bgcolor: "#77A78710" },
                      "&:disabled": { color: "#ccc" },
                    }}
                  >
                    <MdAdd size={20} />
                  </IconButton>
                </Stack>

                <Stack alignItems="flex-end">
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "#77A787" }}
                  >
                    ${totalPrice}
                  </Typography>
                  {productDetail.originalPrice && quantity === 1 && (
                    <Typography
                      sx={{
                        textDecoration: "line-through",
                        color: "#999",
                        fontSize: 14,
                      }}
                    >
                      ${Number(productDetail.originalPrice).toFixed(2)}
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<MdAdd size={24} />}
              sx={{
                bgcolor: "#77A787",
                color: "#fff",
                fontWeight: 700,
                py: 1.8,
                borderRadius: 2,
                textTransform: "none",
                fontSize: 16,
                boxShadow: "0 4px 12px rgba(119, 167, 135, 0.3)",
                "&:hover": {
                  bgcolor: "#5d8a6d",
                  boxShadow: "0 6px 16px rgba(119, 167, 135, 0.4)",
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
              Agregar al carrito
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}