import { Box } from "@mui/material";
import { useState } from "react";
import CustomTitle from "@/shared/components/CustomTitle";
import ClientForm from "@/modules/client/components/ClientForm";
import ProfileImageUpload from "@/modules/client/components/ProfileImageUpload";
import LoadingState from "@/shared/components/LoadingState";
import EmptyState from "@/shared/components/EmptyState";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useClientProfile } from "@/modules/client/hooks/useClientProfile";
import BackButton from "@/shared/components/ui/BackButton";

export function EditClientPage() {
  const { clientId } = useAuthStore();
  const { data: clientData, isLoading } = useClientProfile(clientId);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!clientData) {
    return <EmptyState message="No se pudo cargar el perfil" />;
  }

  return (
    <Box>
      <BackButton sx={{ position: "absolute", left: 14, top: 14 }} />
      <CustomTitle text="Modificar Perfil" />

      <ProfileImageUpload
        profilePicture={profilePicture}
        currentImageUrl={clientData.image?.url}
        onImageChange={setProfilePicture}
      />

      <ClientForm
        profilePicture={profilePicture}
        setProfilePicture={setProfilePicture}
        isEditMode={true}
        clientData={clientData}
      />
    </Box>
  );
}
