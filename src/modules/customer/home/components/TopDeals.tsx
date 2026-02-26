import { Box, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useProductsByCategory } from "../hooks/useProducts";
import {useFilterStore} from "../hooks/useFilterStoresAndProducts";
import type { ProductResponse} from "./../interfaces/responses";
import ProductDetailDialog from "./ProductDetailDialog";

export default function TopDeals() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const selectedCategory = useFilterStore((state) => state.selectedCategory); //lee el estado de la categoría seleccionada
  const { data: products, isLoading} = useProductsByCategory(selectedCategory, 12); //obtiene los productos filtrados por categoría, si no hay categoría seleccionada, obtiene los top deals
  
  const handleDealClick = (product: ProductResponse) => {
    setSelectedProductId(product.productId);
  };

  const handleCloseDialog = () => {
    setSelectedProductId(null);
  };
  

// Manejo de loading
if (isLoading) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={8}>
      <CircularProgress sx={{ color: '#77A787' }} />
    </Box>
  );
}

// Manejo de sin productos
if (!products || products.length === 0) {
  const isFiltering = !!selectedCategory;

  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h6" sx={{ color: '#2D2D2D', mb: 1 }}>
        {isFiltering
          ? "No hay productos destacados en la categoría seleccionada"
          : "No hay productos disponibles"}
      </Typography>
    </Box>
  );
}

  return (
    <>
      <Box
  sx={{
    pt: 1,
    display: "grid",
    gap: { xs: 2, sm: 2.5, md: 3 },
    gridTemplateColumns: {
      xs: "repeat(2, 1fr)",
      md: "repeat(3, 1fr)",
      lg: "repeat(5, 1fr)",
      xl: "repeat(6, 1fr)",
    },
    maxWidth: '100%',
  }}
>
  {products?.map((product: ProductResponse) => (
    <DealCard key={product.productId} product={product} onClick={() => handleDealClick(product)} />
  ))}
</Box>

      <ProductDetailDialog
        open={selectedProductId !== null}
        onClose={handleCloseDialog}
        productId={selectedProductId}
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
      }}
    >
      {/* Contenedor de imagen con badge */}
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

        {/* Precios */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
          <Typography 
            sx={{ 
              color: '#2D2D2D', 
              fontWeight: 700,
              fontSize: { xs: 20, sm: 24 }
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
              fontSize: { xs: 13, sm: 15 },
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