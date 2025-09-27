import { Snackbar, Alert } from "@mui/material";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore.ts";

export function SnackbarProvider() {
  const { message, severity, open, close } = useSnackbarStore();

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={close}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={close} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
