import { Box } from "@mui/material";
import { useState } from "react";
import CustomTitle from "@/shared/components/CustomTitle";
import ClientForm from "@/modules/client/components/ClientForm";
import ProfileImageUpload from "@/modules/client/components/ProfileImageUpload"; 
import BackButton from "@/shared/components/ui/BackButton";
import { useNavigate } from "react-router-dom";

export function RegisterClientPage() {
  const navigate = useNavigate();
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
    <Box >
      <BackButton
        sx={{ position: "absolute", left: 14, top: 14 }}
        onClick={() => navigate("/auth/login", { replace: true })}
      />

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
