import { Box, Stack, Typography } from "@mui/material";
import { stores } from "./mockData";
import type { Store } from "../interfaces/types";

export default function FeaturedStores() {
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
      {stores.map((s) => (
        <StoreCard key={s.id} store={s} />
      ))}
    </Box>
  );
}

function StoreCard({ store }: { store: Store }) {
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
          backgroundImage: `url(${store.profileImageUrl})`,
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
          {store.name}
        </Typography>
      </Stack>
    </Stack>
  );
}