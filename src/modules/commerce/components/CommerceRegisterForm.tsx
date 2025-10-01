import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputsRegisterForm from "./InputsRegisterForm";
import CommerceInputsRegisterForm from "./CommerceInputsRegisterForm";
import { useRegisterCommerce } from "@/modules/commerce/hooks/useRegisterCommerce";
// import { Link } from "react-router-dom";

export type Inputs = {
  correoElectronico: string;
  contraseña: string;
  nombre: string;
  descripcion?: string;
  tiposComercio: string[];
  horario: string;
  direccion: string;
  localidad: string;
  fotoPerfil: File;
  numeroTelefono: number;
};

export default function RegisterForm() {
  const { register, handleSubmit, control, errors, onSubmit } =
    useRegisterCommerce();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ "& .MuiTextField-root": { m: 1, width: "50ch" } }}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <InputsRegisterForm register={register} />
              <CommerceInputsRegisterForm
                control={control}
                errors={errors}
                register={register}
              />

              <Button type="submit" variant="contained">
                Registrar
              </Button>
            </CardContent>
          </Card>
        </Box>
      </form>
    </>
  );
}
