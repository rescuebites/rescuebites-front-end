import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import { Controller, FieldErrors } from "react-hook-form";
import type { Inputs } from "@/modules/commerce/components/CommerceRegisterForm";
import Typography from "@mui/material/Typography";
import Button from "node_modules/@mui/material/esm/Button/Button";
import TextField from "node_modules/@mui/material/esm/TextField/TextField";
import styled from "@emotion/styled";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Stack from "@mui/material/Stack";

type Props = {
  register: any;
  control: any;
  errors: FieldErrors<Inputs>;
};

export default function CommerceCheckForm({
  errors,
  control,
  register,
}: Props) {
  const opcionesComercio = [
    "verduleria",
    "panaderia",
    "restaurante",
    "supermercado",
    "kiosco",
  ];

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

  return (
    <Stack spacing={2}>
      <TextField
        {...register("descripcion")}
        id="descripcion"
        label="Descripción"
        type="text"
        fullWidth
      />

      <TextField
        {...register("horario", { required: true })}
        id="horario"
        label="Horario"
        type="text"
        fullWidth
      />
      <FormControl
        error={!!errors.tiposComercio}
        sx={{ mt: 2 }}
        variant="standard"
      >
        <FormLabel component="legend">Tipo de comercio</FormLabel>

        <Controller
          name="tiposComercio"
          control={control}
          rules={{
            validate: (value) =>
              value.length > 0 || "Seleccioná al menos un rubro",
          }}
          render={({ field }) => (
            <>
              <FormGroup>
                {opcionesComercio.map((opcion) => (
                  <FormControlLabel
                    key={opcion}
                    control={
                      <Checkbox
                        checked={field.value?.includes(opcion) || false}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const newValue = checked
                            ? [...(field.value || []), opcion]
                            : field.value.filter((v: string) => v !== opcion);
                          field.onChange(newValue);
                        }}
                      />
                    }
                    label={opcion.charAt(0).toUpperCase() + opcion.slice(1)}
                  />
                ))}
              </FormGroup>
              {errors.tiposComercio && (
                <FormHelperText>{errors.tiposComercio.message}</FormHelperText>
              )}
            </>
          )}
        />
      </FormControl>

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Foto de perfil
      </Typography>
      <Button
        component="label"
        variant="contained"
        fullWidth
        sx={{
          width: "175px",
          backgroundColor: "#bedbb9",
          color: "#000",
          "&:hover": {
            backgroundColor: "#9dd295", // color al pasar el mouse
          },
        }}
        startIcon={<CloudUploadIcon />}
      >
        Subir imagen
        <VisuallyHiddenInput
          type="file"
          accept="image/jpeg,image/png"
          multiple={false}
          {...register("fotoPerfil", { required: "Suba una imagen" })}
        />
      </Button>
      {errors?.fotoPerfil && (
        <Typography variant="caption" color="error">
          {errors.fotoPerfil.message}
        </Typography>
      )}
    </Stack>
  );
}
