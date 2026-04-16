import { useState, useEffect } from 'react';
import { Box, Button, Typography, IconButton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ImageIcon from '@mui/icons-material/Image';
import { ImageResponse } from '@/shared/interfaces/image-response.interface';

interface MultiImageUploadProps {
  maxImages?: number;
  onChange: (files: File[]) => void;
  onDeleteExisting?: (imageId: string) => Promise<void>;
  onImagesChange?: () => void; // Notifica cuando hay cualquier cambio (agregar/eliminar)
  error?: string;
  initialImages?: ImageResponse[];
  /** Archivos File ya subidos; se muestran como previews al volver de otra página */
  initialFiles?: File[];
}

interface ImagePreview {
  file?: File;
  url: string;
  isExisting?: boolean;
  imageId?: string;
}

export const MultiImageUpload = ({
  maxImages = 5,
  onChange,
  onDeleteExisting,
  onImagesChange,
  error,
  initialImages,
  initialFiles,
}: MultiImageUploadProps) => {
  const [previews, setPreviews] = useState<ImagePreview[]>(() => {
    const existingPreviews = (initialImages ?? []).map((img) => ({
      url: img.url,
      isExisting: true,
      imageId: img.imageId,
    }));
    const filePreviews = (initialFiles ?? []).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      isExisting: false,
    }));
    return [...existingPreviews, ...filePreviews];
  });

  // Notificar al padre sobre archivos iniciales para sincronizar su estado
  useEffect(() => {
    if (initialFiles && initialFiles.length > 0) {
      onChange(initialFiles);
    }
    // Solo en el mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const remainingSlots = maxImages - previews.length;
      const filesToAdd = filesArray.slice(0, remainingSlots);

      const newPreviews = filesToAdd.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        isExisting: false,
      }));

      const updatedPreviews = [...previews, ...newPreviews];
      setPreviews(updatedPreviews);
      const newFiles = updatedPreviews.filter((p) => !p.isExisting).map((p) => p.file!);
      onChange(newFiles);
      onImagesChange?.(); // Notificar cambio
      
      // Limpiar el input para permitir seleccionar el mismo archivo de nuevo y evitar duplicaciones
      e.target.value = '';
    }
  };

  const handleRemoveImage = async (index: number) => {
    const preview = previews[index];
    
    // Si es una imagen existente guardada, llamar al callback de eliminación
    if (preview.isExisting && preview.imageId && onDeleteExisting) {
      try {
        await onDeleteExisting(preview.imageId);
        // Solo actualizar el estado local si la eliminación fue exitosa
        const updatedPreviews = previews.filter((_, i) => i !== index);
        setPreviews(updatedPreviews);
        onChange(updatedPreviews.filter((p) => !p.isExisting).map((p) => p.file!));
        onImagesChange?.(); // Notificar cambio
      } catch (error) {
        // El error ya se maneja en el componente padre
        console.error('Error al eliminar imagen:', error);
      }
    } else {
      // Es una imagen nueva (File), solo eliminarla del estado local
      if (!preview.isExisting && preview.url) {
        URL.revokeObjectURL(preview.url);
      }
      const updatedPreviews = previews.filter((_, i) => i !== index);
      setPreviews(updatedPreviews);
      onChange(updatedPreviews.filter((p) => !p.isExisting).map((p) => p.file!));
      onImagesChange?.(); // Notificar cambio
    }
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
                  {/* Botón eliminar - solo mostrar si se puede eliminar */}
                  {(!preview.isExisting || onDeleteExisting) && (
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
                  )}
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
                  {/* Badge imagen existente */}
                  {preview.isExisting && index !== 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 4,
                        left: 4,
                        bgcolor: "rgba(0,0,0,0.45)",
                        color: "#fff",
                        px: 0.8,
                        py: 0.3,
                        borderRadius: "6px",
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        lineHeight: 1.4,
                      }}
                    >
                      Guardada
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