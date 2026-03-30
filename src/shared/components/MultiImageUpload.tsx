import { useState } from 'react';
import { Box, Button, Typography, IconButton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ImageIcon from '@mui/icons-material/Image';

interface MultiImageUploadProps {
  maxImages?: number;
  onChange: (files: File[]) => void;
  error?: string;
}

interface ImagePreview {
  file: File;
  url: string;
}

export const MultiImageUpload = ({
  maxImages = 5,
  onChange,
  error,
}: MultiImageUploadProps) => {
  const [previews, setPreviews] = useState<ImagePreview[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const remainingSlots = maxImages - previews.length;
      const filesToAdd = filesArray.slice(0, remainingSlots);

      const newPreviews = filesToAdd.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

      const updatedPreviews = [...previews, ...newPreviews];
      setPreviews(updatedPreviews);
      onChange(updatedPreviews.map((p) => p.file));
    }
  };

  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(previews[index].url);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
    onChange(updatedPreviews.map((p) => p.file));
  };

  return (
    <Box>
      {previews.length === 0 ? (
        <Box
          component="label"
          htmlFor="multi-image-input"
          sx={{
            border: "2px dashed #C8DDD0",
            borderRadius: "16px",
            bgcolor: "#FAFFFE",
            p: 3,
            textAlign: "center",
            cursor: "pointer",
            minHeight: 130,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color 0.2s, background-color 0.2s",
            "&:hover": { borderColor: "#6BA17B", bgcolor: "#F2FAF5" },
          }}
        >
          <Box
            sx={{
              width: 52,
              height: 52,
              bgcolor: "#EAF6E7",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1.5,
            }}
          >
            <ImageIcon sx={{ fontSize: 28, color: "#6BA17B" }} />
          </Box>
          <Typography color="#999" fontWeight={500} fontSize={14}>
            Añada su Imagen
          </Typography>
          <input
            id="multi-image-input"
            type="file"
            hidden
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </Box>
      ) : (
        <Box
          sx={{
            border: "2px dashed #C8DDD0",
            borderRadius: "16px",
            bgcolor: "#FAFFFE",
            p: 2,
          }}
        >
          <Grid container spacing={1.5}>
            {previews.map((preview, index) => (
              <Grid size={{ xs: 6, sm: 4 }} key={index}>
                <Box
                  sx={{
                    position: "relative",
                    paddingTop: "100%",
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: "1.5px solid #E0E0E0",
                  }}
                >
                  <img
                    src={preview.url}
                    alt={`Preview ${index + 1}`}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {/* Botón eliminar */}
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      bgcolor: "rgba(0,0,0,0.55)",
                      color: "#fff",
                      width: 24,
                      height: 24,
                      "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                  {/* Badge principal */}
                  {index === 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 4,
                        left: 4,
                        bgcolor: "#6BA17B",
                        color: "#fff",
                        px: 0.8,
                        py: 0.3,
                        borderRadius: "6px",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        lineHeight: 1.4,
                      }}
                    >
                      Principal
                    </Box>
                  )}
                </Box>
              </Grid>
            ))}

            {/* Slot para agregar más */}
            {previews.length < maxImages && (
              <Grid size={{ xs: 6, sm: 4 }}>
                <Button
                  component="label"
                  sx={{
                    width: "100%",
                    paddingTop: "100%",
                    position: "relative",
                    border: "2px dashed #A6C9B0",
                    borderRadius: "10px",
                    bgcolor: "#FAFFFE",
                    minWidth: 0,
                    "&:hover": { bgcolor: "#F2FAF5", borderColor: "#6BA17B" },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                    }}
                  >
                    <AddPhotoAlternateIcon
                      sx={{ color: "#6BA17B", fontSize: 28, mb: 0.5 }}
                    />
                    <Typography
                      variant="caption"
                      color="#999"
                      display="block"
                      fontSize={11}
                    >
                      Agregar
                    </Typography>
                  </Box>
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                  />
                </Button>
              </Grid>
            )}
          </Grid>

          <Typography
            variant="caption"
            color="#999"
            sx={{ mt: 1.5, display: "block", textAlign: "center" }}
          >
            {previews.length} de {maxImages} imágenes · La primera será la principal
          </Typography>
        </Box>
      )}

      {error && (
        <Typography color="error" variant="caption" display="block" mt={1}>
          {error}
        </Typography>
      )}
    </Box>
  );
};