import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import type { Inputs } from "@/modules/commerce/components/CommerceRegisterForm";
import { registerUser } from "@/modules/auth/api/auth.api";
import { usePendingRegistrationStore } from "@/modules/users/hooks/usePendingRegistrationStore";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import { useNavigate } from "react-router-dom";
import { Role } from "@/shared/enums/role.enum";
import type { CreateCommerceParams } from "../interfaces/createCommerce.interface";

export const useRegisterCommerce = () => {
  const { setCommerceData } = usePendingRegistrationStore();
  const showMessage = useSnackbarStore((state) => state.showMessage);
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: Inputs) => {
      // Paso 1: registrar el usuario
      await registerUser({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: Role.COMMERCE,
      });

      // Paso 2: guardar datos del comercio en el store para después del login
      const commerceParams: CreateCommerceParams = {
        createCommerceRequest: {
          userId: "",                          // Se va a setear después del login con el userId real
          name: data.name,
          description: data.description,
          commerceTypes: data.commerceTypes,
          openingHours: data.openingHours,
          address: data.address,
          locality: data.locality,
          phone: data.phone,
        },
        profilePicture: data.profilePhoto,
      };

      setCommerceData(commerceParams);
    },
    onSuccess: () => {
      showMessage("Usuario registrado. Confirmá tu email para continuar.", "success");
      navigate("/auth/register/email-confirm", { replace: true });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Error al registrar el comercio.";
      showMessage(message, "error");
    },
  });

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