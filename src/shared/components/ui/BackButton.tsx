import React from 'react';
import { IconButton, SxProps, Theme } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

interface BackButtonProps {
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, sx }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.history.back();
    }
  };

  return (
    <IconButton
      onClick={handleClick}
      sx={{
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        width: { xs: 40, sm: 48, md: 56 },
        height: { xs: 40, sm: 48, md: 56 },
        '&:hover': {
          backgroundColor: '#77A787',
          transform: 'translateX(-2px)',
          '& .MuiSvgIcon-root': {
            color: 'white',
          },
        },
        transition: 'all 0.2s',
        ...sx,
      }}
      aria-label="Volver atrás"
    >
      <ArrowBack 
        sx={{ 
          fontSize: { xs: 20, sm: 24, md: 28 }, 
          color: '#77A787',
          transition: 'color 0.2s',
        }} 
      />
    </IconButton>
  );
};

export default BackButton;