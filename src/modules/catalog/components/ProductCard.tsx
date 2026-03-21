import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import type { ProductResponse } from "@/modules/products/interfaces/responses/product-response.interface";

interface ProductCardProps {
  product: ProductResponse;
  onClick: () => void;
}

function formatPrice(price: number) {
  return price.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function getExpirationText(date: string) {
  const today = new Date();
  const exp = new Date(date);

  const diff = Math.ceil(
    (exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diff <= 1) return "Expires in one day";
  return `Expires in ${diff} days`;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card
      onClick={onClick}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        bgcolor: "#F3F3F3", // 👈 fondo gris como en la imagen
        boxShadow: "none",
        cursor: "pointer",
        p: 1.5,
      }}
    >
      {/* Imagen */}
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={product.productImages?.[0]?.url || "/placeholder.jpg"}
          alt={product.name}
          sx={{
            width: "100%",
            aspectRatio: "1 / 1",
            objectFit: "cover",
            borderRadius: 3,
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
      <CardContent sx={{ p: 1.5 }}>
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
            ${formatPrice(product.discountedPrice)}
          </Typography>

          {product.originalPrice && (
            <Typography
              sx={{
                color: "#9E9E9E",
                textDecoration: "line-through",
                fontSize: 18,
              }}
            >
              ${formatPrice(product.originalPrice)}
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