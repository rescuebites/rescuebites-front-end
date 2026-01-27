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
} from "@mui/material";
import {
  MdClose,
  MdStorefront,
  MdLocalShipping,
  MdSchedule,
  MdLocationOn,
  MdPhone,
} from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import type { Deal, ProductTag } from "../interfaces/types";
import { stores } from "./mockData";

interface ProductDetailDialogProps {
  open: boolean;
  onClose: () => void;
  deal: Deal | null;
}

const tagLabels: Record<ProductTag, string> = {
  maduro: "Maduro",
  vegano: "Vegano",
  vegetariano: "Vegetariano",
  "sin-gluten": "Sin gluten",
  "sin-lactosa": "Sin lactosa",
  organico: "Orgánico",
  "buen-estado": "Buen estado",
};

const tagColors: Record<ProductTag, string> = {
  maduro: "#ff9800",
  vegano: "#4caf50",
  vegetariano: "#8bc34a",
  "sin-gluten": "#2196f3",
  "sin-lactosa": "#03a9f4",
  organico: "#66bb6a",
  "buen-estado": "#509550",
};

function parseLocalDate(dateString: string): Date {
  const [datePart] = dateString.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setHours(0, 0, 0, 0);
  return dt;
}

function getDaysUntilExpiration(expiration: string): number {
  const exp = parseLocalDate(expiration);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const ms = exp.getTime() - today.getTime();
  const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
  return Math.max(0, days);
}

function formatDateEsAR(expiration: string): string {
  const exp = parseLocalDate(expiration);
  return exp.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function ProductDetailDialog({
  open,
  onClose,
  deal,
}: ProductDetailDialogProps) {
  if (!open || !deal) {
    return null;
  }

  const store = stores.find((s) => s.id === deal.storeId);

  const daysUntilExpiration = getDaysUntilExpiration(deal.expirationDate);
  const formattedDate = formatDateEsAR(deal.expirationDate);
  const isExpiringSoon = daysUntilExpiration <= 2;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: "90vh",
        },
      }}
    >
      <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
        <IconButton
          onClick={onClose}
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.9)",
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
            height: { xs: 250, sm: 350 },
            backgroundImage: `url(${deal.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              px: 3,
              py: 1.5,
              borderRadius: "50px",
              bgcolor: "rgba(253, 251, 246, 0.95)",
              fontSize: 20,
              fontWeight: 700,
              color: "#0e1b0e",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            -{deal.discount}%
          </Box>
        </Box>

        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#0e1b0e", mb: 1 }}
              >
                {deal.title}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip
                  label={deal.category}
                  size="small"
                  sx={{ bgcolor: "#e8f3e8", color: "#509550" }}
                />
                <Chip
                  label={deal.productType}
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: "#509550", color: "#509550" }}
                />
              </Stack>
            </Box>

            <Typography sx={{ color: "#0e1b0e", lineHeight: 1.6 }}>
              {deal.description}
            </Typography>

            <Box>
              <Stack direction="row" spacing={2} alignItems="baseline">
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "#509550" }}
                >
                  ${deal.price}
                </Typography>
                <Typography
                  sx={{
                    textDecoration: "line-through",
                    color: "#999",
                    fontSize: 18,
                  }}
                >
                  ${deal.originalPrice}
                </Typography>
              </Stack>
              <Typography sx={{ color: "#509550", mt: 0.5, fontWeight: 500 }}>
                Ahorrás ${deal.originalPrice - deal.price}
              </Typography>
            </Box>

            <Divider />

            <Stack spacing={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography sx={{ color: "#0e1b0e", fontWeight: 600 }}>
                  Stock disponible:
                </Typography>
                <Typography
                  sx={{
                    color: deal.stock < 5 ? "#ff9800" : "#509550",
                    fontWeight: 700,
                  }}
                >
                  {deal.stock} unidades
                </Typography>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography sx={{ color: "#0e1b0e", fontWeight: 600 }}>
                  Fecha de vencimiento:
                </Typography>
                <Typography
                  sx={{
                    color: isExpiringSoon ? "#d32f2f" : "#0e1b0e",
                    fontWeight: 600,
                  }}
                >
                  {formattedDate}
                </Typography>
              </Stack>

              {isExpiringSoon && (
                <Alert severity="warning" sx={{ borderRadius: 2 }}>
                  Este producto vence en {daysUntilExpiration}{" "}
                  {daysUntilExpiration === 1 ? "día" : "días"}. Se recomienda
                  consumo inmediato.
                </Alert>
              )}
            </Stack>

            {(deal.tags ?? []).length > 0 && (
              <Box>
                <Typography sx={{ color: "#0e1b0e", fontWeight: 600, mb: 1.5 }}>
                  Características:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {deal.tags?.map((tag) => (
                    <Chip
                      key={tag}
                      icon={<FaCheckCircle size={14} />}
                      label={tagLabels[tag]}
                      sx={{
                        bgcolor: `${tagColors[tag]}20`,
                        color: tagColors[tag],
                        fontWeight: 600,
                        "& .MuiChip-icon": {
                          color: tagColors[tag],
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            )}

            <Divider />

            {store && (
              <Box>
                <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                  <MdStorefront size={24} color="#509550" />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#0e1b0e" }}
                  >
                    Información del comercio
                  </Typography>
                </Stack>

                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 2,
                        backgroundImage: `url(${store.imageUrl || store.profileImageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        border: "2px solid #e8f3e8",
                      }}
                    />
                    <Box>
                      <Typography sx={{ fontWeight: 600, color: "#0e1b0e" }}>
                        {store.name}
                      </Typography>
                      {store.subtitle && (
                        <Typography sx={{ color: "#509550", fontSize: 14 }}>
                          {store.subtitle}
                        </Typography>
                      )}
                    </Box>
                  </Stack>

                  {store.location && (
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      <MdLocationOn
                        size={20}
                        color="#509550"
                        style={{ marginTop: 2 }}
                      />
                      <Typography sx={{ color: "#0e1b0e", flex: 1 }}>
                        {store.location}
                      </Typography>
                    </Stack>
                  )}

                  {store.schedule && (
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      <MdSchedule
                        size={20}
                        color="#509550"
                        style={{ marginTop: 2 }}
                      />
                      <Typography sx={{ color: "#0e1b0e", flex: 1 }}>
                        {store.schedule}
                      </Typography>
                    </Stack>
                  )}

                  {store.deliveryAvailable !== undefined && (
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <MdLocalShipping size={20} color="#509550" />
                      <Typography sx={{ color: "#0e1b0e" }}>
                        {store.deliveryAvailable
                          ? "Delivery disponible"
                          : "Solo retiro en local"}
                      </Typography>
                    </Stack>
                  )}

                  {store.phoneNumber && (
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <MdPhone size={20} color="#509550" />
                      <Typography sx={{ color: "#0e1b0e" }}>
                        {store.phoneNumber}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Box>
            )}

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} pt={2}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "#509550",
                  color: "#fff",
                  fontWeight: 700,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: 16,
                  "&:hover": {
                    bgcolor: "#3d7a3d",
                  },
                }}
              >
                Agregar al carrito
              </Button>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "#509550",
                  color: "#509550",
                  fontWeight: 700,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: 16,
                  "&:hover": {
                    borderColor: "#3d7a3d",
                    bgcolor: "#e8f3e8",
                  },
                }}
              >
                Reservar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}