
import Stack from "@mui/material/Stack";
import InputsRegisterForm from "./LoginInputsRegisterForm";
import CommerceInputsRegisterForm from "./CommerceInputsRegisterForm";
import { useEditCommerce } from "@/modules/commerce/hooks/useEditCommerce";
import ImageUpload from "./ImageUpload";
import CustomTitle from "@/shared/components/CustomTitle";
import CustomButton from "@/shared/components/CustomButton";
import { CircularProgress, Box } from "@mui/material";
import type { CommerceResponse } from "../interfaces/commerce.interface";

interface CommerceEditFormProps {
  commerceId: string;
  initialData?: CommerceResponse;
  isLoading?: boolean;
}

export default function CommerceEditForm({
  commerceId,
  initialData,
  isLoading = false,
}: CommerceEditFormProps) {
  const { register, handleSubmit, control, errors, onSubmit, isPending } =
    useEditCommerce(commerceId, initialData);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomTitle text="Editar Comercio" />

        <Stack spacing={2} sx={{ mt: 3 }}>
          <ImageUpload
            register={register}
            error={errors?.profilePhoto?.message}
            currentImage={initialData?.profilePhoto}
          />
          <InputsRegisterForm 
            register={register} 
            errors={errors}
            isEditMode={true}
          />
        </Stack>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <CommerceInputsRegisterForm
            control={control}
            errors={errors}
            register={register}
          />
        </Stack>
        <Stack spacing={2} sx={{ mt: 4 }}>
          <CustomButton
            text="Actualizar"
            type="submit"
            fullWidth
            isLoading={isPending}
          />
        </Stack>
      </form>
    </>
  );
}