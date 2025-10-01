import TextField from "@mui/material/TextField";
import type { Inputs } from "@/modules/commerce/components/CommerceRegisterForm";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";
import Stack from "@mui/material/Stack";

type Props = {
  register: any;
};

export default function Inputs({ register }: Props) {
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
      <Stack spacing={2} direction="column" sx={{ width: "100%" }}>
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
        <TextField
          {...register("nombre", { required: true })}
          id="nombre"
          label="Nombre"
          type="text"
          fullWidth
        />

        <TextField
          {...register("direccion", { required: true })}
          id="direccion"
          label="Dirección"
          type="text"
          fullWidth
        />
        <TextField
          {...register("localidad", { required: true })}
          id="localidad"
          label="Localidad"
          type="text"
          fullWidth
        />
        <TextField
          {...register("numeroTelefono", { required: true })}
          id="telefono"
          label="Teléfono"
          type="number"
          fullWidth
        />
      </Stack>
    </>
  );
}
