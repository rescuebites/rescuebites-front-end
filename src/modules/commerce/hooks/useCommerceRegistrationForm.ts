//hook para guardar datos en el store y navegar a la página de horarios
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  registerCommerceSchema,
  RegisterCommerceSchema,
} from "../schemas/registerCommerceSchema";
import { usePendingRegistrationStore } from "@/modules/users/hooks/usePendingRegistrationStore";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import { useNavigate } from "react-router-dom";

export const useCommerceRegistrationForm = () => {
  const {
    commerceData,
    pendingUserCredentials,
    pendingCommerceImages,
    setCommerceData,
    setPendingUserCredentials,
    setPendingCommerceImages,
  } = usePendingRegistrationStore();
  const showMessage = useSnackbarStore((state) => state.showMessage);
  const navigate = useNavigate();

  // Imágenes previas guardadas en el store (cuando el usuario vuelve desde BusinessHoursPage)
  const storedCommerceImages = pendingCommerceImages;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: RegisterCommerceSchema) => {
      setPendingUserCredentials({
        //se guardan las credenciales por separado para no mezclar lógica de user y commerce
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      // Guardar todas las imágenes en el store para poder restaurarlas al volver
      setPendingCommerceImages(data.profilePhotos ?? []);
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
      });
    },
    onSuccess: () => {
      navigate("/commerce/schedule", { replace: true });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Error al guardar los datos.";
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
  } = useForm<RegisterCommerceSchema>({
    resolver: zodResolver(registerCommerceSchema),
    defaultValues: {
      // Rellenar con datos del store si el usuario volvió desde BusinessHoursPage
      email: pendingUserCredentials?.email ?? "",
      password: pendingUserCredentials?.password ?? "",
      confirmPassword: pendingUserCredentials?.confirmPassword ?? "",
      name: commerceData?.createCommerceRequest.name ?? "",
      description: commerceData?.createCommerceRequest.description ?? "",
      commerceTypes: commerceData?.createCommerceRequest.commerceTypes ?? [],
      address: commerceData?.createCommerceRequest.address ?? "",
      locality: commerceData?.createCommerceRequest.locality ?? "",
      phone: commerceData?.createCommerceRequest.phone ?? "",
      // La validación del file la maneja MultiImageUpload vía setValue
      profilePhotos:
        storedCommerceImages.length > 0 ? storedCommerceImages : undefined,
    },
  });

  const onSubmit: SubmitHandler<RegisterCommerceSchema> = async (data) => {
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
    storedCommerceImages,
  };
};
