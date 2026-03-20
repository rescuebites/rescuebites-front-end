import { Sprout, Cookie, Utensils, ShoppingBasket, IceCream } from "lucide-react";
import { CommerceTypeDisplay, COMMERCE_TYPE_COLORS } from "@/shared/utils/commerce-mapping";

// Íconos para cada tipo de comercio
const COMMERCE_TYPE_ICONS: Record<CommerceTypeDisplay, React.ReactNode> = {
  Verdulería:  <Sprout size={14} />,
  Panadería:   <Cookie size={14} />,
  Restaurante: <Utensils size={14} />,
  Supermercado: <ShoppingBasket size={14} />,
  Kiosco:      <IceCream size={14} />,
};

// Estilos completos (colores + íconos) para cada tipo de comercio
export const COMMERCE_TYPE_STYLES: Record<CommerceTypeDisplay, { bg: string; color: string; icon: React.ReactNode }> = {
  Verdulería: {
    ...COMMERCE_TYPE_COLORS.Verdulería,
    icon: COMMERCE_TYPE_ICONS.Verdulería,
  },
  Panadería: {
    ...COMMERCE_TYPE_COLORS.Panadería,
    icon: COMMERCE_TYPE_ICONS.Panadería,
  },
  Restaurante: {
    ...COMMERCE_TYPE_COLORS.Restaurante,
    icon: COMMERCE_TYPE_ICONS.Restaurante,
  },
  Supermercado: {
    ...COMMERCE_TYPE_COLORS.Supermercado,
    icon: COMMERCE_TYPE_ICONS.Supermercado,
  },
  Kiosco: {
    ...COMMERCE_TYPE_COLORS.Kiosco,
    icon: COMMERCE_TYPE_ICONS.Kiosco,
  },
};
