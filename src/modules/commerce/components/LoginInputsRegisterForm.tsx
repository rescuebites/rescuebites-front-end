import TextField from "@mui/material/TextField";
import type { Inputs } from "@/modules/commerce/components/CommerceRegisterForm";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";

type Props = {
  register: any;
};

export default function InputsRegisterForm({ register }: Props) {
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
        {...register("correoElectronico", {
          required: "Ingrese su correo electrónico",
        })}
        id="correo electronico"
        label="Correo electrónico"
        type="text"
        fullWidth
      />
      <TextField
        {...register("contraseña", { required: true })}
        id="contraseña"
        label="Contraseña"
        type={showPassword ? "text" : "password"}
        fullWidth
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
