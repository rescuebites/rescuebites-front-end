import { FieldErrors, UseFormRegister, UseFormWatch, FieldValues, Path } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";


type CredentialFields = {
  email: string;
  password: string;
  confirmPassword?: string;
};

type Props<T extends FieldValues & CredentialFields> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  watch?: UseFormWatch<T>;
  showConfirmPassword?: boolean;
};

export default function InputsRegisterForm<T extends FieldValues & CredentialFields>({
  register,
  errors,
  watch,
  showConfirmPassword = true,
}: Props<T>) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <TextField
        {...register("email" as Path<T>, {
          required: "Ingrese su correo electrónico",
        })}
        id="email"
        label="Correo electrónico"
        type="text"
        fullWidth
        error={!!(errors as any).email}
        helperText={(errors as any).email?.message}
      />
      <TextField
        {...register("password" as Path<T>, { 
          required: "Ingrese una contraseña",
          minLength: { value: 8, message: "La contraseña debe tener al menos 8 caracteres" },
          maxLength: { value: 22, message: "La contraseña no debe exceder los 22 caracteres" },
          validate: {
            hasUppercase: (v:string) => /[A-Z]/.test(v) || "Debe contener al menos una mayúscula",
            hasLowercase: (v:string) => /[a-z]/.test(v) || "Debe contener al menos una minúscula",
            hasNumber: (v:string) => /[0-9]/.test(v) || "Debe contener al menos un número",
            hasSpecial: (v:string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(v) || "Debe contener al menos un carácter especial",
          },
        })}
        id="password"
        label="Contraseña"
        type={showPassword ? "text" : "password"}
        fullWidth
        error={!!(errors as any).password}
        helperText={(errors as any).password?.message}
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
      {showConfirmPassword && watch && (
        <TextField
          {...register("confirmPassword" as Path<T>, {
            required: "Confirmé la contraseña",
            validate: (value: string) => {
              const password = watch("password" as Path<T>);
              return value === password || "Las contraseñas ingresadas no coinciden";
            },
          })}
          id="confirmPassword"
          label="Confirmar Contraseña"
          type={showPassword ? "text" : "password"}
          fullWidth
          error={!!(errors as any).confirmPassword}
          helperText={(errors as any).confirmPassword?.message}
        />
      )}
    </>
  );
}
