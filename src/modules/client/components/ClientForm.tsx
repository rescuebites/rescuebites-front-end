import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/shared/components/CustomButton";
import { registerClientSchema } from "@/modules/auth/schemas/registerClientSchema";
import { updateClientSchema } from "@/modules/client/schemas/updateClientSchema";
import { CreateClientParams } from "@/modules/client/interfaces/requests/createClient.interface";
import { UpdateClientParams } from "@/modules/client/interfaces/requests/updateClient.interface";
import { useRegister } from "@/modules/auth/hooks/useRegister";
import { useUpdateClient } from "@/modules/client/hooks/useUpdateClient";
import { usePendingRegistrationStore } from "@/modules/users/hooks/usePendingRegistrationStore";
import { Role } from "@/shared/enums/role.enum";
import { getProfileImageFile } from "@/shared/utils/profileImage";
import { PreferenceType } from "@/modules/client/enums/preference-type.enum";
import { PreferenceTypeDisplayName } from "../utils/preference-mapping";
import { ClientResponse } from "../interfaces/responses/client.response";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useFormChangeDetection } from "../hooks/useFormChangeDetection";
import { useEditFormInit } from "../hooks/useEditFormInit";
import PreferencesCheckboxList from "./PreferencesCheckboxList";
import PasswordFields from "./PasswordFields";
import BasicInfoFields from "./BasicInfoFields";
import EmailField from "./EmailField";

const dietaryOptions = (
  Object.keys(PreferenceTypeDisplayName) as PreferenceType[]
).map((key) => ({ label: PreferenceTypeDisplayName[key], value: key }));

interface ClientFormProps {
  profilePicture: File | null;
  setProfilePicture?: (file: File | null) => void;
  isEditMode?: boolean;
  clientData?: ClientResponse;
}

export default function ClientForm({
  profilePicture,
  isEditMode = false,
  clientData,
}: ClientFormProps) {
  const { setClientData } = usePendingRegistrationStore();
  const { mutate: registerUser, isPending: isRegistering } = useRegister();
  const { mutate: updateClientMutation, isPending: isUpdating } =
    useUpdateClient();
  const { clientId } = useAuthStore();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      isEditMode ? updateClientSchema : registerClientSchema,
    ),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      address: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      preferences: [] as string[],
      locality: "",
    },
  });

  // Hook para inicializar el formulario en modo edición
  useEditFormInit({ isEditMode, clientData, reset });

  // Detectar cambios en el formulario
  const formValues = watch();
  const { hasChanges } = useFormChangeDetection({
    formValues,
    originalValues: clientData
      ? {
          firstName: clientData.firstName,
          lastName: clientData.lastName,
          birthDate: clientData.birthDate,
          address: clientData.address,
          phone: clientData.phone,
          preferences: clientData.preferences,
          locality: clientData.locality,
        }
      : undefined,
    isEditMode,
    profilePicture,
  });

  const handleCheckboxChange = (value: string) => {
    const current = getValues("preferences") ?? [];
    const updated = current.includes(value)
      ? current.filter((p) => p !== value)
      : [...current, value];
    setValue("preferences", updated);
  };

  const onSubmit = async (form: any) => {
    if (isEditMode && clientId) {
      // Modo edición
      const updateParams: UpdateClientParams = {
        clientId,
        updateClientRequest: {
          firstName: form.firstName,
          lastName: form.lastName,
          birthDate: form.birthDate,
          address: form.address,
          phone: form.phone,
          email: form.email,
          password: form.password || undefined,
          confirmPassword: form.confirmPassword || undefined,
          preferences: form.preferences,
          locality: form.locality,
        },
        profilePicture: profilePicture,
      };
      updateClientMutation(updateParams);
    } else {
      // Modo registro
      const profileFile = profilePicture ?? (await getProfileImageFile());
      const clientRequest: CreateClientParams = {
        createClientRequest: {
          firstName: form.firstName,
          lastName: form.lastName,
          birthDate: form.birthDate,
          address: form.address,
          phone: form.phone,
          userId: "",
          preferences: form.preferences,
          locality: form.locality,
        },
        profilePicture: profileFile,
      };

      setClientData(clientRequest);
      registerUser({
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        role: Role.CLIENT,
      });
    }
  };

  const isPending = isRegistering || isUpdating;

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Información básica */}
      <BasicInfoFields register={register} control={control} errors={errors} />

      {/* Email */}
      <EmailField register={register} errors={errors} isEditMode={isEditMode} />

      {/* Contraseñas */}
      <PasswordFields register={register} errors={errors} isEditMode={isEditMode} />

      {/* Preferencias alimenticias */}
      <PreferencesCheckboxList
        preferences={watch("preferences") ?? []}
        options={dietaryOptions}
        onChange={handleCheckboxChange}
      />

      {/* Botón de envío */}
      <CustomButton
        text={isEditMode ? "ACTUALIZAR PERFIL" : "REGISTRAR"}
        type="submit"
        fullWidth
        isLoading={isPending}
        disabled={isEditMode && !hasChanges}
      />
    </Box>
  );
}
