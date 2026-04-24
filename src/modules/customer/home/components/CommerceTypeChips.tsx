import { Box, Stack, Typography } from "@mui/material";
import { ReactElement } from "react";
import { CommerceTypeDisplay } from "@/shared/utils/commerce-mapping";
import { getAllCommerceDisplayNames } from "@/shared/utils/commerce.utils";
import { useCommerceTypeStore } from "../hooks/useCommerceTypeStore";

// Íconos
import { GiCroissant } from "react-icons/gi";
import {
  MdStore,
  MdRestaurantMenu,
  MdLocalConvenienceStore,
} from "react-icons/md";
import { FaLeaf } from "react-icons/fa";

// Mapeo de tipos de comercio con íconos y colores
const commerceTypeData: Record<string, { icon: ReactElement; color: string }> =
  {
    Panadería: {
      icon: <GiCroissant size={36} />,
      color: "#A8D5A8",
    },
    Supermercado: {
      icon: <MdStore size={36} />,
      color: "#77A787",
    },
    Verdulería: {
      icon: <FaLeaf size={36} />,
      color: "#9BC5A4",
    },
    Restaurante: {
      icon: <MdRestaurantMenu size={36} />,
      color: "#6B9A7B",
    },
    Kiosco: {
      icon: <MdLocalConvenienceStore size={36} />,
      color: "#77A787",
    },
  };

export default function CommerceTypeChips() {
  const selectedCommerceType = useCommerceTypeStore(
    (state) => state.selectedCommerceType,
  );
  const setSelectedCommerceType = useCommerceTypeStore(
    (state) => state.setSelectedCommerceType,
  );

  const handleCategoryClick = (commerceType: CommerceTypeDisplay) => {
    if (selectedCommerceType === commerceType) {
      setSelectedCommerceType(null);
    } else {
      setSelectedCommerceType(commerceType);
    }
  };

  return (
    <Stack spacing={2}>
      {/* Header de la sección */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {selectedCommerceType && (
          <Typography
            onClick={() => setSelectedCommerceType(null)}
            sx={{
              color: "#757575",
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              "&:hover": { color: "#77A787" },
            }}
          >
            Limpiar filtros
          </Typography>
        )}
      </Stack>

      {/* Scroll horizontal de categorías */}
      <Box
        sx={{
          display: "flex",
          gap: { xs: 2, sm: 3 },
          overflowX: "auto",
          pb: 1,
          px: 0.5,
          "::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {getAllCommerceDisplayNames().map((cat) => (
          <CategoryTile
            key={cat}
            category={cat}
            active={selectedCommerceType === cat}
            onClick={() => handleCategoryClick(cat)}
          />
        ))}
      </Box>
    </Stack>
  );
}

function CategoryTile({
  category,
  active,
  onClick,
}: {
  category: string;
  active: boolean;
  onClick: () => void;
}) {
  const data = commerceTypeData[category];

  return (
    <Stack
      onClick={onClick}
      sx={{
        minWidth: { xs: 100, sm: 120 },
        height: { xs: 100, sm: 120 },
        bgcolor: active ? "#5A8A6A" : data.color,
        borderRadius: 3,
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        cursor: "pointer",
        transition: "all 0.2s ease",
        flexShrink: 0,
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        },
        "&:active": {
          transform: "scale(0.98)",
        },
      }}
    >
      <Box sx={{ color: "#FFFFFF", display: "flex" }}>{data.icon}</Box>
      <Typography
        sx={{
          color: "#FFFFFF",
          fontSize: { xs: 12, sm: 13 },
          fontWeight: 600,
          textAlign: "center",
          px: 1.5,
          lineHeight: 1.1,
        }}
      >
        {category}
      </Typography>
    </Stack>
  );
}
