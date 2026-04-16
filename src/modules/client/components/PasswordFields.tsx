import { TextField, Box, Typography, InputAdornment, IconButton } from "@mui/material";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { InfoOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { fieldSx } from "@/shared/styles/fieldSx";
import CustomTitle from "@/shared/components/CustomTitle";
import { useState } from "react";

interface PasswordFieldsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  isEditMode: boolean;
}

export default function PasswordFields({
  register,
  errors,
  isEditMode,
}: PasswordFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ mt: isEditMode ? 1 : 0 }}>
      {isEditMode && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1.5,
            backgroundColor: "#e3eff8",
            border: "1px solid #9ed2fd",
            padding: 1.5,
            borderRadius: 1,
          }}
        >
          <InfoOutlined sx={{ color: "#6ba9e7", fontSize: 20 }} />
          <Typography
            variant="body2"
            sx={{
              color: "#6ba9e7",
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
        color="#585858"
      />
      <TextField
        {...register("password")}
        type={showPassword ? "text" : "password"}
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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <CustomTitle
        variant="body2"
        align="left"
        text={`Confirmar Contraseña${isEditMode ? "" : " *"}`}
        color="#585858"
      />
      <TextField
        {...register("confirmPassword")}
        type={showPassword ? "text" : "password"}
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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
