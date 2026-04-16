import { Box } from "@mui/material";
import { MdShoppingCart, MdEdit } from "react-icons/md";
import CustomButton from "@/shared/components/CustomButton";

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
        px: 5,
        py: 2,
        zIndex: 10,
      }}
    >
      {mode === "addToCart" && (
        <CustomButton
          fullWidth
          text="Agregar a carrito"
          onClick={onAddToCart}
          variant="primary"
          size="large"
          startIcon={<MdShoppingCart size={26} />}
          sx={{
            boxShadow: "0 4px 12px rgba(95, 181, 116, 0.3)",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(95, 181, 116, 0.4)",
            },
          }}
        />
      )}

      {mode === "edit" && (
        <CustomButton
          fullWidth
          text="Modificar producto"
          onClick={onEdit}
          variant="primary"
          size="large"
          startIcon={<MdEdit size={26} />}
        />
      )}
    </Box>
  );
};
