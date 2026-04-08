import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import type { ProductResponse } from "@/modules/products/interfaces/responses/product-response.interface";
import { formatCurrency } from "@/shared/utils/currency.utils";

interface ProductCardProps {
  product: ProductResponse;
  onClick: () => void;
}

function getExpirationText(date: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Parsear la fecha en zona horaria local para evitar problemas con UTC
  const [year, month, day] = date.split('T')[0].split('-').map(Number);
  const exp = new Date(year, month - 1, day);
  exp.setHours(0, 0, 0, 0);

  const diff = Math.floor(
    (exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diff < 0) return "Expirado";
  if (diff === 0) return "Expira hoy";
  if (diff === 1) return "Expira mañana";
  return `Expira en ${diff} días`;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card
      onClick={onClick}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Imagen */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          aspectRatio: "1 / 1",
          "&:hover img": {
            transform: "scale(1.12)",
          },
        }}
      >
        <Box
          component="img"
          src={product.productImages?.[0]?.url || "/placeholder.jpg"}
          alt={product.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.3s ease-in-out",
          }}
        />

        {product.discountPercentage > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              px: 1.5,
              py: 0.5,
              borderRadius: "16px",
              bgcolor: "#D98C5F",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {Math.round(product.discountPercentage)}%
          </Box>
        )}
      </Box>

      {/* Contenido */}
      <CardContent sx={{ p: 1.5, flexGrow: 1 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 22,
            color: "#2D2D2D",
            mb: 1,
          }}
        >
          {product.name}
        </Typography>

        {/* Precios */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography sx={{ fontWeight: 700, fontSize: 24 }}>
            ${formatCurrency(product.discountedPrice)}
          </Typography>

          {product.originalPrice && (
            <Typography
              sx={{
                color: "#9E9E9E",
                textDecoration: "line-through",
                fontSize: 18,
              }}
            >
              ${formatCurrency(product.originalPrice)}
            </Typography>
          )}
        </Stack>

        {/* Stock */}
        {product.stock !== undefined && (
          <Typography sx={{ fontSize: 16, mt: 0.5 }}>
            Stock:{" "}
            <Box component="span" sx={{ color: "#E53935", fontWeight: 500 }}>
              {product.stock <= 2 ? "Two left" : product.stock}
            </Box>
          </Typography>
        )}

        {/* Expiration */}
        {product.expirationDate && (
          <Typography
            sx={{
              color: "#D98C5F",
              fontSize: 16,
              mt: 0.5,
            }}
          >
            {getExpirationText(product.expirationDate)}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
