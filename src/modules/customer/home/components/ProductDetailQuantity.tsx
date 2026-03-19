import { Stack, Typography } from "@mui/material";
import { QuantityControl } from "@/shared/components/layout/QuantityControl";

type DialogMode = "addToCart" | "viewOnly" | "edit";

interface ProductDetailQuantityProps {
  mode: DialogMode;
  stock: number;
  quantity: number;
  onQuantityChange?: (quantity: number) => void;
}

export const ProductDetailQuantity = ({
  mode,
  stock,
  quantity,
  onQuantityChange,
}: ProductDetailQuantityProps) => {
  if (mode === "addToCart") {
    return (
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
        <Typography sx={{ color: "#2D2D2D", fontWeight: 700, fontSize: 16 }}>
          Cantidad
        </Typography>
        <QuantityControl
          stock={stock}
          initialQuantity={quantity}
          onQuantityChange={onQuantityChange || (() => {})}
        />
      </Stack>
    );
  }

  if (mode === "viewOnly") {
    return (
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
        <Typography sx={{ color: "#2D2D2D", fontWeight: 700, fontSize: 16 }}>
          Cantidad comprada
        </Typography>
        <Typography sx={{ color: "#2D2D2D", fontWeight: 700, fontSize: 18 }}>
          {quantity}
        </Typography>
      </Stack>
    );
  }

  return null;
};
