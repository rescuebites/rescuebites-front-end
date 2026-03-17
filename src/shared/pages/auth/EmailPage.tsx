import CustomTitle from "@/shared/components/CustomTitle";
import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function EmailPage() {
  return (
    <Box sx={{ textAlign: "center", p: 2 }}>
      <CustomTitle text="Confirmar cuenta"/>

      <Typography variant="body1" sx={{ color: "#555", mb: 3 }}>
        Te hemos enviado un correo electrónico para confirmar tu dirección de
        correo. Por favor, revisa tu bandeja de entrada y sigue las
        instrucciones para completar el registro.
      </Typography>
      <Link
        component={RouterLink}
        to={"/api/users/resend-verification-account"}
        underline="hover"
        color="#77A787"
        sx={{ fontSize: 16, textAlign: "center" }}
      >
        ¿No recibiste el correo? Reenviar
      </Link>
    </Box>
  );
}
