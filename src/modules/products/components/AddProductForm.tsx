import { useEffect, useMemo, useRef } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Controller, useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/shared/components/CustomButton";
import CustomTitle from "@/shared/components/CustomTitle";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_PRODUCT_IMAGES,
  PRODUCT_CATEGORY_OPTIONS,
  PRODUCT_CONDITION_OPTIONS,
} from "@/modules/products/utils/constants";
import {
  CreateProductFormValues,
  createProductSchema,
} from "@/modules/products/schemas/createProductSchema";
import { useCreateProduct } from "@/modules/products/hooks/useCreateProduct";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";

interface AddProductFormProps {
  commerceId: string;
}

export default function AddProductForm({ commerceId }: AddProductFormProps) {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const showMessage = useSnackbarStore((state) => state.showMessage);

  const defaultValues: Partial<CreateProductFormValues> = {
    name: "",
    description: "",
    category: "",
    condition: "",
    expirationDate: undefined,
    images: [],
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    mode: "onBlur",
    defaultValues,
  });

  const {
    field: imagesField,
    fieldState: { error: imagesError },
  } = useController({
    name: "images",
    control,
    defaultValue: [],
  });

  const { mutateAsync, isPending } = useCreateProduct();

  const selectedImages = imagesField.value ?? [];

  const imagePreviews = useMemo(
    () =>
      selectedImages.map((file) => ({
        name: file.name,
        preview: URL.createObjectURL(file),
      })),
    [selectedImages]
  );

  useEffect(() => {
    return () => {
      imagePreviews.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [imagePreviews]);

  const handleSelectImages = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    const incomingFiles = Array.from(files);

    const invalidFiles = incomingFiles.filter(
      (file) => !ACCEPTED_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_IMAGE_TYPES)[number])
    );

    if (invalidFiles.length > 0) {
      showMessage("Solo se permiten imágenes en formato JPG o PNG", "warning");
    }

    const validFiles = incomingFiles.filter((file) =>
      ACCEPTED_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_IMAGE_TYPES)[number])
    );

    const availableSlots = MAX_PRODUCT_IMAGES - selectedImages.length;
    if (availableSlots <= 0) {
      showMessage(
        `Puedes subir hasta ${MAX_PRODUCT_IMAGES} imágenes`,
        "warning"
      );
      event.target.value = "";
      return;
    }

    const filesToAdd = validFiles.slice(0, availableSlots);
    if (filesToAdd.length === 0) {
      event.target.value = "";
      return;
    }

    imagesField.onChange([...selectedImages, ...filesToAdd]);
    event.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    const updated = selectedImages.filter((_, idx) => idx !== index);
    imagesField.onChange(updated);
  };

  const onSubmit = async (values: CreateProductFormValues) => {
    await mutateAsync({
      commerceId,
      product: {
        name: values.name,
        description: values.description,
        stock: values.stock,
        originalPrice: values.originalPrice,
        discountPercentage: values.discountPercentage,
        category: values.category,
        condition: values.condition,
        expirationDate: values.expirationDate,
      },
      images: values.images,
    });

    reset(defaultValues);
    imagesField.onChange([]);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        backgroundColor: "#f5f7f8",
        border: "1px solid #e0e7ec",
      }}
    >
      <CustomTitle
        text="Añadir Nuevo Producto"
        variant="h5"
        align="left"
        color="#1c2a3a"
      />

      <Box
        sx={{
          mt: 3,
          p: 4,
          textAlign: "center",
          border: "2px dashed #9fd5b5",
          borderRadius: 3,
          background: "linear-gradient(135deg, #f0fbf4 0%, #ffffff 100%)",
        }}
      >
        <AddPhotoAlternateRoundedIcon
          sx={{ fontSize: 48, color: "#65b98f", mb: 1 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#2f855a" }}>
          Subir Fotos
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#637381", maxWidth: 320, mx: "auto", mt: 0.5 }}
        >
          Una buena foto aumenta el interés.
        </Typography>

        <Button
          component="label"
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#65b98f",
            "&:hover": { backgroundColor: "#4b9b74" },
          }}
        >
          Añadir Foto
          <input
            hidden
            multiple
            type="file"
            accept={ACCEPTED_IMAGE_TYPES.join(",")}
            onChange={handleSelectImages}
            ref={imageInputRef}
          />
        </Button>

        <Typography
          variant="caption"
          display="block"
          sx={{ mt: 1.5, color: "#637381" }}
        >
          Formatos permitidos: JPG, PNG. Máximo {MAX_PRODUCT_IMAGES} imágenes.
        </Typography>

        <Typography variant="caption" sx={{ display: "block", color: "#2f855a" }}>
          {selectedImages.length}/{MAX_PRODUCT_IMAGES} imágenes seleccionadas
        </Typography>

        {imagesError && (
          <Typography color="error" variant="caption" sx={{ display: "block", mt: 1 }}>
            {imagesError.message}
          </Typography>
        )}
      </Box>

      {imagePreviews.length > 0 && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {imagePreviews.map((image, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={image.preview}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 2,
                  overflow: "hidden",
                  height: 160,
                  backgroundColor: "#ffffff",
                  border: "1px solid #dfe5eb",
                }}
              >
                <Box
                  component="img"
                  src={image.preview}
                  alt={image.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                <Tooltip title="Eliminar imagen">
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "rgba(0,0,0,0.45)",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.65)",
                      },
                    }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ mt: 4 }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              label="Nombre del Producto"
              placeholder="Ej: Pan integral artesano"
              required
              fullWidth
              margin="normal"
              value={field.value ?? ""}
              onChange={field.onChange}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              label="Descripción"
              placeholder="Ej: Pan del día, recién horneado..."
              required
              fullWidth
              margin="normal"
              multiline
              minRows={3}
              value={field.value ?? ""}
              onChange={field.onChange}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="stock"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Stock disponible"
                  type="number"
                  placeholder="Ej: 25"
                  required
                  fullWidth
                  margin="normal"
                  value={field.value ?? ""}
                  onChange={(event) => {
                    const value = event.target.value;
                    field.onChange(value === "" ? value : Number(value));
                  }}
                  error={!!errors.stock}
                  helperText={errors.stock?.message}
                  inputProps={{ min: 1 }}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="originalPrice"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Precio original (S/)"
                  type="number"
                  placeholder="Ej: 15.00"
                  required
                  fullWidth
                  margin="normal"
                  value={field.value ?? ""}
                  onChange={(event) => {
                    const value = event.target.value;
                    field.onChange(value === "" ? value : Number(value));
                  }}
                  error={!!errors.originalPrice}
                  helperText={errors.originalPrice?.message}
                  inputProps={{ min: 0, step: "0.01" }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="discountPercentage"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Descuento (%)"
                  type="number"
                  placeholder="Ej: 30"
                  required
                  fullWidth
                  margin="normal"
                  value={field.value ?? ""}
                  onChange={(event) => {
                    const value = event.target.value;
                    field.onChange(value === "" ? value : Number(value));
                  }}
                  error={!!errors.discountPercentage}
                  helperText={errors.discountPercentage?.message}
                  inputProps={{ min: 0, max: 100, step: "0.5" }}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="expirationDate"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Fecha de vencimiento"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  value={field.value ?? ""}
                  onChange={(event) =>
                    field.onChange(event.target.value || undefined)
                  }
                  error={!!errors.expirationDate}
                  helperText={errors.expirationDate?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  required
                  label="Categoría"
                  placeholder="Seleccionar categoría"
                  fullWidth
                  margin="normal"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={!!errors.category}
                  helperText={errors.category?.message}
                >
                  {PRODUCT_CATEGORY_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="condition"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  required
                  label="Condición"
                  placeholder="Seleccionar condición"
                  fullWidth
                  margin="normal"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={!!errors.condition}
                  helperText={errors.condition?.message}
                >
                  {PRODUCT_CONDITION_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        </Grid>
      </Box>

      <CustomButton
        text="Publicar Oferta"
        type="submit"
        fullWidth
        isLoading={isPending}
        backgroundColor="#38c172"
      />
    </Paper>
  );
}
