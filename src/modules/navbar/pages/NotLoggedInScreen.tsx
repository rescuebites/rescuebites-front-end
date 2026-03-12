import CustomButton from "@/shared/components/CustomButton";
import BackButton from "@/shared/components/ui/BackButton";
import { Box, Typography } from "@mui/material";
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
          flex: 1,
          width: "100%",
          px: 3,
          backgroundColor: "#f7f7f5",
        }}
        >
      {/* Botón volver para atrás */}
      <Box sx={{ pt: { xs: 1, sm: 1, md: 1 }, alignSelf: 'flex-start' }}>
        <BackButton onClick={() => navigate('/public')}/>
      </Box>
      {/* Imagen bolsita */}
      <Box
        component="img"
        src={imageSrc}
        alt="Bolsita bloqueada"
        sx={{
          width: { xs: 210, sm: 240, md: 260 },
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
          fontSize: {xs:"16px", sm:"23px", md:"26px"},
          lineHeight: 1.6,
          mb: 3,
          whiteSpace: "pre-line",
        }}
      >
        Inicie sesión para acceder a esta sección y disfrutar de todas las funcionalidades que ofrecemos.
      </Typography>

      {/* Botón login */}
      <CustomButton
        text="Iniciar Sesión"
        type="button"
        onClick={() => navigate(loginPath)}
        sx={{
          mb: 20,
          paddingX: 4,
          paddingY: 1.5,
          width: 230,
          fontSize: {xs:"14px", sm:"16px", md:"18px"},
        }}
      >
      </CustomButton>
    </Box>
  );
}