import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { Logo } from "./../ui/Logo"; 

export default function Header() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ 
        bgcolor: 'transparent',
        color: '#2D2D2D',
        borderBottom: 'none',
        backgroundColor: "white"
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 }, gap: 1.5, py:{xs:2, sm:1.5} }}>
        {/* Logo */}
        <Box
          sx={{
            width: { xs: 48, sm: 40 },
            height: { xs: 48, sm: 40 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
          }}
        >
          <Logo width={{ xs: 48, sm: 40 }} height={{ xs: 48, sm: 40 }} />
        </Box>
        
        {/* Nombre RescueBites */}
        <Typography
          variant="h6"
          sx={{
            flex: 1,
            fontWeight: 700,
            fontSize: { xs: 22, sm: 18, md: 20 },
            color: '#77A787',
            letterSpacing: '-0.5px',
          }}
        >
          RescueBites
        </Typography>

      </Toolbar>
    </AppBar>
  );
}