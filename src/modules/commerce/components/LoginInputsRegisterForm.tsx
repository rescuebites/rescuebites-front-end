import { FieldErrors } from "react-hook-form";
import TextField from "@mui/material/TextField";
import type { Inputs } from "../interfaces/createCommerceInteface";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";

type Props = {
  register: any;
  errors: FieldErrors<Inputs>;
};

export default function InputsRegisterForm({ register, errors }: Props) {
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
          required: "Ingrese su correo electrónico",
        })}
        id="email"
        label="Correo electrónico"
        type="text"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        {...register("password", { required: "Ingrese una contraseña" })}
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
    </>
  );
}
