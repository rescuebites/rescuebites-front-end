import { Dialog, DialogContent, Box, Typography, Fade } from "@mui/material";
import CustomButton from "@/shared/components/CustomButton";
import CustomTitle from "@/shared/components/CustomTitle";

interface ClosedReopensPopupProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ClosedReopensPopup({
  open,
  onClose,
  onConfirm,
}: ClosedReopensPopupProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Fade}
      transitionDuration={180}
      PaperProps={{
        sx: {
          borderRadius: 3,
          width: 340,
          maxWidth: "92vw",
          textAlign: "center",
        },
      }}
    >
      <DialogContent sx={{ px: 3, pt: 3.5, pb: 2.5 }}>
        <Box
          component="img"
          src="/reopensCommerceImage.png"
          alt="Comercio cerrado"
          sx={{ width: 160, height: "auto", mx: "auto", display: "block" }}
        />
        <CustomTitle
          text="¡El comercio volverá a abrir pronto!"
          color="#2d2d2d"
          variant="h5"
          align="center"
          sx={{ mt: 2 }}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, mb: 3 }}
        >
          Podés agregar productos al carrito y hacer el pedido ahora. El
          comercio recibirá tu pedido cuando vuelva a abrir más tarde.
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <CustomButton
            text="Cancelar"
            fullWidth
            onClick={onClose}
            sx={{
              mt: 0,
              backgroundColor: "#F3F4F6",
              color: "#374151",
              "&:hover": { backgroundColor: "#E5E7EB" },
            }}
          />
          <CustomButton
            text="Aceptar"
            fullWidth
            onClick={onConfirm}
            sx={{ mt: 0 }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
