import { Box, Chip } from "@mui/material";

// Helper para calcular días hasta vencimiento
export function getDaysUntilExpiration(expirationDate: string): number {
  const exp = new Date(expirationDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  exp.setHours(0, 0, 0, 0);
  const ms = exp.getTime() - today.getTime();
  const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
  return Math.max(0, days);
}

interface ProductChipsProps {
  discountPercentage?: number;
  expirationDate?: string | null;
  stock?: number;
  conditionDisplayName?: string | null;
  // Controla qué chips mostrar — por defecto todos están en true
  showDiscount?: boolean;
  showExpiration?: boolean;
  showStock?: boolean;
  showCondition?: boolean;
  // Para el badge de descuento posicionado sobre imagen
  discountAsImageBadge?: boolean;
}

export function ProductChips({
  discountPercentage,
  expirationDate,
  stock,
  conditionDisplayName,
  showDiscount = true,
  showExpiration = true,
  showStock = true,
  showCondition = true,
  discountAsImageBadge = false,
}: ProductChipsProps) {
  const daysUntilExpiration = expirationDate
    ? getDaysUntilExpiration(expirationDate)
    : null;

  const hasDiscount = showDiscount && discountPercentage && Number(discountPercentage) > 0;

  return (
    <>
      {/* Badge de descuento sobre imagen */}
      {hasDiscount && discountAsImageBadge && (
        <Box
          sx={{
            position: "absolute",
            top: 20,
            left: 12,
            px: 1.2,
            py: 0.75,
            borderRadius: "8px",
            bgcolor: "rgba(255, 138, 101, 0.95)",
            fontSize: {xs:16, sm:18, md:20},
            fontWeight: 700,
            color: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          {Math.round(Number(discountPercentage))}%
        </Box>
      )}

      {/* Chips de información */}
      <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
        {/* Descuento como chip (cuando no es badge de imagen) */}
        {hasDiscount && !discountAsImageBadge && (
          <Chip
            label={`${Math.round(Number(discountPercentage))}% Menos`}
            size="small"
            sx={{
              bgcolor: "#fff3e0",
              color: "#FF8A65",
              fontSize: {xs:16, sm:18, md:20},
              height: 32,
              fontWeight: 700,
              "& .MuiChip-label": { px: 2.5 },
            }}
          />
        )}

        {/* Vencimiento */}
        {showExpiration && daysUntilExpiration !== null && (
          <Chip
            label={`Vence en ${daysUntilExpiration} ${daysUntilExpiration === 1 ? "día" : "días"}`}
            size="small"
            sx={{
              bgcolor: "#ffebee",
              color: "#c62828",
              fontSize: {xs:16, sm:18, md:20},
              height: 32,
              fontWeight: 600,
              "& .MuiChip-label": { px: 2.5 },
            }}
          />
        )}

        {/* Stock */}
        {showStock && stock !== undefined && (
          <Chip
            label={`${stock} Unidades`}
            size="small"
            sx={{
              bgcolor: "#fff3e0",
              color: "#bc544b",
              fontSize: {xs:16, sm:18, md:20},
              height: 30,
              fontWeight: 700,
              "& .MuiChip-label": { px: 2.5 },
            }}
          />
        )}

        {/* Condición */}
        {showCondition && conditionDisplayName && (
          <Chip
            label={conditionDisplayName}
            size="small"
            sx={{
              bgcolor: "#E3F2FD",
              color: "#1976D2",
              fontSize: {xs:16, sm:18, md:20},
              height: 30,
              fontWeight: 600,
              "& .MuiChip-label": { px: 2.5 },
            }}
          />
        )}
      </Box>
    </>
  );
}