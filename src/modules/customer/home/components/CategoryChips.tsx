import { Box, Stack, Typography } from "@mui/material";
import { ReactElement, useState } from "react";
import { categories } from "../interfaces/types";

// Íconos
import { GiCroissant } from "react-icons/gi";
import {
  MdStore,
  MdRestaurantMenu,
  MdLocalConvenienceStore,
} from "react-icons/md";
import { FaLeaf } from "react-icons/fa";

// Mapeo de categorías con íconos y colores
const categoryData: Record<string, { icon: ReactElement; color: string }> = {
  Panadería: { 
    icon: <GiCroissant size={32} />, 
    color: '#A8D5A8' 
  },
  Supermercado: { 
    icon: <MdStore size={32} />, 
    color: '#77A787' 
  },
  Verdulería: { 
    icon: <FaLeaf size={32} />, 
    color: '#9BC5A4' 
  },
  Restaurante: { 
    icon: <MdRestaurantMenu size={32} />, 
    color: '#6B9A7B' 
  },
  Kiosco: { 
    icon: <MdLocalConvenienceStore size={32} />, 
    color: '#77A787' 
  },
};

export default function CategoryChips() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <Stack spacing={2}>
      {/* Header de la sección */}
      <Stack 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center"
      >
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            color: '#2D2D2D',
            fontSize: { xs: 18, sm: 20 }
          }}
        >
          Categorías
        </Typography>
        <Typography 
          sx={{ 
            color: '#757575', 
            fontSize: 14,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            '&:hover': { color: '#77A787' }
          }}
        >
          <span>→</span>
        </Typography>
      </Stack>

      {/* Scroll horizontal de categorías */}
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 1.5, sm: 2 },
          overflowX: 'auto',
          pb: 1,
          px: 0.5,
          '::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
        }}
      >
        {categories.map((cat) => (
          <CategoryTile 
            key={cat} 
            category={cat}
            active={active === cat}
            onClick={() => setActive(cat)}
          />
        ))}
      </Box>
    </Stack>
  );
}

function CategoryTile({ 
  category,
  active,
  onClick
}: { 
  category: string;
  active: boolean;
  onClick: () => void;
}) {
  const data = categoryData[category];
  
  return (
    <Stack
      onClick={onClick}
      sx={{
        minWidth: { xs: 85, sm: 95 },
        height: { xs: 85, sm: 95 },
        bgcolor: active ? '#5A8A6A' : data.color,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        flexShrink: 0,
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        '&:active': {
          transform: 'scale(0.98)',
        },
      }}
    >
      <Box sx={{ color: '#FFFFFF', display: 'flex' }}>
        {data.icon}
      </Box>
      <Typography 
        sx={{ 
          color: '#FFFFFF', 
          fontSize: { xs: 11, sm: 12 }, 
          fontWeight: 600,
          textAlign: 'center',
          px: 1,
        }}
      >
        {category}
      </Typography>
    </Stack>
  );
}