import { Paper, SxProps, Theme } from "@mui/material";

interface LogoProps {
    width?: number | string;
    height?: number | string;
    elevation?: number;
    sx?: SxProps<Theme>;
}   

export function Logo({ width, height, elevation = 3, sx }: LogoProps) {
    return (
        <Paper
            elevation={elevation}
            component="img"
            src="/logo.png"
            alt="Logo"
            sx={{
                width,
                height,
                objectFit: "contain",
                display: "block",
                borderRadius: 2,
                mx: "auto",
            }}
        />
    );
}