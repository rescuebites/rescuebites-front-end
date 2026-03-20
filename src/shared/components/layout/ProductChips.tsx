import { ProductCondition } from "@/modules/products/enums/product-condition.enum";
import { CommerceType } from "@/shared/enums/commerce-type.enum";
import { CommerceTypeDisplay, CommerceTypeDisplayName } from "@/shared/utils/commerce-mapping";
import { COMMERCE_TYPE_STYLES } from "@/shared/config/commerce-styles";
import { Box, Chip } from "@mui/material";
import {  Sprout, ClockCheck, CheckCircle, Star, Sparkles, ClockAlert, Microwave, BookmarkX, PackageOpen, Tag } from "lucide-react";

// Estilo genérico para categorías de producto (Golosinas, Fruta, Pan, etc.)
// Todas comparten el mismo estilo neutro — podés diferenciarlas después si querés
const PRODUCT_CATEGORY_STYLE = { bg: "#EEF2FF", color: "#4F46E5" };

// ─────────────────────────────────────────────
// MAPEO DE CONDITION → ESTILO + ÍCONO
// ─────────────────────────────────────────────

type ConditionConfig = { bg: string; color: string; icon: React.ReactNode };

const CONDITION_CONFIG: Record<ProductCondition, ConditionConfig> = {
  [ProductCondition.EXCELLENT]:        { bg: "#e8f9ff", color: "#209AC7", icon: <Sparkles size={14} />        },
  [ProductCondition.GOOD]:             { bg: "#e8f9ff", color: "#209AC7", icon: <Star size={14} /> },
  [ProductCondition.RIPE]:             { bg: "#B9EEA6",   color: "#39714C" , icon: <ClockCheck size={14} />  },
  [ProductCondition.ALMOST_RIPE]:      { bg: "#B9EEA6",   color: "#39714C" , icon: <Sprout size={14} />      },
  [ProductCondition.OVERRIPE]:         { bg: "#B9EEA6",   color: "#39714C", icon: <ClockCheck size={14} />  },
  [ProductCondition.FRESHLY_BAKED]:    { bg: "#EB951C87", color: "#A16A0A", icon: <ClockCheck size={14} />        },
  [ProductCondition.SAME_DAY]:         { bg: "#EB951C87", color: "#A16A0A", icon: <ClockCheck size={14} />        },
  [ProductCondition.PREVIOUS_DAY]:     { bg: "#EB951C87", color: "#A16A0A", icon: <ClockAlert size={14} />  },
  [ProductCondition.READY_TO_SERVE]:   { bg: "#E6E6E7",   color: "#6C6567" , icon: <CheckCircle size={14} /> },
  [ProductCondition.NEEDS_REHEATING]:  { bg: "#E6E6E7",   color: "#6C6567" , icon: <Microwave size={14} />  },
  [ProductCondition.DENTED_PACKAGING]: { bg: "#DDD4F9",   color: "#6D59D3", icon: <PackageOpen size={14} />        },
  [ProductCondition.NEAR_EXPIRY]:      { bg: "#DDD4F9",   color: "#6D59D3", icon: <ClockCheck size={14} />  },
  [ProductCondition.EXPIRED_TODAY]:    { bg: "#DDD4F9",   color: "#6D59D3", icon: <ClockCheck size={14} />  },
  [ProductCondition.DAMAGED_LABEL]:    { bg: "#DDD4F9",   color: "#6D59D3", icon: <BookmarkX size={14} />        },
  [ProductCondition.OTHER]:            { bg: "#E6E6E7", color: "#6C6567", icon: <Tag size={14} />        },
};

// ESTILOS BASE
const BASE_CHIP_SX = {
  height: 30,
  fontWeight: 600,
  fontSize: { xs: 12, sm: 13, md: 14 },
  "& .MuiChip-label": { px: 1.5 },
  "& .MuiChip-icon": { ml: 1, mr: -0.5 },
} as const;


// HELPER para etiqueta de vence en ...
export function getDaysUntilExpiration(expirationDate: string): number {
  const exp = new Date(expirationDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  exp.setHours(0, 0, 0, 0);
  const ms = exp.getTime() - today.getTime();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}


// SUB-COMPONENTES REUTILIZABLES

/** Chip de tipo de comercio — acepta key backend ("KIOSK") o display ("Kiosco") */
export function CommerceTypeChip({ commerceType }: { commerceType: string }) {
  const display =
    CommerceTypeDisplayName[commerceType as CommerceType] ??
    (commerceType as CommerceTypeDisplay);

  const style = COMMERCE_TYPE_STYLES[display as CommerceTypeDisplay];
  if (!style) return null;

  return (
    <Chip
      label={display}
      icon={style.icon as any} 
      size="small"
      sx={{
        ...BASE_CHIP_SX,
        bgcolor: style.bg,
        color: style.color,
        "& .MuiChip-icon": { color: style.color, ml: 1, mr: -0.5 },
      }}
    />
  );
}

/** Chip de categoría de producto */
export function ProductCategoryChip({ categoryDisplayName }: { categoryDisplayName: string }) {
  return (
    <Chip
      label={categoryDisplayName}
      size="small"
      sx={{ ...BASE_CHIP_SX, bgcolor: PRODUCT_CATEGORY_STYLE.bg, color: PRODUCT_CATEGORY_STYLE.color }}
    />
  );
}

/** Chip de condición con ícono y color según el tipo */
export function ConditionChip({
  condition,
  conditionDisplayName,
}: {
  condition: ProductCondition;
  conditionDisplayName: string;
}) {
  const config = CONDITION_CONFIG[condition];
  if (!config) return null;

  return (
    <Chip
      label={conditionDisplayName}
      icon={config.icon as any}
      size="small"
      sx={{
        ...BASE_CHIP_SX,
        bgcolor: config.bg,
        color: config.color,
        "& .MuiChip-icon": { color: config.color, ml: 1, mr: -0.5 },
      }}
    />
  );
}



// COMPONENTE PRINCIPAL
interface ProductChipsProps {
  discountPercentage?: number;
  expirationDate?: string | null;
  stock?: number;
  condition?: ProductCondition | string;
  conditionDisplayName?: string | null;
  category?: string;             // tipo de comercio: "KIOSK", "Kiosco", etc.
  categoryDisplayName?: string;  // categoría de producto: "Golosinas", "Fruta", etc.
  // Visibilidad
  showDiscount?: boolean;
  showExpiration?: boolean;
  showStock?: boolean;
  showCondition?: boolean;
  showCategory?: boolean;
  showProductCategory?: boolean;
  // Badge sobre imagen
  discountAsImageBadge?: boolean;
}

export function ProductChips({
  discountPercentage,
  expirationDate,
  stock,
  condition,
  conditionDisplayName,
  category,
  categoryDisplayName,
  showDiscount = true,
  showExpiration = true,
  showStock = true,
  showCondition = true,
  showCategory = true,
  showProductCategory = true,
  discountAsImageBadge = false,
}: ProductChipsProps) {
  const daysUntilExpiration = expirationDate
    ? getDaysUntilExpiration(expirationDate)
    : null;

  const hasDiscount =
    showDiscount && discountPercentage && Number(discountPercentage) > 0;

  const conditionEnum = condition as ProductCondition;
  const hasStyledCondition =
    showCondition &&
    conditionEnum &&
    conditionDisplayName &&
    CONDITION_CONFIG[conditionEnum];

  return (
    <>
      {/* Badge de descuento sobre imagen */}
      {hasDiscount && discountAsImageBadge && (
        <Box
          sx={{
            position: "absolute",
            top: 20,
            left: 12,
            px: 1.2,
            py: 0.75,
            borderRadius: "8px",
            bgcolor: "rgba(255, 138, 101, 0.95)",
            fontSize: { xs: 14, sm: 16, md: 18 },
            fontWeight: 700,
            color: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          {Math.round(Number(discountPercentage))}%
        </Box>
      )}

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>

        {/* Descuento */}
        {hasDiscount && !discountAsImageBadge && (
          <Chip
            label={`${Math.round(Number(discountPercentage))}% Menos`}
            size="small"
            sx={{ ...BASE_CHIP_SX, bgcolor: "#fff3e0", color: "#FF8A65", fontWeight: 700 }}
          />
        )}

        {/* Vencimiento */}
        {showExpiration && daysUntilExpiration !== null && (
          <Chip
            label={`Vence en ${daysUntilExpiration} ${daysUntilExpiration === 1 ? "día" : "días"}`}
            size="small"
            sx={{ ...BASE_CHIP_SX, bgcolor: "#ffebee", color: "#c62828" }}
          />
        )}

        {/* Stock */}
        {showStock && stock !== undefined && (
          <Chip
            label={`${stock} unidades`}
            size="small"
            sx={{ ...BASE_CHIP_SX, bgcolor: "#fff3e0", color: "#bc544b" }}
          />
        )}

        {/* Condición */}
        {hasStyledCondition ? (
          <ConditionChip
            condition={conditionEnum}
            conditionDisplayName={conditionDisplayName!}
          />
        ) : (
          showCondition && conditionDisplayName && (
            <Chip
              label={conditionDisplayName}
              size="small"
              sx={{ ...BASE_CHIP_SX, bgcolor: "#E3F2FD", color: "#1976D2" }}
            />
          )
        )}

        {/* Categoría de producto — "Golosinas", "Fruta", etc. */}
        {showProductCategory && categoryDisplayName && (
          <ProductCategoryChip categoryDisplayName={categoryDisplayName} />
        )}

        {/* Tipo de comercio — "Kiosco", "Verdulería", etc. */}
        {showCategory && category && <CommerceTypeChip commerceType={category} />}

      </Box>
    </>
  );
}