import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Box, TextField } from "@mui/material";
import CustomTitle from "@/shared/components/CustomTitle";
import { fieldSx } from "@/shared/styles/fieldSx";

interface CommerceBasicFields {
  name: string;
  description?: string;
  address: string;
  locality: string;
  phone: string;
}

type Props<T extends CommerceBasicFields> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  isEditMode?: boolean;
};

export default function CommerceBasicInfoForm<T extends CommerceBasicFields>({
  errors,
  register,
  isEditMode = false,
}: Props<T>) {
  return (
    <>
      {/* Nombre */}
      <Box>
        <CustomTitle
          variant="body2"
          align="left"
          text={`Nombre del comercio${isEditMode ? "" : " *"}`}
          color="#585858"
        />
        <TextField
          {...register("name" as any)}
          placeholder="Ingrese el nombre del comercio"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message as string}
          sx={fieldSx}
          size="small"
        />
      </Box>

      {/* Descripción */}
      <Box>
        <CustomTitle
          variant="body2"
          align="left"
          text="Descripción del comercio"
          color="#585858"
        />
        <TextField
          {...register("description" as any)}
          placeholder="Ingrese la descripción del comercio"
          fullWidth
          error={!!errors.description}
          helperText={errors.description?.message as string}
          sx={fieldSx}
          size="small"
          multiline
          rows={3}
        />
      </Box>

      {/* Dirección */}
      <Box>
        <CustomTitle
          variant="body2"
          align="left"
          text={`Dirección del comercio${isEditMode ? "" : " *"}`}
          color="#585858"
        />
        <TextField
          {...register("address" as any)}
          placeholder="Ingrese la dirección del comercio"
          fullWidth
          error={!!errors.address}
          helperText={errors.address?.message as string}
          sx={fieldSx}
          size="small"
        />
      </Box>

      {/* Localidad */}
      <Box>
        <CustomTitle
          variant="body2"
          align="left"
          text={`Localidad del comercio${isEditMode ? "" : " *"}`}
          color="#585858"
        />
        <TextField
          {...register("locality" as any)}
          placeholder="Ingrese la localidad del comercio"
          fullWidth
          error={!!errors.locality}
          helperText={errors.locality?.message as string}
          sx={fieldSx}
          size="small"
        />
      </Box>

      {/* Teléfono */}
      <Box>
        <CustomTitle
          variant="body2"
          align="left"
          text={`Teléfono del comercio${isEditMode ? "" : " *"}`}
          color="#585858"
        />
        <TextField
          {...register("phone" as any)}
          placeholder="+54935..."
          fullWidth
          error={!!errors.phone}
          helperText={errors.phone?.message as string}
          sx={fieldSx}
          size="small"
        />
      </Box>
    </>
  );
}


