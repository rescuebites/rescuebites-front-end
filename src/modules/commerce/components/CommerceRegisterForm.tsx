import Stack from "@mui/material/Stack";
import InputsRegisterForm from "./LoginInputsRegisterForm";
import CommerceInputsRegisterForm from "./CommerceInputsRegisterForm";
import { useRegisterCommerce } from "@/modules/commerce/hooks/useRegisterCommerce";
import ImageUpload from "./ImageUpload";
import CustomTitle from "@/shared/components/CustomTitle";
import CustomButton from "@/shared/components/CustomButton";
import { getCommerceProfile } from "../services/updateCommerce";
import { useEffect, useState } from "react";
import type { Inputs } from "../interfaces/createCommerceInteface";

type Props = {
  mode?: "create" | "edit";
  commerceId?: string;
};

export default function CommerceForm({ mode = "create", commerceId }: Props) {
  const [initialValues, setInitialValues] = useState<Inputs>();
  const {
    register,
    handleSubmit,
    control,
    errors,
    onSubmit,
    isPending,
    setValue,
  } = useRegisterCommerce();

  useEffect(() => {
    if (mode === "edit" && commerceId) {
      // Fetch existing commerce data and set as initial values
      getCommerceProfile(commerceId).then((data) => {
        setInitialValues(data);
        Object.entries(data).forEach(([key, value]) => {
          setValue(key as keyof Inputs, value);
        });
      });
    }
  }, [mode, commerceId, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomTitle text="Registrar Comercio" />

        <Stack spacing={2} sx={{ mt: 3 }}>
          <ImageUpload
            register={register}
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
            text={mode === "edit" ? "Actualizar" : "Registrar"}
            type="submit"
            fullWidth
            isLoading={isPending}
          ></CustomButton>
        </Stack>
      </form>
    </>
  );
}
