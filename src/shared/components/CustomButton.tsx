import { Button, CircularProgress, SxProps, Theme } from "@mui/material";
import {
  primaryButtonSx,
  secondaryButtonSx,
  dangerButtonSx,
} from "@/shared/styles/buttonSx";

type ButtonVariant = "primary" | "secondary" | "danger";

interface CustomButtonProps {
  type?: "button" | "submit" | "reset";
  text: string;
  isLoading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  fontSize?: number;
  onClick?: () => void;
  variant?: ButtonVariant;
  startIcon?: React.ReactNode;
  size?: "small" | "medium" | "large";
  sx?: SxProps<Theme>;
}

const variantStyles: Record<ButtonVariant, SxProps<Theme>> = {
  primary: primaryButtonSx,
  secondary: secondaryButtonSx,
  danger: dangerButtonSx,
};

const sizeStyles: Record<string, SxProps<Theme>> = {
  small: { py: 1, fontSize: 12 },
  medium: { py: 1.5, fontSize: 14 },
  large: { py: 2, fontSize: 16 },
};

export default function CustomButton({
  type = "button",
  text,
  isLoading = false,
  fullWidth = false,
  disabled = false,
  onClick,
  variant = "primary",
  startIcon,
  size = "medium",
  fontSize,
  sx,
}: CustomButtonProps) {
  const baseStyles: SxProps<Theme> = {
    borderRadius: 3,
    fontWeight: 600,
    textTransform: "none",
    "&:active": {
      transform: "scale(0.98)",
    },
  };

  const widthStyles: SxProps<Theme> = fullWidth
    ? {}
    : { width: "80%", mx: "auto", display: "block" };

  return (
    <Button
      type={type}
      onClick={onClick}
      variant="contained"
      fullWidth={fullWidth}
      disabled={disabled || isLoading}
      startIcon={!isLoading ? startIcon : undefined}
      sx={[
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        widthStyles,
        fontSize ? { fontSize } : {},
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {isLoading ? <CircularProgress size={22} color="inherit" /> : text}
    </Button>
  );
}
