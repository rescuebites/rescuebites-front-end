import { Box } from "@mui/material";
import ClientNavbar from "../ui/ClientNavbar"
import { Outlet } from "react-router-dom";

export default function CustomerLayout() {
  return (
     <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      
      {/* Contenido scrolleable */}
      <Box sx={{ flex: 1, overflow: "auto", pb: "56px" }}>
        <Outlet />
      </Box>

      {/* Navbar fija abajo */}
      <Box sx={{ position: "fixed", bottom: 0, width: "100%" }}>
        <ClientNavbar />
      </Box>

    </Box>
  );
}