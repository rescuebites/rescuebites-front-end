import { AppBar, Toolbar, Box, IconButton, Typography } from "@mui/material";
import { MdPerson } from "react-icons/md";

export default function Header() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: "#f8fbf8", color: "#0e1b0e" }}
    >
      <Toolbar sx={{ px: 2 }}>
        <Box
          sx={{ width: 48, height: 48, display: "flex", alignItems: "center" }}
        ></Box>
        <Typography
          variant="h6"
          sx={{
            flex: 1,
            textAlign: "center",
            fontWeight: 700,
            fontSize: { xs: 18, sm: 20, md: 22 }, // 👈 cambia tamaño
          }}
        >
          RescueBites
        </Typography>

        <Box sx={{ width: 48, display: "flex", justifyContent: "flex-end" }}>
          <IconButton color="inherit" aria-label="account">
            <MdPerson size={24} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
