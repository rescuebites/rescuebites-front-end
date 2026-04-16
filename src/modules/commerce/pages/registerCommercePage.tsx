import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import CommerceBasicInfoForm from "../components/CommerceBasicInfoForm";
import { useCommerceRegistrationForm } from "@/modules/commerce/hooks/useCommerceRegistrationForm";
import CustomTitle from "@/shared/components/CustomTitle";
import CustomButton from "@/shared/components/CustomButton";
import { MultiImageUpload } from "@/shared/components/MultiImageUpload";
import BackButton from "@/shared/components/ui/BackButton";
import { useNavigate } from "react-router-dom";
import EmailField from "@/modules/client/components/EmailField";
import PasswordFields from "@/modules/client/components/PasswordFields";
import CommerceTypesCheckboxes from "../components/CommerceTypesCheckboxes";

export default function RegisterCommercePage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    errors,
    onSubmit,
    isPending,
    setValue,
    storedCommerceImages,
  } = useCommerceRegistrationForm();

  const handleImagesChange = (files: File[]) => {
    setValue("profilePhotos", files as any);

    if (files.length > 0) {
      Promise.all(
        files.map(
          (f) =>
            new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(f);
            })
        )
      ).then((base64Array) => {
        localStorage.setItem(
          "commerceProfilePicturesBase64",
          JSON.stringify(base64Array)
        );
        localStorage.setItem("commerceProfilePictureBase64", base64Array[0]);
      });
    } else {
      localStorage.removeItem("commerceProfilePicturesBase64");
      localStorage.removeItem("commerceProfilePictureBase64");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <BackButton
        sx={{ position: "absolute", left: 14, top: 14 }}
        onClick={() => navigate("/auth/login")}
      />
      <CustomTitle text="Registrar Comercio" />

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        <Stack>
          {/* Datos del comercio */}
          <CommerceBasicInfoForm register={register} errors={errors} />

          <EmailField register={register} errors={errors} isEditMode={false} />

          <PasswordFields
            register={register}
            errors={errors}
            isEditMode={false}
          />

          <CustomTitle
            variant="body2"
            align="left"
            text="Tipo de comercio *"
            color="#585858"
          />
          <CommerceTypesCheckboxes
            control={control}
            errors={errors}
            isRequired={true}
          />

          <Box sx={{ mt: 1 }}>
            <CustomTitle
              variant="body2"
              align="left"
              text="Imagen del comercio *"
              color="#585858"
            />
            <MultiImageUpload
              maxImages={5}
              onChange={handleImagesChange}
              error={errors?.profilePhotos?.message}
              initialFiles={storedCommerceImages.length > 0 ? storedCommerceImages : undefined}
            />
          </Box>

          <CustomButton
            text="Siguiente"
            type="submit"
            fullWidth
            isLoading={isPending}
            sx={{ mt: 2 }}
          />
        </Stack>
      </Box>
    </Box>
  );
}
