//hook para guardar datos en el store y navegar a la página de horarios
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Inputs } from "../interfaces/createCommerce.interface";
import { usePendingRegistrationStore } from "@/modules/users/hooks/usePendingRegistrationStore";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import { useNavigate } from "react-router-dom";

export const useCommerceRegistrationForm = () => {
  const { setCommerceData, setPendingUserCredentials } = usePendingRegistrationStore();
  const showMessage = useSnackbarStore((state) => state.showMessage);
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: Inputs) => {
      setPendingUserCredentials({  //se guardan las credenciales por separado para no mezclar lógica de user y commerce
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      setCommerceData({
        createCommerceRequest: {
          userId: "",
          name: data.name,
          description: data.description,
          commerceTypes: data.commerceTypes,
          businessHours: [],
          address: data.address,
          locality: data.locality,
          phone: data.phone,
        },
        profilePicture: data.profilePhoto,
      });
    },
    onSuccess: () => {
      navigate("/register-commerce/schedule", { replace: true });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Error al guardar los datos.";
      showMessage(message, "error");
    },
  });

  const { register, handleSubmit, control, setValue, watch, formState: { errors }, reset, trigger } =
    useForm<Inputs>({ defaultValues: { commerceTypes: [] } });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutateAsync(data);
    reset();
  };

  return { register, handleSubmit, control, setValue, watch, errors, onSubmit, isPending, trigger };
};


