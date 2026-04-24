import { useState } from "react";
import { TextField, Box, Typography } from "@mui/material";
import { useSendRecoveryEmail } from "@/modules/users/hooks/useSendRecoveryEmail";
import CustomTitle from "@/shared/components/CustomTitle";
import CustomButton from "@/shared/components/CustomButton";
import BackButton from "@/shared/components/ui/BackButton";
import { fieldSx } from "@/shared/styles/fieldSx";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useSendRecoveryEmail();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email });
  };

  return (
    <Box sx={{ position: "relative", px: 2, pt: 2 }}>
      <Box
        sx={{
          position: "absolute",
          left: { xs: 10, sm: 8 },
          top: { xs: -44, sm: -52 },
          display: "flex",
          alignItems: "center",
        }}
      >
        <BackButton />
      </Box>

      <CustomTitle text="Recuperar contraseña" />

      <Box component="form" onSubmit={handleSubmit}>
        <Typography
          variant="body2"
          align="left"
          sx={{ color: "#585858", fontWeight: 600, mt: 3 }}
        >
          Correo electrónico *
        </Typography>

        <TextField
          placeholder="Ingrese su correo electrónico"
          type="email"
          fullWidth
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={fieldSx}
        />

        <CustomButton
          type="submit"
          text="Enviar enlace"
          isLoading={isPending}
          fullWidth
          sx={{ mt: 1 }}
        />
      </Box>
    </Box>
  );
}
