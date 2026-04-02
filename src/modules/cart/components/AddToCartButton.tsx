import { ConfirmModal } from "@/shared/components/ui/ConfirmModal";
import { Box, IconButton, Chip } from "@mui/material";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
  inCart: boolean;
  quantityInCart: number;
  onAdd: () => void;
  onRemove: () => void;
}

export default function AddToCartButton({
  inCart,
  quantityInCart,
  onAdd,
  onRemove,
}: AddToCartButtonProps) {

    const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      {inCart ? (
        <>
          <Chip
            label={quantityInCart}
            size="small"
            sx={{
              position: "absolute",
              top: -5, right: -3, zIndex: 1,
              height: 20, minWidth: 20, fontSize: 12, fontWeight: 700,
              backgroundColor: "#eaefc8",
              color: "#524a4a",
              border: "2px solid",
              borderColor: "background.paper",
              "& .MuiChip-label": { px: 0.5 },
            }}
          />
          <IconButton
            onClick={() => setConfirmOpen(true)}
            size="small"
            aria-label="Eliminar del carrito"
            sx={{
              width: 40, height: 40, borderRadius: "50%",
              backgroundColor: "#77A787", color: "#fff",
              boxShadow: "#77A787",
              "&:hover": { backgroundColor: "#77A787", transform: "scale(1.1)" },
              "&:active": { transform: "scale(0.95)" },
              transition: "transform 0.15s, background-color 0.2s",
            }}
          >
            <Trash2 size={16} strokeWidth={2.5} />
          </IconButton>
          <ConfirmModal
            open={confirmOpen}
            title="Eliminar producto"
            description="¿Estás seguro que querés eliminar este producto del carrito?"
            onConfirm={() => {
                onRemove();
                setConfirmOpen(false);
            }}
            onCancel={() => setConfirmOpen(false)}
            />
        </>
      ) : (
        <IconButton
          onClick={onAdd}
          size="small"
          aria-label="Agregar al carrito"
          sx={{
            width: 40, height: 40, borderRadius: "50%",
            backgroundColor: "#77A787", color: "background.paper",
            boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
            "&:hover": { backgroundColor: "#77A787", transform: "scale(1.1)" },
            "&:active": { transform: "scale(0.95)" },
            transition: "transform 0.15s",
          }}
        >
          <Plus size={18} strokeWidth={2.5} />
        </IconButton>
      )}
    </Box>
  );
}