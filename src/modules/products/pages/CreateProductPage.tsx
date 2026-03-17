import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { CreateProductSchema } from "../schemas/createProductSchema";
import { useCreateProduct } from "../hooks/useCreateProduct";
import CustomTitle from "@/shared/components/CustomTitle";
import BackButton from "@/shared/components/ui/BackButton";
import { CommerceTypeEnum } from "@/shared/enums/commerce-type.enum";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import { CreateProductForm } from "../components/CreateProductForm";

export const CreateProductPage = () => {
  const commerceId = useAuthStore((state) => state.commerceId);
  const commerceType = useAuthStore((state) => state.commerceType);
  const showMessage = useSnackbarStore((state) => state.showMessage);
  const navigate = useNavigate();

  const canCreateProduct = Boolean(commerceId && commerceType);
  const { mutate, isPending } = useCreateProduct(commerceId);

  const handleSubmit = (data: CreateProductSchema) => {
    if (!canCreateProduct) {
      showMessage(
        "No se pudo obtener commerceId o commerceType desde el token.",
        "error"
      );
      return;
    }
    mutate({ data, images: data.images });
  };

  return (
    <Box>
      <BackButton
        sx={{ position: "absolute", left: 14, top: 14 }}
        onClick={() => navigate("/home", { replace: true })}
      />
      <CustomTitle text="Registrar Producto" />
      <CreateProductForm
        commerceType={commerceType ?? CommerceTypeEnum.GREENGROCERY}
        isPending={isPending}
        canCreateProduct={canCreateProduct}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};
