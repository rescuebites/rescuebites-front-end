// src/pages/TestNavbar.tsx (o donde tengas tus páginas)

import { Box, Typography, Container } from "@mui/material";
import ClientNavbar from "../components/ui/ClientNavbar";

export default function TestNavbar() {
  return (
    <Box sx={{ bgcolor: "#FFFBFA", minHeight: '100vh', pb: 10 }}>
      {/* Header simple para contexto */}
      <Box sx={{ bgcolor: '#FFFFFF', p: 2, borderBottom: '1px solid #F0F0F0' }}>
        <Typography variant="h6" sx={{ textAlign: 'center', color: '#77A787' }}>
          Test de Navbar
        </Typography>
      </Box>

      {/* Contenido de prueba */}
      <Container sx={{ pt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Prueba del Bottom Navbar
        </Typography>
        
        <Typography sx={{ mb: 2 }}>
          El navbar debería estar fijo en la parte inferior con:
        </Typography>

        <ul>
          <li>5 íconos (Home, Grid, Cart central, Notificaciones, Perfil)</li>
          <li>Carrito elevado con badge (3 items)</li>
          <li>Notificaciones con badge (2)</li>
          <li>Hover effects en todos los íconos</li>
          <li>Cambio de color al hacer click (verde cuando está activo)</li>
        </ul>

        {/* Contenido largo para probar el scroll */}
        <Box sx={{ mt: 4 }}>
          {[...Array(20)].map((_, i) => (
            <Typography key={i} sx={{ mb: 2 }}>
              Contenido de prueba línea {i + 1} - Scroll hacia abajo para ver el navbar fixed
            </Typography>
          ))}
        </Box>
      </Container>

      {/* Tu navbar */}
      <ClientNavbar />
    </Box>
  );
}