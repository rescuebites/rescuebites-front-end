import { AppBar, Toolbar, Box, IconButton, Typography } from "@mui/material";
import { MdPerson } from "react-icons/md";
import { Logo } from "./../ui/Logo"; 

export default function Header() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ 
        bgcolor: '#FFFFFF',
        color: '#2D2D2D',
        borderBottom: '1px solid #F0F0F0'
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 }, gap: 1.5 }}>
        {/* Logo */}
        <Box
          sx={{
            width: { xs: 36, sm: 40 },
            height: { xs: 36, sm: 40 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Logo width={{ xs: 36, sm: 40 }} height={{ xs: 36, sm: 40 }} />
        </Box>
        
        {/* Nombre RescueBites */}
        <Typography
          variant="h6"
          sx={{
            flex: 1,
            fontWeight: 700,
            fontSize: { xs: 16, sm: 18, md: 20 },
            color: '#77A787',
            letterSpacing: '-0.5px',
          }}
        >
          RescueBites
        </Typography>

        {/* Ícono de usuario */}
        <IconButton 
          color="inherit" 
          aria-label="account"
          sx={{ 
            color: '#2D2D2D',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
          }}
        >
          <MdPerson size={24} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}