import { Box, Typography, Paper, Stack } from "@mui/material";
import InfoChip from "./InfoChip";

interface Props {
  product: {
    name: string;
    price: number;
    originalPrice: number;
    discount: number;
    expiresIn: string;
    stock: number;
    image: string;
  };
}

export default function SearchResultCard({ product }: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        borderRadius: 3,
        display: "flex",
        gap: 2,
        alignItems: "center",
        bgcolor: "#F6F6F6",
      }}
    >
      {/* Imagen */}
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            width: 80,
            height: 80,
            borderRadius: 2,
            objectFit: "cover",
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
          {product.discount}%
        </Box>
      </Box>

      {/* Info */}
      <Box flex={1}>
        <Typography fontWeight={700} fontSize={18}>
          {product.name}
        </Typography>

        <Stack direction="row" spacing={1} mt={0.5} mb={0.5}>
          <InfoChip text={`Expires in ${product.expiresIn}`} variant="expire" />
          <InfoChip text={`${product.stock} Left`} variant="stock" />
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography fontWeight={700} color="#2D6A4F">
            ${product.price.toFixed(2)}
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
