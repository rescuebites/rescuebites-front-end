import { FieldErrors } from "react-hook-form";
import TextField from "@mui/material/TextField";
import type { Inputs } from "@/modules/commerce/interfaces/createCommerce.interface";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";


type Props = {
  register: any;
  errors: FieldErrors<Inputs>;
  watch: any; //propiedad para obtener el valor de password y compararlo con confirmPassword en la validación
};

export default function InputsRegisterForm({ register, errors, watch }: Props) {
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
        {...register("email", {
          required: "Ingrese su correo electrónico", message: "Este campo es obligatorio"
        })}
        id="email"
        label="Correo electrónico"
        type="text"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        {...register("password", { 
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
        error={!!errors.password}
        helperText={errors.password?.message}
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
      <TextField                                                        
        {...register("confirmPassword", { 
          required: "Confirmé la contraseña" , 
          validate: (value: string) => { 
            const password = watch("password");
            return value === password || "Las contraseñas ingresadas no coinciden";
          }})}
        id="confirmPassword"
        label="Confirmar Contraseña"
        type={showPassword ? "text" : "password"}
        fullWidth
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />
    </>
  );
}
