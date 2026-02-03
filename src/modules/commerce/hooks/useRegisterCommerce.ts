import { useForm, SubmitHandler } from "react-hook-form";
import type { Inputs } from "@/modules/commerce/components/CommerceRegisterForm";
import { useRegisterCommerceMutation } from "../hooks/useMutationRegisterCommerce";

export const useRegisterCommerce = () => {
  const { mutateAsync, isPending } = useRegisterCommerceMutation(); //ejecuta la mutation para enviar los datos del formulario al back de forma asincrónica, isPending para saber si la mutación está en curso

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      commerceTypes: [],
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    //envía los datos al back y resetea el formulario
    await mutateAsync(data);
    reset();
  };

  return {
    register,
    handleSubmit,
    control,
    setValue,                                                            
    errors,
    onSubmit,
    isPending,
  };
};
