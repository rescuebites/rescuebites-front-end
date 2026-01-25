import { Paper, Box, IconButton, Badge, useMediaQuery, useTheme } from "@mui/material";
import { 
  MdHome, 
  MdGridView, 
  MdShoppingCart, 
  MdNotifications, 
  MdPerson 
} from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function ClientNavbar() {
  const navigate = useNavigate(); //Hook para navegar
  const [activeTab, setActiveTab] = useState('home');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  //Función para manejar navegación con tipos
  const handleNavigation = (route: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(route);
  };

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        bgcolor: '#FFFFFF',
        borderTop: '1px solid #F0F0F0',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr auto 1fr 1fr', // 👈 Grid para espaciado equitativo
          alignItems: 'center',
          gap: { xs: 2, sm: 4, md: 8, lg: 12, xl: 16 }, // 👈 Espacio entre columnas MUY amplio
          height: { xs: 70, sm: 80, md: 90 },
          maxWidth: { xs: '100%', sm: '700px', md: '1000px', lg: '1800px', xl: '2200px' }, // 👈 Ancho máximo muy amplio
          mx: 'auto',
          px: { xs: 3, sm: 4, md: 8, lg: 12, xl: 16 }, // 👈 Padding lateral muy amplio
          position: 'relative',
        }}
      >
        {/* Home */}
        <IconButton
          onClick={() => handleNavigation('/home', 'home')} //Navega a home
          sx={{
            color: activeTab === 'home' ? '#77A787' : '#757575',
            transition: 'color 0.2s',
            width: { xs: 48, md: 56, lg: 64 },
            height: { xs: 48, md: 56, lg: 64 },
            justifySelf: 'center', 
            '&:hover': {
              bgcolor: 'rgba(119, 167, 135, 0.08)',
            },
          }}
        >
          <MdHome size={isMobile ? 26 : 32} />
        </IconButton>

        {/* orders/Grid */}
        <IconButton
          onClick={() => handleNavigation('/customer/orders', 'orders')} //Navega a pedidos
          sx={{
            color: activeTab === 'orders' ? '#77A787' : '#757575',
            transition: 'color 0.2s',
            width: { xs: 48, md: 56, lg: 64 },
            height: { xs: 48, md: 56, lg: 64 },
            justifySelf: 'center',
            '&:hover': {
              bgcolor: 'rgba(119, 167, 135, 0.08)',
            },
          }}
        >
          <MdGridView size={isMobile ? 26 : 32} />
        </IconButton>

        {/* Cart - Botón central elevado */}
        <Box
          sx={{
            position: 'relative',
            justifySelf: 'center',
          }}
        >
          <IconButton
            onClick={() => handleNavigation('/customer/cart', 'cart')} //Navega al carrito
            sx={{
              width: { xs: 64, md: 76, lg: 88 },
              height: { xs: 64, md: 76, lg: 88 },
              bgcolor: '#77A787',
              color: '#FFFFFF',
              border: '4px solid #FFFFFF', 
              boxShadow: '0 4px 12px rgba(119, 167, 135, 0.4)',
              position: 'relative',
              top: { xs: -32, md: -38, lg: -44 }, 
              '&:hover': {
                bgcolor: '#6B9A7B',
                boxShadow: '0 6px 16px rgba(119, 167, 135, 0.5)',
              },
              transition: 'all 0.2s',
            }}
          >
            <Badge
              badgeContent={0} //modificar para mostrar número de items en el carrito
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  top: { xs: 8, md: 10, lg: 12 },
                  right: { xs: 8, md: 10, lg: 12 },
                  fontSize: { xs: 11, md: 13, lg: 14 },
                  fontWeight: 700,
                  minWidth: { xs: 20, md: 24, lg: 26 },
                  height: { xs: 20, md: 24, lg: 26 },
                },
              }}
            >
              <MdShoppingCart size={isMobile ? 28 : 36} />
            </Badge>
          </IconButton>
        </Box>

        {/* Notifications */}
        <IconButton
          onClick={() => handleNavigation('/customer/notifications', 'notifications')} //Navega a notificaciones
          sx={{
            color: activeTab === 'notifications' ? '#77A787' : '#757575',
            transition: 'color 0.2s',
            width: { xs: 48, md: 56, lg: 64 },
            height: { xs: 48, md: 56, lg: 64 },
            justifySelf: 'center',
            '&:hover': {
              bgcolor: 'rgba(119, 167, 135, 0.08)',
            },
          }}
        >
          <Badge
            badgeContent={0} //modificar para mostrar número de notificaciones sin leer
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                fontSize: { xs: 10, md: 12, lg: 13 },
                fontWeight: 700,
                minWidth: { xs: 18, md: 22, lg: 24 },
                height: { xs: 18, md: 22, lg: 24 },
              },
            }}
          >
            <MdNotifications size={isMobile ? 26 : 32} />
          </Badge>
        </IconButton>

        {/* Profile */}
        <IconButton
          onClick={() => handleNavigation('/customer/profile', 'profile')} //Navega a perfil
          sx={{
            color: activeTab === 'profile' ? '#77A787' : '#757575',
            transition: 'color 0.2s',
            width: { xs: 48, md: 56, lg: 64 },
            height: { xs: 48, md: 56, lg: 64 },
            justifySelf: 'center',
            '&:hover': {
              bgcolor: 'rgba(119, 167, 135, 0.08)',
            },
          }}
        >
          <MdPerson size={isMobile ? 26 : 32} />
        </IconButton>
      </Box>
    </Paper>
  );
}