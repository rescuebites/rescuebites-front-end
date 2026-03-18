import Stack from "@mui/material/Stack";
import InputsRegisterForm from "../components/LoginInputsRegisterForm";
import CommerceInputsRegisterForm from "../components/CommerceInputsRegisterForm";
import { useCommerceRegistrationForm } from "@/modules/commerce/hooks/useCommerceRegistrationForm";
import ImageUpload from "../components/ImageUpload";
import CustomTitle from "@/shared/components/CustomTitle";
import CustomButton from "@/shared/components/CustomButton";


export default function RegisterForm() {
  const { register, handleSubmit, control, errors, onSubmit, isPending, setValue, watch, trigger } =
    useCommerceRegistrationForm();

    register("profilePhoto", { required: "La imagen del comercio es obligatoria" });
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomTitle text="Registrar Comercio" />

        <Stack spacing={2} sx={{ mt: 3 }}>
          <ImageUpload
            setValue={setValue}
            trigger={trigger}
            error={errors?.profilePhoto?.message}
          />
          <InputsRegisterForm register={register} errors={errors} watch={watch} />
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
            text="Siguiente"
            type="submit"
            fullWidth
            isLoading={isPending}
          ></CustomButton>
        </Stack>
      </form>
    </>
  );
}
