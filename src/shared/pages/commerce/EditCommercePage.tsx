import { useParams } from "react-router-dom";
import CommerceEditForm from "@/modules/commerce/components/CommerceEditForm";
import { useCommerceQuery } from "@/modules/commerce/hooks/useCommerceQuery";
import { Container, Alert } from "@mui/material";

export function EditCommercePage() {
  const { id } = useParams<{ id: string }>();
  
  const { data: commerce, isLoading, error } = useCommerceQuery(id || "");

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">
          Error al cargar los datos del comercio. Por favor, intenta nuevamente.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <CommerceEditForm
        commerceId={id || ""}
        initialData={commerce}
        isLoading={isLoading}
      />
    </Container>
  );
}