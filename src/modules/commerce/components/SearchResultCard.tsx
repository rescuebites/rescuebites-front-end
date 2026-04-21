import { Box, Typography, Paper, Stack } from "@mui/material";
import type { SearchProductResponse } from "@/modules/filterPanel/interfaces/responses/search-response.interface";
import ProductStatusBadge from "./ProductStatusBadge";
import { formatDateShort } from "@/shared/utils/dateFormat";

interface Props {
  product: SearchProductResponse;
  onClick?: () => void;
}

export default function SearchResultCard({ product, onClick }: Props) {
  const image = product.productImages?.[0]?.url || "/placeholder.jpg";
  const expiresLabel = product.expirationDate ? formatDateShort(product.expirationDate) : null;

  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: 1.5,
        borderRadius: 3,
        display: "flex",
        gap: 2,
        alignItems: "center",
        bgcolor: "#FFF",
        cursor: onClick ? "pointer" : "default",
        "&:hover": { boxShadow: "0 4px 16px rgba(0,0,0,0.1)", borderColor: "#77A787" },
        transition: "all 0.2s",
      }}
    >
      {/* Imagen */}
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={image}
          alt={product.name}
          sx={{
            width: 80,
            height: 80,
            borderRadius: 2,
            objectFit: "cover",
            bgcolor: "#E0E0E0",
          }}
        />

        {/* Badge descuento */}
        <Box
          sx={{
            position: "absolute",
            top: 6,
            right: 6,
            bgcolor: "#F97316",
            color: "white",
            fontSize: 12,
            fontWeight: 700,
            px: 1,
            py: 0.2,
            borderRadius: 2,
          }}
        >
          {product.discountPercentage}%
        </Box>
      </Box>

      {/* Info */}
      <Box flex={1}>
        <Typography fontWeight={700} fontSize={18}>
          {product.name}
        </Typography>

        <Stack direction="row" spacing={1} mt={0.5} mb={0.5}>
          {expiresLabel && (
            <ProductStatusBadge text={`Vence: ${expiresLabel}`} variant="expire" />
          )}
          <ProductStatusBadge text={`${product.stock} restantes`} variant="stock" />
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography fontWeight={700} color="#2D6A4F">
            ${product.discountedPrice.toFixed(2)}
          </Typography>

          <Typography
            sx={{
              textDecoration: "line-through",
              color: "#BDBDBD",
              fontSize: 14,
            }}
          >
            ${product.originalPrice.toFixed(2)}
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}
