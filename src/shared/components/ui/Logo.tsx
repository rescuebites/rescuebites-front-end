import { Paper } from "@mui/material";

interface LogoProps {
    width?: number | string;
    height?: number | string;
}   

export function Logo({width, height}: LogoProps){
    return (
        <Paper
            elevation={3}
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