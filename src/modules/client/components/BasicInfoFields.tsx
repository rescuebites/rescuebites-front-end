import { TextField } from "@mui/material";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import CustomTitle from "@/shared/components/CustomTitle";
import DateField from "@/shared/components/DateField";
import { fieldSx } from "@/shared/styles/fieldSx";

interface BasicInfoFieldsProps {
  register: UseFormRegister<any>;
  control: Control<any>;
  errors: FieldErrors<any>;
}
export default function BasicInfoFields({
  register,
  control,
  errors,
}: BasicInfoFieldsProps) {
  return (
    <>
      {/* Nombre */}
      <CustomTitle variant="body2" align="left" text="Nombre *" color="#333" />
      <TextField
        {...register("firstName")}
        placeholder="Ingrese su nombre"
        fullWidth
        error={!!errors.firstName}
        helperText={errors.firstName?.message as string}
        sx={fieldSx}
        size="small"
      />

      {/* Apellido */}
      <CustomTitle variant="body2" align="left" text="Apellido *" color="#333" />
      <TextField
        {...register("lastName")}
        placeholder="Ingrese su apellido"
        fullWidth
        error={!!errors.lastName}
        helperText={errors.lastName?.message as string}
        sx={fieldSx}
        size="small"
      />

      {/* Fecha de nacimiento */}
      <CustomTitle
        variant="body2"
        align="left"
        text="Fecha de nacimiento *"
        color="#333"
      />
      <DateField
        control={control}
        name="birthDate"
        error={errors.birthDate?.message as string}
        sx={fieldSx}
        size="small"
      />

      {/* Dirección */}
      <CustomTitle variant="body2" align="left" text="Dirección *" color="#333" />
      <TextField
        {...register("address")}
        placeholder="Ingrese su dirección"
        fullWidth
        error={!!errors.address}
        helperText={errors.address?.message as string}
        sx={fieldSx}
        size="small"
      />

      {/* Localidad */}
      <CustomTitle variant="body2" align="left" text="Localidad *" color="#333" />
      <TextField
        {...register("locality")}
        placeholder="Ingrese su localidad"
        fullWidth
        error={!!errors.locality}
        helperText={errors.locality?.message as string}
        sx={fieldSx}
        size="small"
      />

      {/* Teléfono */}
      <CustomTitle variant="body2" align="left" text="Teléfono *" color="#333" />
      <TextField
        {...register("phone")}
        placeholder="Ingrese su teléfono"
        fullWidth
        error={!!errors.phone}
        helperText={errors.phone?.message as string}
        sx={fieldSx}
        size="small"
      />
    </>
  );
}
