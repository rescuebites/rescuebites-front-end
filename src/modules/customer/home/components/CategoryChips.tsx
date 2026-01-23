import { Chip, Stack } from "@mui/material";
import { useState } from "react";
import { categories } from "../interfaces/types";

// Íconos
import { GiCroissant } from "react-icons/gi";
import {
  MdStore,
  MdRestaurantMenu,
  MdLocalConvenienceStore,
} from "react-icons/md";
import { FaLeaf } from "react-icons/fa";

const categoryIcons: Record<string, JSX.Element> = {
  Panadería: <GiCroissant size={18} />,
  Supermercado: <MdStore size={18} />,
  Verdulería: <FaLeaf size={18} />,
  Restaurante: <MdRestaurantMenu size={18} />,
  Kiosco: <MdLocalConvenienceStore size={18} />,
};

export default function CategoryChips() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1}
      sx={{ mt: 1, px: { xs: 0.5, sm: 1 } }}
    >
      {categories.map((cat) => (
        <Chip
          key={cat}
          label={cat}
          icon={categoryIcons[cat]}
          onClick={() => setActive(cat)}
          sx={{
            flex: { xs: 1, sm: "unset" },
            bgcolor: "#e8f3e8",
            color: "#0e1b0e",
            "&:hover": { bgcolor: "#d9efd9" },
            borderRadius: 2,
          }}
          variant={active === cat ? "filled" : "outlined"}
        />
      ))}
    </Stack>
  );
}
