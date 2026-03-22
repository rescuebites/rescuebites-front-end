import { Box } from "@mui/material";
import { useState } from "react";
import CustomTitle from "@/shared/components/CustomTitle";
import ClientForm from "@/modules/client/components/ClientForm";
import ProfileImageUpload from "@/modules/client/components/ProfileImageUpload"; 

export function RegisterClientPage() {
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleImageChange = (file: File | null) => {
    setProfilePicture(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        localStorage.setItem("profilePictureBase64", reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ px: 2 }}>
      <CustomTitle text="Registrar Cliente" />

      <ProfileImageUpload
        profilePicture={profilePicture}
        onImageChange={handleImageChange}
      />

      <ClientForm
        profilePicture={profilePicture}
        setProfilePicture={setProfilePicture}
      />
    </Box>
  );
}
