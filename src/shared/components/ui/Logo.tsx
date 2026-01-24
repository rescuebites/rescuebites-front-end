import { Paper, SxProps, Theme } from "@mui/material";

interface LogoProps {
    width?: number | string | { xs?: number; sm?: number; md?: number };
    height?: number | string | { xs?: number; sm?: number; md?: number };
    elevation?: number;
    sx?: SxProps<Theme>;  // 👈 Agregar sx props para mayor flexibilidad
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
                ...sx,  // 👈 Permite sobrescribir estilos si es necesario
            }}
        />
    );
}