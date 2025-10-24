import { useForm, SubmitHandler } from "react-hook-form";
import type { Inputs } from "@/modules/commerce/components/CommerceRegisterForm";

export const useRegisterCommerce = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      commerceTypes: [],
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return {
    register,
    handleSubmit,
    control,
    errors,
    onSubmit,
  };
};
