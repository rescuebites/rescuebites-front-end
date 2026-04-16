import { Dialog, DialogContent, Box, Typography, Fade } from "@mui/material";
import CustomButton from "@/shared/components/CustomButton";
import CustomTitle from "@/shared/components/CustomTitle";

interface ClosedCommercePopupProps {
  open: boolean;
  onClose: () => void;
}

export default function ClosedCommercePopup({ open, onClose }: ClosedCommercePopupProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Fade}
      transitionDuration={180}
      PaperProps={{ sx: { borderRadius: 3, width: 320, maxWidth: "92vw", textAlign: "center" } }}
    >
      <DialogContent sx={{ px: 3, pt: 3, pb: 2 }}>
        <Box
          component="img"
          src="/closedCommercePopupImage.png"
          alt="Comercio cerrado"
          sx={{ width: 160, height: "auto", mx: "auto", display: "block" }}
        />
        <CustomTitle
          text="¡El comercio cerrado por hoy!"
          color="#2d2d2d"
          variant="h5"
          align="center"
        />
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 2.5 }}>
          Este comercio ya no recibirá más pedidos en el día de hoy.
        </Typography>
        <CustomButton
          text="Entendido"
          fullWidth
          onClick={onClose}
          sx={{ mt: 0 }}
        />
      </DialogContent>
    </Dialog>
  );
}
