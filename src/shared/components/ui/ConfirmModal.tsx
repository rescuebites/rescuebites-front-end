import { ReactNode } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { secondaryButtonSx } from "@/shared/styles/buttonSx";
import { dangerButtonSx } from "@/shared/styles/buttonSx";
import { primaryButtonSx } from "@/shared/styles/buttonSx";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
  variant?: "normal" | "danger";
}

export function ConfirmModal({
  open,
  title = "¿Estás seguro?",
  description,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  children,
  variant = "normal",
}: ConfirmModalProps) {
  const confirmButtonSx =
    variant === "danger" ? { ...dangerButtonSx } : { ...primaryButtonSx };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, color: "#2D2D2D" }}>
        {title}
      </DialogTitle>

      <DialogContent>
        {description && (
          <DialogContentText sx={{ color: "#6B7280" }}>
            {description}
          </DialogContentText>
        )}
        {children}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel} sx={secondaryButtonSx}>
          {cancelText}
        </Button>
        <Button onClick={onConfirm} variant="contained" sx={confirmButtonSx}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
