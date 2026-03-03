import { Box, Typography, Skeleton, CardContent, Card, Stack } from "@mui/material";
import { useState } from "react";
import { useProductsByCategory } from "../hooks/useProducts";
import { useFilterStore } from "../hooks/useFilterStoresAndProducts";
import type { ProductResponse } from "../interfaces/responses";
import CategoryChips from "../components/CategoryChips";
import ProductDetailDialog from "../components/ProductDetailDialog";
import BackButton from "@/shared/components/ui/BackButton";
import { useNavigate } from "react-router-dom";

export default function AllProductsPage() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const selectedCategory = useFilterStore((state) => state.selectedCategory);
  const { data: products, isLoading } = useProductsByCategory(selectedCategory, 100); // trae más productos que en home

  const navigate= useNavigate();

  return (

    <Box sx={{ px: { xs: 2, sm: 4, md:8 }, py: 3,  mx: "auto" }}>
        <Box sx={{ pt: { xs: 0.5, sm: 1, md: 1 }, mb:3 }}>
            <BackButton onClick={() => navigate('/home', { replace: true })}/>
        </Box>
      {/* Header */}
      <Typography variant="h5" sx={{ fontWeight: 700, color: "#2D2D2D", mb: 3 }}>
        Todos los productos
      </Typography>

      {/* Categorías */}
      <Box sx={{ mb: 5 }}>
        <CategoryChips />
      </Box>

      {/* Contenido */}
      {isLoading ? (
        <Skeleton />
      ) : !products || products.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" sx={{ color: "#2D2D2D" }}>
            {selectedCategory
              ? `No hay productos en la categoría "${selectedCategory}"`
              : "No hay productos disponibles"}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gap: { xs: 2, sm: 2.5, md: 3 },
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(5, 1fr)",
              xl: "repeat(6, 1fr)",
            },
          }}
        >
          {products.map((product) => (
            <DealCard
              key={product.productId}
              product={product}
              onClick={() => setSelectedProductId(product.productId)}
            />
          ))}
        </Box>
      )}

      <ProductDetailDialog
        open={selectedProductId !== null}
        onClose={() => setSelectedProductId(null)}
        productId={selectedProductId}
      />
    </Box>
  );
}

// Reutiliza exactamente el mismo DealCard de TopDeals
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