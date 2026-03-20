import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import CustomTitle from "@/shared/components/CustomTitle";
import { primaryButtonSx, secondaryButtonSx } from "@/shared/styles/buttonSx";
import { fieldSx } from "@/shared/styles/fieldSx";

interface CancelOrderDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  isLoading?: boolean;
}

export const CancelOrderDialog: React.FC<CancelOrderDialogProps> = ({
  open,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (reason.trim()) {
      onConfirm(reason);
      setReason("");
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setReason("");
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          px: 3,
          py: 2,
          width: "90%",
          maxWidth: "440px",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <DialogTitle sx={{ px: 0, pt: 1, pb: 2 }}>
          <CustomTitle
            variant="h6"
            align="left"
            text="Cancelar pedido"
            color="#2D2D2D"
          />
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          disabled={isLoading}
          sx={{
            position: "absolute",
            right: -8,
            top: 8,
            color: "#757575",
          }}
        >
          <MdClose size={24} />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: 0, py: 0 }}>
        <CustomTitle
          variant="body2"
          align="left"
          text="¿Estás seguro de que deseas cancelar este pedido? Esta acción no se
          puede deshacer."
          color="#757575"
        />
        <TextField
          autoFocus
          fullWidth
          multiline
          rows={3}
          label="Motivo de cancelación"
          margin="normal"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          disabled={isLoading}
          placeholder="Ingresa el motivo de la cancelación..."
          sx={fieldSx}
        />
      </DialogContent>

      <DialogActions sx={{ px: 0, pb: 1, pt: 2, gap: 1.5 }}>
        <Button onClick={handleClose} disabled={isLoading} sx={secondaryButtonSx}>
          Volver
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={!reason.trim() || isLoading}
          variant="contained"
          sx={primaryButtonSx}
        >
          {isLoading ? "Cancelando..." : "Confirmar Cancelación"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
