import { Box, Stack } from "@mui/material";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useCommerceDetail } from "../hooks/useCommerceDetail";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateCommerceSchema,
  UpdateCommerceSchema,
} from "../schemas/updateCommerceSchema";
import CustomTitle from "@/shared/components/CustomTitle";
import CustomButton from "@/shared/components/CustomButton";
import LoadingState from "@/shared/components/LoadingState";
import EmptyState from "@/shared/components/EmptyState";
import BackButton from "@/shared/components/ui/BackButton";
import EmailField from "@/modules/client/components/EmailField";
import PasswordFields from "@/modules/client/components/PasswordFields";
import CommerceBasicInfoForm from "../components/CommerceBasicInfoForm";
import { useNavigate } from "react-router-dom";
import CommerceTypesCheckboxes from "../components/CommerceTypesCheckboxes";
import { MultiImageUpload } from "@/shared/components/MultiImageUpload";
import { usePendingCommerceUpdateStore } from "../hooks/usePendingCommerceUpdateStore";
import { useState, useEffect } from "react";
import { useDeleteImage } from "@/shared/hooks/useDeleteImage";
import { checkCommerceIdentityAvailability } from "../api/commerce.api";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";

export default function EditCommercePage() {
  const navigate = useNavigate();
  const commerceId = useAuthStore((state) => state.commerceId);
  const showMessage = useSnackbarStore((state) => state.showMessage);
  const { data: commerceData, isLoading } = useCommerceDetail(commerceId);
  const {
    setUpdateData,
    setCommerceId,
    setImages,
    setHasFormChanges,
    updateData,
    images: pendingImages,
  } = usePendingCommerceUpdateStore();
  const [newImages, setNewImages] = useState<File[]>([]);
  const [hasImageChanges, setHasImageChanges] = useState(false);

  // Resetear el estado de cambios cuando se carga el comercio
  useEffect(() => {
    if (commerceData && !hasPendingData) {
      setHasImageChanges(false);
      setNewImages([]);
    } else if (hasPendingData && pendingImages.length > 0) {
      setNewImages(pendingImages);
      setHasImageChanges(true);
    }
  }, [commerceData]);

  const { handleDeleteImage, isPending: isDeletingImage } = useDeleteImage({
    queryKey: ["commerce-profile", commerceId],
    onSuccess: () => {
      setHasImageChanges(true);
    },
  });

  const handleImagesChange = (files: File[]) => {
    setNewImages(files);
    setHasImageChanges(files.length > 0);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
  } = useForm<UpdateCommerceSchema>({
    resolver: zodResolver(updateCommerceSchema),
    defaultValues: {
      name: "",
      description: "",
      commerceTypes: [],
      address: "",
      locality: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Sincronizar form: preferir datos pendientes (vuelta desde BusinessHoursPage),
  // si no hay pendientes usar los datos del servidor.
  const hasPendingData = Object.keys(updateData).length > 0;
  useEffect(() => {
    if (!commerceData) return;
    const source = hasPendingData ? updateData : commerceData;
    reset({
      name: source.name ?? commerceData.name,
      description: source.description ?? commerceData.description ?? "",
      commerceTypes: source.commerceTypes ?? commerceData.commerceTypes ?? [],
      address: source.address ?? commerceData.address,
      locality: source.locality ?? commerceData.locality,
      phone: source.phone ?? commerceData.phone,
      email: source.email ?? commerceData.email,
      password: "",
      confirmPassword: "",
    } as any);
  }, [commerceData, hasPendingData]);

  const onSubmit = async (data: UpdateCommerceSchema) => {
    if (!commerceId) return;

    // Verificar que no exista otro comercio con el mismo nombre, dirección y localidad
    try {
      const identityCheck = await checkCommerceIdentityAvailability(
        data.name,
        data.address,
        data.locality,
        commerceId
      );
      if (!identityCheck.available) {
        showMessage(identityCheck.error ?? "Ya existe un comercio con esos datos.", "error");
        return;
      }
    } catch {
      // Error already shown by httpClient interceptor
      return;
    }

    const updateData = {
      ...data,
      password: data.password || undefined,
      confirmPassword: data.confirmPassword || undefined,
    };

    // Guardar datos y navegar a editar horarios
    setCommerceId(commerceId);
    setUpdateData(updateData);
    setHasFormChanges(isDirty || hasImageChanges);
    // Solo guardar imágenes si hubo cambios
    setImages(hasImageChanges ? newImages : []);
    navigate("/commerce/edit-commerce-profile/business-hours");
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!commerceData) {
    return <EmptyState message="No se pudo cargar el perfil del comercio" />;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <BackButton
        sx={{ position: "absolute", left: 14, top: 14 }}
        onClick={() => navigate("/commerce", { replace: true })}
      />
      <CustomTitle text="Modificar Perfil" />

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        <Stack>
          {/* Datos básicos del comercio */}
          <CommerceBasicInfoForm
            register={register}
            errors={errors}
            isEditMode={true}
          />

          <EmailField register={register} errors={errors} isEditMode={true} />

          <PasswordFields
            register={register}
            errors={errors}
            isEditMode={true}
          />

          <CustomTitle
            variant="body2"
            align="left"
            text="Tipo de comercio"
            color="#585858"
          />
          {/* Tipos de comercio */}
          <CommerceTypesCheckboxes
            control={control}
            errors={errors}
            isRequired={false}
          />

          {/* Imágenes del comercio */}
          <Box sx={{ mt: 1 }}>
            <CustomTitle
              variant="body2"
              align="left"
              text="Imágenes del comercio"
              color="#585858"
            />
            <MultiImageUpload
              maxImages={5}
              onChange={handleImagesChange}
              onDeleteExisting={handleDeleteImage}
              onImagesChange={() => setHasImageChanges(true)}
              initialImages={commerceData?.images}
              initialFiles={
                pendingImages.length > 0 ? pendingImages : undefined
              }
            />
          </Box>

          <CustomButton
            text="Siguiente"
            type="submit"
            fullWidth
            isLoading={isDeletingImage}
            sx={{ mt: 2 }}
          />
        </Stack>
      </Box>
    </Box>
  );
}
