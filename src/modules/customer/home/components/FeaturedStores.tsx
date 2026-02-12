import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import { useCommercesByType } from "../hooks/useCommerces";
import { CommercePublicResponse } from "../interfaces/responses";
import { useNavigate } from "react-router-dom";

export default function FeaturedStores() {
  const { data, isLoading, error } = useCommercesByType('BAKERY', 6);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={4}>
        <CircularProgress sx={{ color: '#77A787' }} />
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Box textAlign="center" py={4}>
        <Typography color="text.secondary">No hay comercios disponibles</Typography>
      </Box>
    );
  }

  const stores = data.content || [];

  if (stores.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography color="text.secondary">No hay comercios disponibles</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: 2, sm: 2.5 },
        overflowX: "auto",
        py: 1,
        px: 0.5,
        '::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
      }}
    >
      {stores.map((commerce) => (
        <StoreCard key={commerce.commerceId} commerce={commerce} />
      ))}
    </Box>
  );
}

function StoreCard({ commerce }: { commerce: CommercePublicResponse }) {

    const navigate = useNavigate();

  const handleStoreClick = (commerceId:string) => {
    navigate(`/home/stores/${commerceId}`);
  };

  return (
    <Stack
      sx={{
        minWidth: { xs: 140, sm: 160 },
        bgcolor: '#FFFFFF',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        flexShrink: 0,
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      {/* Imagen arriba */}
      <Box
        sx={{
          width: '100%',
          height: { xs: 120, sm: 140 },
          backgroundImage: `url(${commerce.images[0]?.url || '/placeholder.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Nombre abajo */}
      <Stack 
        spacing={0} 
        sx={{ 
          p: { xs: 1.5, sm: 2 },
        }}
      >
        <Typography 
          onClick={() => handleStoreClick(commerce.commerceId)}
          sx={{ 
            color: '#2D2D2D', 
            fontWeight: 600,
            fontSize: { xs: 14, sm: 15 },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}
        >
          {commerce.name} 
        </Typography>
      </Stack>
    </Stack>
  );
}