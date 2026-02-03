import { Box, Avatar, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import type { UseFormSetValue } from "react-hook-form";
import type { Inputs } from "@/modules/commerce/components/CommerceRegisterForm";

type Props = {
  setValue: UseFormSetValue<Inputs>;
  error?: string;
};

export default function ImageUpload({ setValue, error }: Props) {
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
        <Avatar
          src={profilePicture ? URL.createObjectURL(profilePicture) : undefined}
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
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              if (!["image/jpeg", "image/png"].includes(file.type)) {
                alert("La imagen debe estar en formato JPG o PNG");
                return;
              }
              setProfilePicture(file);
              setValue("profilePhoto", file);
            }}
          />
        </IconButton>

        {profilePicture && (
          <IconButton
            onClick={() => {
              setProfilePicture(null);
              setValue("profilePhoto", null as any); //En typeScript no permite null en File, por eso el any (hace una excepción)
            }}
            sx={{ ml: -4, color: "#77A787", width: 30, height: 30 }}
          >
            <span
              style={{ fontWeight: "bold", fontSize: "22px", lineHeight: 1 }}
            >
              ×
            </span>
          </IconButton>
        )}

        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}
      </Box>
    </>
  );
}