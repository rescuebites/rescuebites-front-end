import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
import { useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type Props = {
  register: any;
  error?: string;
};

export default function ImageUpload({ register, error }: Props) {
  const [fileName, setFileName] = useState("Subir foto");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Foto de perfil
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          flexWrap: "wrap",
        }}
      >
        <Button
          component="label"
          variant="contained"
          sx={{
            width: "160px",
            backgroundColor: "#bedbb9",
            color: "#000",
            "&:hover": {
              backgroundColor: "#9dd295",
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            gap: 1,
          }}
          startIcon={<CloudUploadIcon />}
        >
          <Box
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              flexGrow: 1,
            }}
          >
            {fileName}
          </Box>
          <VisuallyHiddenInput
            type="file"
            accept="image/jpeg,image/png"
            multiple={false}
            {...register("profilePhoto", { required: "Suba una imagen" })}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setFileName(file.name);
                setPreviewUrl(URL.createObjectURL(file));
              }
            }}
          />
        </Button>

        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}

        {previewUrl && (
          <Box
            component="img"
            src={previewUrl}
            alt="Vista previa"
            sx={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: 100,
              border: "1px solid #ccc",
            }}
          />
        )}
      </Box>
    </>
  );
}
