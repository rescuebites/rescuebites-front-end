import Stack from "@mui/material/Stack";
import InputsRegisterForm from "./LoginInputsRegisterForm";
import CommerceInputsRegisterForm from "./CommerceInputsRegisterForm";
import { useRegisterCommerce } from "@/modules/commerce/hooks/useRegisterCommerce";
import ImageUpload from "./ImageUpload";
import CustomTitle from "@/shared/components/CustomTitle";
import CustomButton from "@/shared/components/CustomButton";

export type Inputs = {
  // Datos del usuario
  email: string;
  password: string;
  confirmPassword: string;

  // Datos del comercio
  name: string;
  description?: string;
  commerceTypes: string[];
  openingHours: string;
  address: string;
  locality: string;
  phone: string;       
  profilePhoto: File; 
};

export default function RegisterForm() {
  const { register, handleSubmit, control, errors, onSubmit, isPending, setValue } =
    useRegisterCommerce();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomTitle text="Registrar Comercio" />

        <Stack spacing={2} sx={{ mt: 3 }}>
          <ImageUpload
            setValue={setValue}
            error={errors?.profilePhoto?.message}
          />
          <InputsRegisterForm register={register} errors={errors} />
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
            text="Registrar"
            type="submit"
            fullWidth
            isLoading={isPending}
          ></CustomButton>
        </Stack>
      </form>
    </>
  );
}
