import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface NotLoggedInScreenProps {
  imageSrc?: string;
  loginPath?: string;
}

export default function NotLoggedInScreen({
  imageSrc = "/../../../../public/NotLoggedInBag.png",
  loginPath = "/auth/login",
}: NotLoggedInScreenProps) {
  const navigate = useNavigate();

  return (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100%",
            px: 4,
            backgroundColor: "#f7f7f5",
        }}
        >
      {/* Imagen bolsita */}
      <Box
        component="img"
        src={imageSrc}
        alt="Bolsita bloqueada"
        sx={{
          width: { xs: 270, sm: 310, md: 320 },
          mb: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      />

      {/* Mensaje */}
      <Typography
        variant="body1"
        align="center"
        sx={{
          color: "#555",
          fontWeight: 400,
          fontSize: {xs:"21px", sm:"26px", md:"30px"},
          lineHeight: 1.6,
          mb: 7,
          whiteSpace: "pre-line",
        }}
      >
        Inicie sesión para acceder a esta sección y disfrutar de todas las funcionalidades que ofrecemos.
      </Typography>

      {/* Botón login */}
      <Button
        variant="contained"
        onClick={() => navigate(loginPath)}
        sx={{
          backgroundColor: "#2e7d55",
          color: "#fff",
          borderRadius: "20px",
          mb: 20,
          paddingX: 4,
          paddingY: 1.5,
          fontWeight: 600,
          fontSize: {xs:"16px", sm:"20px", md:"24px"},
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#25694a",
            boxShadow: "none",
          },
        }}
      >
        Iniciar Sesión
      </Button>
    </Box>
  );
}