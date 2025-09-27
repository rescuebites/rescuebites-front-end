import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";
import { useResetPassword } from "@/modules/users/hooks/useResetPassword";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const showMessage = useSnackbarStore((state) => state.showMessage);

  const { mutate, isPending } = useResetPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValidUUID = (uuid: string) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        uuid
      );

    if (!isValidUUID(token)) {
      showMessage("El token no es válido", "error");
      console.log("Token recibido:", token);

      return;
    }

    mutate({
      token,
      newPassword: password,
      confirmNewPassword: confirmPassword,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 8 }}
    >
      <TextField
        label="Nueva contraseña"
        type="password"
        fullWidth
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      >
        Ingrese su nueva contraseña
      </TextField>
      <TextField
        label="Confirmar contraseña"
        type="password"
        fullWidth
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: "#77A787",
          width: "80%",
          alignItems: "center",
          mx: "auto",
          display: "block",
          "&:hover": { backgroundColor: "#77A787" },
        }}
        loading={isPending}
      >
        {isPending ? "Cargando..." : "Cambiar Contraseña"}
      </Button>
    </Box>
  );
}
