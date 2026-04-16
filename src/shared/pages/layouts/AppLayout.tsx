//Diseño básico idéntico para todas las pantallas y roles
import { Box } from "@mui/material";
import Header from "../../components/layout/Header";
import { Outlet } from "react-router-dom";

interface CustomerLayoutProps {
  navbar?:React.ReactNode
}

export default function AppLayout({navbar}:CustomerLayoutProps) {
  return (
     <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      
      {/* Contenido scrolleable */}
      <Box sx={{ flex: 1, overflow: "auto", pb: "56px", backgroundColor: "#F9F9F9" }}>
        <Header/>
        <Outlet />
      </Box>

      {/* Navbar fija abajo -> en las rutas se importa la navbar asociada al rol */}
      <Box sx={{ position: "fixed", bottom: 0, width: "100%", backgroundColor: "#F9F9F9" }}>
        {navbar}
      </Box>

    </Box>
  );
}