import { Box, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useTopDeals } from "../hooks/useProducts";
import type { ProductResponse} from "./../interfaces/responses";
import ProductDetailDialog from "./ProductDetailDialog";

export default function TopDeals() {
  const [selectedDeal, setSelectedDeal] = useState<ProductResponse | null>(null);

  const { data: products, isLoading, error } = useTopDeals(12);

  // 🔍 DEBUGGING - AGREGAR ESTO
  console.log('RAW DATA:', products);
  console.log('IS LOADING:', isLoading);
  console.log('ERROR:', error);
  

// Manejo de loading
if (isLoading) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={8}>
      <CircularProgress sx={{ color: '#77A787' }} />
    </Box>
  );
}

// Manejo de error
if (error) {
  return (
    <Box textAlign="center" py={4}>
      <Typography color="error">
        Error al cargar productos destacados
      </Typography>
    </Box>
  );
}

// Manejo de sin datos
if (!products || products.length === 0) {
  return (
    <Box textAlign="center" py={4}>
      <Typography color="text.secondary">
        No hay productos destacados disponibles
      </Typography>
    </Box>
  );
}

  const handleDealClick = (product: ProductResponse) => {
    setSelectedDeal(product);
  };

  const handleCloseDialog = () => {
    setSelectedDeal(null);
  };

  return (
    <>
      <Box
  sx={{
    pt: 1,
    display: "grid",
    gap: { xs: 2, sm: 2.5, md: 3 },
    gridTemplateColumns: {
      xs: "repeat(3, 1fr)",
      md: "repeat(3, 1fr)",
      lg: "repeat(5, 1fr)",
      xl: "repeat(6, 1fr)",
    },
    // 👇 Previene expansión excesiva en pantallas muy grandes
    maxWidth: '100%',
  }}
>
  {products?.map((product: ProductResponse) => (
    <DealCard key={product.productId} product={product} onClick={() => handleDealClick(product)} />
  ))}
</Box>

      <ProductDetailDialog
        open={selectedDeal !== null}
        onClose={handleCloseDialog}
        product={selectedDeal}
      /> 
    </>
  );
}

function DealCard({ product, onClick }: { product: ProductResponse; onClick: () => void }) {
  return (
    <Card
      onClick={onClick}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: '#FFFFFF',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        },
        '&:active': {
          transform: 'scale(0.98)',
        },
      }}
    >
      {/* Contenedor de imagen con badge */}
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          src={product.images[0]?.url || '/placeholder.jpg'}
          loading="lazy"
          alt={product.name}
          sx={{
            width: '100%',
            aspectRatio: '1 / 1',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* Badge de descuento */}
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

      {/* Contenido de la tarjeta */}
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        {/* Título del producto */}
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { xs: 14, sm: 15 },
            color: '#2D2D2D',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: { xs: 40, sm: 44 },
            mb: 1,
            lineHeight: 1.4,
          }}
        >
          {product.name}
        </Typography>

        {/* Precios */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
          <Typography 
            sx={{ 
              color: '#2D2D2D', 
              fontWeight: 700,
              fontSize: { xs: 16, sm: 18 }
            }}
          >
            ${product.discountedPrice.toFixed(2)}
          </Typography>
          
          {/* Precio original tachado */}
          {product.originalPrice && (
            <Typography
              sx={{
                color: '#BDBDBD',
                fontSize: { xs: 13, sm: 14 },
                textDecoration: 'line-through',
              }}
            >
              ${product.originalPrice.toFixed(2)}
            </Typography>
          )}
        </Stack>

        {/* Tiempo de expiración */}
        {product.expirationDate && (
          <Typography
            sx={{
              color: '#FF6B6B',
              fontSize: { xs: 11, sm: 12 },
              fontWeight: 500,
            }}
          >
            Vence: {new Date(product.expirationDate).toLocaleDateString('es-AR')}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}