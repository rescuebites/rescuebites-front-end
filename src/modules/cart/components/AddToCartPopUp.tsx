import { Box, IconButton, Dialog, DialogContent, Typography, Stack, Fade } from "@mui/material";
import { X } from "lucide-react";
import { QuantityControl } from "@/shared/components/layout/QuantityControl";
import CustomTitle from "@/shared/components/CustomTitle";
import CustomButton from "@/shared/components/CustomButton";

interface AddToCartPopupProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
  unitPrice: number;
  availableStock: number;
  unit?: string;
  imageUrl?: string;
  inCart: boolean;
  qty: number;
  onQtyChange: (qty: number) => void;
  error?: string | null;
}

export default function AddToCartPopup({
  open,
  onClose,
  onConfirm,
  productName,
  unitPrice,
  availableStock,
  unit,
  imageUrl,
  inCart,
  qty,
  onQtyChange,
  error,
}: AddToCartPopupProps) {
  const totalPrice = (unitPrice * qty).toLocaleString("es-AR");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Fade}
      transitionDuration={180}
      PaperProps={{ sx: { borderRadius: 3, width: 300, maxWidth: "92vw" } }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex", alignItems: "center", gap: 1.5,
          px: 2, pt: 2, pb: 1.5,
          borderBottom: "1px solid", borderColor: "divider",
        }}
      >
        <Box
          sx={{
            width: 50, height: 60, borderRadius: 2,
            backgroundColor: "action.hover",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, fontSize: 24, overflow: "hidden",
          }}
        >
          {imageUrl && (
            <img src={imageUrl} alt={productName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          )}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <CustomTitle text={productName} color="#2d2d2d" variant="h5" align="left" />
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: -1 }}>
            ${unitPrice.toLocaleString("es-AR")}
            {unit ? ` / ${unit}` : ""}
          </Typography>
        </Box>

        <IconButton size="small" onClick={onClose} aria-label="Cerrar" sx={{ color: "text.secondary", flexShrink: 0 }}>
          <X size={16} />
        </IconButton>
      </Box>

      {/* Stepper */}
      <DialogContent sx={{ px: 2, pt: 2.5, pb: 1.5 }}>
        <CustomTitle text="Cantidad" color="#2d2d2d" variant="subtitle1" align="left" />
        <QuantityControl
          stock={availableStock}
          initialQuantity={qty}
          onQuantityChange={onQtyChange}
        />
        <Box
          sx={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            mt: 2, pt: 2, borderTop: "1px solid", borderColor: "divider",
          }}
        >
          <CustomTitle text="Total:" color="#2d2d2d" variant="subtitle1" />
          <CustomTitle text={`$${totalPrice}`} color="#2d2d2d" variant="subtitle1" />
        </Box>
      </DialogContent>
      {error && (
        <Typography variant="caption" color="error" textAlign="center" display="block" mb={1}>
          {error}
        </Typography>
      )}

      {/* Footer */}
      <Stack spacing={1} sx={{ px: 2, pb: 2 }}>
        <CustomButton
          text={inCart ? "Actualizar cantidad" : "Agregar al carrito"}
          fullWidth
          onClick={onConfirm}
          backgroundColor="#5A9A6E"
          sx={{ mt: 0 }}
        />
        <CustomButton
          text="Cancelar"
          fullWidth
          onClick={onClose}
          backgroundColor="transparent"
          sx={{ mt: 0, color: "text.secondary", boxShadow: "none", "&:hover": { backgroundColor: "action.hover" } }}
        />
      </Stack>
    </Dialog>
  );
}