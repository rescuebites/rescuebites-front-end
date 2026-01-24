import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { deals } from "./mockData";
import type { Deal } from "./../interfaces/types";
import ProductDetailDialog from "./ProductDetailDialog";

export default function TopDeals() {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  // Ordenar por descuento
  const sortedDeals = [...deals].sort((a, b) => b.discount - a.discount);

  const handleDealClick = (deal: Deal) => {
    setSelectedDeal(deal);
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
      xs: "repeat(2, 1fr)",
      sm: "repeat(3, 1fr)",
      md: "repeat(4, 1fr)",
      lg: "repeat(5, 1fr)",
      xl: "repeat(6, 1fr)",
    },
    // 👇 Previene expansión excesiva en pantallas muy grandes
    maxWidth: '100%',
  }}
>
  {sortedDeals.map((d: Deal) => (
    <DealCard key={d.id} deal={d} onClick={() => handleDealClick(d)} />
  ))}
</Box>

      <ProductDetailDialog
        open={selectedDeal !== null}
        onClose={handleCloseDialog}
        deal={selectedDeal}
      />
    </>
  );
}

function DealCard({ deal, onClick }: { deal: Deal; onClick: () => void }) {
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
          src={deal.imageUrl}
          loading="lazy"
          alt={deal.title}
          sx={{
            width: '100%',
            aspectRatio: '1 / 1',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* Badge de descuento */}
        {deal.discount > 0 && (
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
            {deal.discount}%
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
          {deal.title}
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
            ${deal.price.toFixed(2)}
          </Typography>
          
          {/* Precio original tachado */}
          {deal.originalPrice && (
            <Typography
              sx={{
                color: '#BDBDBD',
                fontSize: { xs: 13, sm: 14 },
                textDecoration: 'line-through',
              }}
            >
              ${deal.originalPrice.toFixed(2)}
            </Typography>
          )}
        </Stack>

        {/* Tiempo de expiración */}
        {deal.expiresIn && (
          <Typography
            sx={{
              color: '#FF6B6B',
              fontSize: { xs: 11, sm: 12 },
              fontWeight: 500,
            }}
          >
            Expires in {deal.expiresIn}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}