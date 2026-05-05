import { Typography, SxProps, Theme } from "@mui/material";
import type { ResponsiveStyleValue } from "@mui/system";

interface CustomTitleProps {
  text: string;
  color?: string;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2";
  align?: "inherit" | "left" | "center" | "right" | "justify";
  fontWeight?: string | number;
  fontSize?: ResponsiveStyleValue<string | number>;
  fontStyle?: string;
  textDecoration?: string;
  sx?: SxProps<Theme>;
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
  sx,
}: CustomTitleProps) {
  return (
    <Typography
      variant={variant}
      align={align}
      gutterBottom
      sx={(theme: Theme) => {
        const base = {
          fontWeight,
          color,
          fontSize,
          fontStyle,
          textDecoration,
        } as any;
        if (!sx) return base;
        if (typeof sx === "function") {
          return { ...base, ...(sx(theme) as any) };
        }
        if (Array.isArray(sx)) {
          return sx.reduce((acc: any, item: any) => {
            if (!item) return acc;
            if (typeof item === "function") {
              return { ...acc, ...(item(theme) as any) };
            }
            return { ...acc, ...(item as any) };
          }, base);
        }
        return { ...base, ...(sx as any) };
      }}
    >
      {text}
    </Typography>
  );
}
