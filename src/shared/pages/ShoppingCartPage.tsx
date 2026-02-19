import ClientNavbar from "../components/layout/ClientNavbar";
import { Typography } from "@mui/material";

export default function ShoppingCartPage() {
    return (
        <>
        <Typography variant="h5" sx={{ mb: 2 }}>
            Prueba del Bottom Navbar en carrito
        </Typography>
        <ClientNavbar />
        </>
    );
}