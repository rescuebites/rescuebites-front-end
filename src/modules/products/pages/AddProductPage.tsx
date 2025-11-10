import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import CustomTitle from "@/shared/components/CustomTitle";
import AddProductForm from "@/modules/products/components/AddProductForm";

export function AddProductPage() {
  const { commerceId } = useParams<{ commerceId: string }>();

  if (!commerceId) {
    return (
      <Box
        sx={{
          maxWidth: 520,
          mx: "auto",
          my: 8,
          p: 4,
          borderRadius: 4,
          backgroundColor: "#fef3f2",
          border: "1px solid #f8d7da",
        }}
      >
        <Typography variant="h6" color="#b42318" align="center" fontWeight={600}>
          No se pudo identificar el comercio para registrar el producto.
        </Typography>
        <Typography
          variant="body2"
          color="#78350f"
          align="center"
          sx={{ mt: 2 }}
        >
          Intenta acceder nuevamente desde la sección de tu comercio o verifica
          que la URL contenga el identificador correcto.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 560,
        mx: "auto",
        my: 4,
      }}
    >
      <CustomTitle text="Añadir Producto - Detalles" align="left" color="#1c2a3a" />
      <Typography variant="body2" color="#607080" sx={{ mb: 2 }}>
        Completa la información para publicar una nueva oferta en tu comercio.
      </Typography>
      <AddProductForm commerceId={commerceId} />
    </Box>
  );
}
