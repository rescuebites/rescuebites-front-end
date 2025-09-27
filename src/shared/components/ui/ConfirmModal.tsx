import { ReactNode } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
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
}: ConfirmModalProps) {
  
    return (
        
        <Dialog open={open} onClose={onCancel}>
            
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>
            {description && <DialogContentText>{description}</DialogContentText>}
            {children}
        </DialogContent>

        <DialogActions>
            <Button onClick={onCancel} color="inherit">
            {cancelText}
            </Button>
            <Button onClick={onConfirm} color="primary" variant="contained">
            {confirmText}
            </Button>
        </DialogActions>
        
        </Dialog>
    );
}
