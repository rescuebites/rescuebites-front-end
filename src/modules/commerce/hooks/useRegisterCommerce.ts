import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import type { Inputs } from "@/modules/commerce/interfaces/createCommerce.interface";
import { registerUser } from "@/modules/auth/api/auth.api";
import { usePendingRegistrationStore } from "@/modules/users/hooks/usePendingRegistrationStore";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import { useNavigate } from "react-router-dom";
import { Role } from "@/shared/enums/role.enum";

export const useRegisterCommerce = () => {
  const { setCommerceData } = usePendingRegistrationStore();
  const showMessage = useSnackbarStore((state) => state.showMessage);
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: Inputs) => {
      setCommerceData({
        createCommerceRequest: {
          userId: "",
          name: data.name,
          description: data.description,
          commerceTypes: data.commerceTypes,
          openingHours: data.openingHours,
          address: data.address,
          locality: data.locality,
          phone: data.phone,
        },
        profilePicture: data.profilePhoto,
      });

      await registerUser({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: Role.COMMERCE,
      });
    },
    onSuccess: () => {
      showMessage("Usuario registrado. Confirmá tu email para continuar.", "success");
      navigate("/auth/register/email-confirm", { replace: true });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Error al registrar el usuario.";
      showMessage(message, "error");
    },
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    reset,
    trigger,

  } = useForm<Inputs>({
    defaultValues: {
      commerceTypes: [],
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutateAsync(data);
    reset();
  };

  return {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    errors,
    onSubmit,
    isPending,
    trigger,
  };
};