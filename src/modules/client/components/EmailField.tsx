import { TextField } from "@mui/material";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import CustomTitle from "@/shared/components/CustomTitle";
import { fieldSx } from "@/shared/styles/fieldSx";

interface EmailFieldProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  isEditMode?: boolean;
}

/*
 Componente para el campo de correo electrónico al registrar o modificar un cliente. 
 En modo edición, el campo se deshabilita para evitar cambios en el email, ya que es 
 un identificador único del cliente.
 */
export default function EmailField({
  register,
  errors,
  isEditMode = false,
}: EmailFieldProps) {
  return (
    <>
      <CustomTitle
        variant="body2"
        align="left"
        text="Correo electrónico *"
        color="#585858"
      />
      <TextField
        {...register("email")}
        type="email"
        placeholder="Ingrese su correo electrónico"
        fullWidth
        disabled={isEditMode}
        error={!!errors.email}
        helperText={errors.email?.message as string}
        sx={fieldSx}
        size="small"
      />
    </>
  );
}
