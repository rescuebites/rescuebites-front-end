import { Button, CircularProgress, SxProps, Theme } from "@mui/material";

interface CustomButtonProps {
  type?: "button" | "submit" | "reset";
  text: string;
  isLoading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  backgroundColor?: string;
  sx?: SxProps<Theme>;
}

export default function CustomButton({
  type = "button",
  text,
  isLoading = false,
  fullWidth = false,
  disabled = false,
  onClick,
  backgroundColor = "#77A787",
  sx,
}: CustomButtonProps) {
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
        ...(fullWidth ? {} : { width: "80%", mx: "auto", display: "block" }),
        "&:hover": { backgroundColor: "#7fbf7f" },
        ...sx,
      }}
    >
      {isLoading ? <CircularProgress size={24} color="inherit" /> : text}
    </Button>
  );
}