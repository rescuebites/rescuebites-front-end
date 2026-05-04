import React from "react";
import { IconButton, SxProps, Theme } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

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
        alignSelf: "flex-start",
        display: "flex",
        width: { xs: 36, sm: 40 },
        height: { xs: 36, sm: 40 },
        "&:hover": {
          backgroundColor: "rgba(119, 167, 135, 0.1)",
          transform: "translateX(-2px)",
        },
        transition: "all 0.2s",
        ...sx,
      }}
      aria-label="Volver atrás"
    >
      <ArrowBack
        sx={{
          fontSize: { xs: 22, sm: 24 },
          color: "#77A787",
        }}
      />
    </IconButton>
  );
};

export default BackButton;
