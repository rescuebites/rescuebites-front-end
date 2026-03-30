import { Box, Avatar, IconButton, Typography } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

interface ProfileImageUploadProps {
  profilePicture: File | null;
  currentImageUrl?: string;
  onImageChange: (file: File | null) => void;
}

/* 
  Componente para subir o cambiar la imagen de perfil del cliente. 
  Permite seleccionar una nueva imagen o eliminar la actual. Solo se aceptan archivos PNG o JPEG.
 */

export default function ProfileImageUpload({
  profilePicture,
  currentImageUrl,
  onImageChange,
}: ProfileImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onImageChange(file);
  };

  const imageUrl = profilePicture
    ? URL.createObjectURL(profilePicture)
    : currentImageUrl;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar
          src={imageUrl}
          sx={{ width: 100, height: 100, bgcolor: "#77A787" }}
        />

        <IconButton
          component="label"
          sx={{ ml: -4, mt: 6, bgcolor: "white", color: "#77A787" }}
        >
          <PhotoCamera />
          <input
            hidden
            accept="image/png, image/jpeg"
            type="file"
            onChange={handleFileChange}
          />
        </IconButton>

        {profilePicture && (
          <IconButton
            onClick={() => onImageChange(null)}
            sx={{ ml: -4, color: "#77A787", width: 30, height: 30 }}
          >
            <span
              style={{ fontWeight: "bold", fontSize: "22px", lineHeight: 1 }}
            >
              ×
            </span>
          </IconButton>
        )}
      </Box>

      <Typography
        variant="caption"
        sx={{
          mt: 1,
          color: "#9CA3AF",
          fontSize: 12,
        }}
      >
        Solo se aceptan imágenes PNG o JPEG
      </Typography>
    </Box>
  );
}
