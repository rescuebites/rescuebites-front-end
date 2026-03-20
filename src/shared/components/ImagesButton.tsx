import { Button, CircularProgress } from "@mui/material";
import React from "react";

interface ImagesButtonProps {
  type?: "button" | "submit" | "reset";
  text?: string;
  isLoading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  backgroundColor?: string;
  children?: React.ReactNode;
  [key: string]: any; 
}

export default function ImagesButton({
  type = "button",
  text,
  isLoading = false,
  fullWidth = false,
  disabled = false,
  onClick,
  backgroundColor = "#77A787",
  children,
  ...rest
}: ImagesButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      variant="contained"
      fullWidth={fullWidth}
      disabled={disabled || isLoading}
      sx={{
        mt: 2,
        backgroundColor,
        fontWeight: "bold",
        textTransform: "none", 
        ...(fullWidth ? {} : { width: "80%", mx: "auto", display: "block" }),
        "&:hover": { backgroundColor: "#7fbf7f" },
      }}
      {...rest}
    >
      {isLoading ? <CircularProgress size={24} color="inherit" /> : children ?? text}
    </Button>
  );
}
