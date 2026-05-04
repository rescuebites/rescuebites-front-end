import { useState } from "react";
import { TextField, Box, Typography } from "@mui/material";
import BackButton from "@/shared/components/ui/BackButton";
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
      <Box sx={{ position: "relative", mb: 2 }}>
        <BackButton sx={{ position: "absolute", left: { xs: 2, sm: 2 }, top: { xs: 80, sm: -60 }, zIndex: 10 }} />

        <Box display="flex" flexDirection="column" alignItems="center">
          <CustomTitle text="Reenviar correo de verificación" />

          <Typography variant="body1" sx={{ mb: 2, color: "#555" }}>
            Ingresa tu correo electrónico y te enviaremos nuevamente el correo de
            verificación.
          </Typography>
        </Box>
      </Box>

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
