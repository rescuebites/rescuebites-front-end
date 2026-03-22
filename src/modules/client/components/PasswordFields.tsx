import { TextField, Box, Typography } from "@mui/material";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { InfoOutlined } from "@mui/icons-material";
import { fieldSx } from "@/shared/styles/fieldSx";
import CustomTitle from "@/shared/components/CustomTitle";

interface PasswordFieldsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  isEditMode: boolean;
}

export default function PasswordFields({
  register,
  errors,
  isEditMode,
}: PasswordFieldsProps) {
  return (
    <Box sx={{ mt: isEditMode ? 1 : 0 }}>
      {isEditMode && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1.5,
            backgroundColor: "#f5f5f5",
            padding: 1.5,
            borderRadius: 1,
          }}
        >
          <InfoOutlined sx={{ color: "#666", fontSize: 20 }} />
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              fontSize: 13,
            }}
          >
            No complete estos campos si no desea cambiar su contraseña
          </Typography>
        </Box>
      )}

      <CustomTitle
        variant="body2"
        align="left"
        text={`Contraseña${isEditMode ? "" : " *"}`}
        color="#333"
      />
      <TextField
        {...register("password")}
        type="password"
        placeholder={
          isEditMode
            ? "Ingrese su nueva contraseña (opcional)"
            : "Ingrese su contraseña"
        }
        fullWidth
        error={!!errors.password}
        helperText={errors.password?.message as string}
        sx={fieldSx}
        size="small"
      />

      <CustomTitle
        variant="body2"
        align="left"
        text={`Confirmar Contraseña${isEditMode ? "" : " *"}`}
        color="#333"
      />
      <TextField
        {...register("confirmPassword")}
        type="password"
        placeholder={
          isEditMode
            ? "Confirme su nueva contraseña (opcional)"
            : "Confirme su contraseña"
        }
        fullWidth
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message as string}
        sx={fieldSx}
        size="small"
      />
    </Box>
  );
}

