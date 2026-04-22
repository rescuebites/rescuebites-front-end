import BackButton from "@/shared/components/ui/BackButton";
import CustomTitle from "@/shared/components/CustomTitle";
import { Box } from "@mui/material";

export default function UnauthorizedPage() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        px: 3,
        backgroundColor: "#f7f7f5",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: { xs: "8px", sm: "12px", md: "16px" },
          left: { xs: "8px", sm: "12px", md: "16px" },
          zIndex: 10,
        }}
      >
        <BackButton />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          component="img"
          src="/NotLoggedInBag.png"
          alt="Acceso denegado"
          sx={{
            width: { xs: 210, sm: 240, md: 260 },
            mb: 2,
            userSelect: "none",
            pointerEvents: "none",
          }}
        />

        <CustomTitle
          text="Usted no tiene permiso para acceder a este recurso."
          variant="body1"
          align="center"
          color="#555"
          fontWeight={400}
          fontSize="23px"
        />
      </Box>
    </Box>
  );
}
