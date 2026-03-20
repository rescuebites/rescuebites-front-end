import { Box, Button } from "@mui/material";
import { MdShoppingCart } from "react-icons/md";
import { primaryButtonSx } from "@/shared/styles/buttonSx";

type DialogMode = "addToCart" | "viewOnly" | "edit";

interface ProductDetailActionsProps {
  mode: DialogMode;
  onAddToCart?: () => void;
  onEdit?: () => void;
}

export const ProductDetailActions = ({
  mode,
  onAddToCart,
  onEdit,
}: ProductDetailActionsProps) => {
  if (mode === "viewOnly") {
    return null;
  }

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: "#FFFFFF",
        borderTop: "1px solid #E0E0E0",
        px: 3,
        py: 2,
        boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.08)",
        zIndex: 10,
      }}
    >
      {mode === "addToCart" && (
        <Button
          fullWidth
          variant="contained"
          size="large"
          startIcon={<MdShoppingCart size={22} />}
          sx={{
            ...primaryButtonSx,
            bgcolor: "#5FB574",
            py: 2,
            borderRadius: 3,
            fontSize: 16,
            boxShadow: "0 4px 12px rgba(95, 181, 116, 0.3)",
            "&:hover": {
              bgcolor: "#4E9A5F",
              boxShadow: "0 6px 16px rgba(95, 181, 116, 0.4)",
            },
            "&:active": {
              transform: "scale(0.98)",
            },
          }}
          onClick={onAddToCart}
        >
          Agregar a carrito
        </Button>
      )}

      {mode === "edit" && (
        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{
            ...primaryButtonSx,
            py: 2,
            borderRadius: 3,
            fontSize: 16,
            "&:active": {
              transform: "scale(0.98)",
            },
          }}
          onClick={onEdit}
        >
          Modificar producto
        </Button>
      )}
    </Box>
  );
};
