import { Typography } from "@mui/material";

interface CustomTitleProps {
  text: string;
  color?: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2";
  align?: "inherit" | "left" | "center" | "right" | "justify";
  fontWeight?: string | number;
  fontSize?: string | number;
  fontStyle?: string;
  textDecoration?: string;
}

export default function CustomTitle({
  text,
  color = "#77A787",
  variant = "h5",
  align = "center",
  fontWeight = "bold",
  fontSize,
  fontStyle,
  textDecoration,
}: CustomTitleProps) {
  return (
    <Typography
      variant={variant}
      align={align}
      gutterBottom
      sx={{ fontWeight, color, fontSize, fontStyle, textDecoration }}
    >
      {text}
    </Typography>
  );
}