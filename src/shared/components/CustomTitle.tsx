import { Typography } from "@mui/material";

interface CustomTitleProps {
  text: string;
  color?: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2";
  align?: "inherit" | "left" | "center" | "right" | "justify";
}

export default function CustomTitle({
  text,
  color = "#77A787",
  variant = "h5",
  align = "center",
}: CustomTitleProps) {
  return (
    <Typography
      variant={variant}
      align={align}
      gutterBottom
      sx={{ fontWeight: "bold", color }}
    >
      {text}
    </Typography>
  );
}