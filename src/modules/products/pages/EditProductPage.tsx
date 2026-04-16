import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { UpdateProductSchema } from "../schemas/updateProductSchema";
import CustomTitle from "@/shared/components/CustomTitle";
import BackButton from "@/shared/components/ui/BackButton";
import { CommerceType } from "@/modules/commerce/enums/commerce-type.enum";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import { CreateProductForm } from "../components/CreateProductForm";
import LoadingState from "@/shared/components/LoadingState";
import { useProductById } from "../hooks/useProductById";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import { useDeleteImage } from "@/shared/hooks/useDeleteImage";

export const EditProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const commerceId = useAuthStore((state) => state.commerceId);
  const commerceType = useAuthStore((state) => state.commerceType);
  const showMessage = useSnackbarStore((state) => state.showMessage);
  const navigate = useNavigate();

  const { data: product, isLoading } = useProductById(commerceId, productId);
  const canEditProduct = Boolean(commerceId && commerceType && productId);
  const { mutate, isPending } = useUpdateProduct(commerceId, productId);

  const { handleDeleteImage, isPending: isDeletingImage } = useDeleteImage({
    queryKey: ["product", productId],
  });

  const handleSubmit = (data: UpdateProductSchema) => {
    if (!canEditProduct) {
      showMessage(
        "No se pudo obtener la información necesaria para editar el producto.",
        "error"
      );
      return;
    }
    mutate({ data, images: data.images ?? [] });
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!product) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <CustomTitle text="Producto no encontrado" />
      </Box>
    );
  }

  return (
    <Box>
      <BackButton
        sx={{ position: "absolute", left: 14, top: 14 }}
        onClick={() => navigate("/commerce", { replace: true })}
      />
      <CustomTitle text="Editar Producto" />
      <CreateProductForm
        commerceType={commerceType as CommerceType}
        isPending={isPending || isDeletingImage}
        canCreateProduct={canEditProduct}
        onSubmit={handleSubmit}
        onDeleteImage={handleDeleteImage}
        initialData={product}
        isEditMode={true}
      />
    </Box>
  );
};
