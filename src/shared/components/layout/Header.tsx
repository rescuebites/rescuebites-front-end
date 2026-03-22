import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { Logo } from "./../ui/Logo";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { clientId, commerceId } = useAuthStore();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (clientId) {
      navigate("/customer");
    } else if (commerceId) {
      navigate("/auth/create-product");
    }
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "transparent",
        color: "#2D2D2D",
        borderBottom: "none",
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 }, gap: 1.5, py: { xs: 2, sm: 1.5 } }}>
        {/* Logo */}
        <Box
          onClick={handleLogoClick}
          sx={{
            width: { xs: 48, sm: 40 },
            height: { xs: 48, sm: 40 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
            cursor: "pointer",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <Logo width={48} height={48} />
        </Box>

        {/* Nombre RescueBites */}
        <Typography
          variant="h6"
          onClick={handleLogoClick}
          sx={{
            flex: 1,
            fontWeight: 700,
            fontSize: { xs: 22, sm: 18, md: 20 },
            color: "#77A787",
            letterSpacing: "-0.5px",
            cursor: "pointer",
            transition: "color 0.2s",
            "&:hover": {
              color: "#5A9A6E",
            },
          }}
        >
          RescueBites
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
