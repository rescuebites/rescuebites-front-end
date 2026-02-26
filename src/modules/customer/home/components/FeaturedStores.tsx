import { Box, Stack, Typography, Skeleton } from "@mui/material";
import { useAllCommerces, useCommercesByType } from "../hooks/useCommerces";
import { useFilterStore } from "../hooks/useFilterStoresAndProducts";
import { CommercePublicResponse } from "../interfaces/responses";
import { useNavigate } from "react-router-dom";

export default function FeaturedStores() {

  const selectedCategory = useFilterStore((state) => state.selectedCategory); //lee el estado de la categoría seleccionada
  
  const categoryToFetch = selectedCategory || "Panadería"; //si no hay categoría seleccionada, se pasa null para obtener todos los comercios;

  const {data: filteredData, isLoading: filteredLoading} = useCommercesByType (categoryToFetch); //obtiene los comercios filtrados por categoría, si no hay categoría seleccionada, obtiene todos los comercios
  
  const { data: allData, isLoading: allLoading } = useAllCommerces();

  const isLoading =selectedCategory ? filteredLoading : allLoading; //si hay una categoría seleccionada, muestra el loading de los comercios filtrados, sino muestra el loading de todos los comercios
  const commerces =selectedCategory ?
  (filteredData?.content ?? []) //si hay una categoría seleccionada, muestra los comercios filtrados
  : (allData?.content ?? []); //si no hay una categoría seleccionada, muestra todos los comercios

  const navigate = useNavigate();

  
  if (isLoading) {
    return <StoresSkeleton />; //muestra el skeleton mientras se cargan los datos
  }

  if (commerces.length === 0) { //si no hay comercios, muestra un mensaje
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h6" sx={{ color: '#2D2D2D', mb: 1 }}>
          {selectedCategory 
            ? `No hay comercios de tipo "${selectedCategory}"` 
            : "No hay comercios disponibles"}
        </Typography>
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
      {commerces.map((commerce) => ( //mapea los comercios y muestra una tarjeta por cada uno
        <StoreCard key={commerce.commerceId} commerce={commerce}
        onClick={() => navigate(`/home/stores/${commerce.commerceId}`)} />
      ))}
    </Box>
  );

  
}

function StoreCard({ commerce, onClick }: { commerce: CommercePublicResponse, onClick: () => void }) {

  const navigate = useNavigate();

  const handleStoreClick = (commerceId:string) => {
    navigate(`/home/stores/${commerceId}`);
  };

  return (
    <Stack
      onClick={onClick}
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

function StoresSkeleton() {
  return (
    <Box sx={{ display: "flex", gap: 2, py: 2 }}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Stack key={i} sx={{ minWidth: 160, gap: 1 }}>
          <Skeleton 
            variant="rectangular" 
            sx={{ 
              width: '100%', 
              aspectRatio: '3/4', 
              borderRadius: 2 
            }} 
            animation="wave"
          />
          <Skeleton width="80%" animation="wave" />
          <Skeleton width="60%" animation="wave" />
        </Stack>
      ))}
      </Box>
  );
}