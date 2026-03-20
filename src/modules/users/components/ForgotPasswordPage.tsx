import { useState } from "react";
import { TextField, Box } from "@mui/material";
import { useSendRecoveryEmail } from "@/modules/users/hooks/useSendRecoveryEmail";
import CustomTitle from "@/shared/components/CustomTitle";
import CustomButton from "@/shared/components/CustomButton";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useSendRecoveryEmail();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email });
  };

  return (
    <>
      <CustomTitle text="Recuperar contraseña" />

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Correo Electrónico"
          placeholder="Ingrese su correo electrónico"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />

        <CustomButton
          type="submit"
          text="Enviar enlace"
          isLoading={isPending}
          fullWidth
        />
      </Box>
    </>
  );
}