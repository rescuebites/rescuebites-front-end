import { Paper, Box, IconButton, Badge } from "@mui/material";
import { 
  MdHome, 
  MdGridView, 
  MdShoppingCart, 
  MdNotifications, 
  MdPerson 
} from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";

export default function ClientNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Función para saber si una ruta está activa y resaltar el ícono correspondiente
  const isActive = (path: string) => location.pathname === path;

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
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: 70,
          maxWidth: '600px',
          mx: 'auto',
          px: 2,
          position: 'relative',
        }}
      >
        {/* Home */}
        <IconButton
          onClick={() => navigate('/home')}
          sx={{
            color: isActive('/home') ? '#77A787' : '#757575',
            transition: 'color 0.2s',
            '&:hover': {
              bgcolor: 'rgba(119, 167, 135, 0.08)',
            },
          }}
        >
          <MdHome size={26} />
        </IconButton>

        {/* Categories/Grid */}
        <IconButton
          onClick={() => navigate('/orders')}
          sx={{
            color: isActive('/orders') ? '#77A787' : '#757575',
            transition: 'color 0.2s',
            '&:hover': {
              bgcolor: 'rgba(119, 167, 135, 0.08)',
            },
          }}
        >
          <MdGridView size={26} />
        </IconButton>

        {/* Cart - Botón central elevado */}
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <IconButton
            onClick={() => navigate('/cart')}
            sx={{
              width: 64,
              height: 64,
              bgcolor: '#77A787',
              color: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(119, 167, 135, 0.4)',
              '&:hover': {
                bgcolor: '#6B9A7B',
                boxShadow: '0 6px 16px rgba(119, 167, 135, 0.5)',
              },
              transition: 'all 0.2s',
            }}
          >
            <Badge
              badgeContent={3}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  top: 8,
                  right: 8,
                  fontSize: 11,
                  fontWeight: 700,
                },
              }}
            >
              <MdShoppingCart size={28} />
            </Badge>
          </IconButton>
        </Box>

        {/* Notifications */}
        <IconButton
          onClick={() => navigate('/notifications')}
          sx={{
            color: isActive('/notifications') ? '#77A787' : '#757575',
            transition: 'color 0.2s',
            '&:hover': {
              bgcolor: 'rgba(119, 167, 135, 0.08)',
            },
          }}
        >
          <Badge
            badgeContent={2}
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                fontSize: 10,
                fontWeight: 700,
                minWidth: 18,
                height: 18,
              },
            }}
          >
            <MdNotifications size={26} />
          </Badge>
        </IconButton>

        {/* Profile */}
        <IconButton
          onClick={() => navigate('/profile')}
          sx={{
            color: isActive('/profile') ? '#77A787' : '#757575',
            transition: 'color 0.2s',
            '&:hover': {
              bgcolor: 'rgba(119, 167, 135, 0.08)',
            },
          }}
        >
          <MdPerson size={26} />
        </IconButton>
      </Box>
    </Paper>
  );
}