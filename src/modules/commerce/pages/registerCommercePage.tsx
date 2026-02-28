import Stack from "@mui/material/Stack";
import InputsRegisterForm from "../components/LoginInputsRegisterForm";
import CommerceInputsRegisterForm from "../components/CommerceInputsRegisterForm";
import { useRegisterCommerce } from "@/modules/commerce/hooks/useRegisterCommerce";
import ImageUpload from "../components/ImageUpload";
import CustomTitle from "@/shared/components/CustomTitle";
import CustomButton from "@/shared/components/CustomButton";


export default function RegisterForm() {
  const { register, handleSubmit, control, errors, onSubmit, isPending, setValue, watch, trigger } =
    useRegisterCommerce();

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
