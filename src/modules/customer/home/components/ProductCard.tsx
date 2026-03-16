import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import type { ProductResponse } from "../interfaces/responses";

interface ProductCardProps {
  product: ProductResponse;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card
      onClick={onClick}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: '#FFFFFF',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        cursor: 'pointer',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          src={product.productImages?.[0]?.url || '/placeholder.jpg'}
          loading="lazy"
          alt={product.name}
          sx={{
            width: '100%',
            aspectRatio: '1 / 1',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {product.discountPercentage > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: { xs: 10, sm: 12 },
              right: { xs: 10, sm: 12 },
              px: { xs: 1.5, sm: 2 },
              py: { xs: 0.5, sm: 0.75 },
              borderRadius: '20px',
              bgcolor: '#FF8A65',
              fontSize: { xs: 13, sm: 14 },
              fontWeight: 700,
              color: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              lineHeight: 1,
            }}
          >
            {Math.round(product.discountPercentage)}%
          </Box>
        )}
      </Box>

      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { xs: 18, sm: 22 },
            color: '#2D2D2D',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: { xs: 30, sm: 40 },
            mb: 1,
            lineHeight: 1.4,
          }}
        >
          {product.name}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
          <Typography sx={{ color: '#2D2D2D', fontWeight: 700, fontSize: { xs: 20, sm: 24 } }}>
            ${product.discountedPrice.toFixed(2)}
          </Typography>
          {product.originalPrice && (
            <Typography sx={{ color: '#BDBDBD', fontSize: { xs: 13, sm: 14 }, textDecoration: 'line-through' }}>
              ${product.originalPrice.toFixed(2)}
            </Typography>
          )}
        </Stack>

        {product.expirationDate && (
          <Typography sx={{ color: '#FF6B6B', fontSize: { xs: 13, sm: 15 }, fontWeight: 500 }}>
            Vence: {new Date(product.expirationDate).toLocaleDateString('es-AR')}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}