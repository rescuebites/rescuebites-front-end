import { useState } from "react";
import { TextField, Typography } from "@mui/material";
import CustomTitle from "@/shared/components/CustomTitle";
import { useResendVerification } from "@/modules/users/hooks/useResendVerification";
import CustomButton from "@/shared/components/CustomButton";

export function ResendVerificationPage() {
  const [email, setEmail] = useState("");
  const { isPending, mutate } = useResendVerification();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return; 
    mutate(email);
  };

  return (
    <>
      <CustomTitle text="Reenviar correo de verificación" />

      <Typography variant="body1" sx={{ mb: 2, color: "#555" }}>
        Ingresa tu correo electrónico y te enviaremos nuevamente el correo de
        verificación.
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          sx={{ mb: 1 }}
        />

        <CustomButton
          type="submit"
          text="Reenviar correo"
          disabled={isPending}
          fullWidth
        />
      </form>
    </>
  );
}
