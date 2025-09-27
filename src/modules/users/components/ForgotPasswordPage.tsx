import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useSendRecoveryEmail } from "@/modules/users/hooks/useSendRecoveryEmail";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useSendRecoveryEmail();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email });
  };

  return (
    <>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "##77A787" }}
      >
        Recuperar contraseña
      </Typography>

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
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#77A787",
            "&:hover": { backgroundColor: "#669976" },
          }}
          loading={isPending}
        >
          {isPending ? "Cargando..." : "Enviar enlace"}
        </Button>
      </Box>
    </>
  );
}