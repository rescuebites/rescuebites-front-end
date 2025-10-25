import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TextField, Box } from "@mui/material";
import { useResetPassword } from "@/modules/users/hooks/useResetPassword";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import CustomButton from "@/shared/components/CustomButton";

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
      <CustomButton
        type="submit"
        text="Cambiar Contraseña"
        isLoading={isPending}
      />
    </Box>
  );
}
