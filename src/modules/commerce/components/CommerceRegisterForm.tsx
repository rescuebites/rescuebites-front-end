import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputsRegisterForm from "./LoginInputsRegisterForm";
import CommerceInputsRegisterForm from "./CommerceInputsRegisterForm";
import { useRegisterCommerce } from "@/modules/commerce/hooks/useRegisterCommerce";
import Typography from "@mui/material/Typography";

export type Inputs = {
  email: string;
  password: string;
  name: string;
  description?: string;
  commerceTypes: string[];
  schedule: string;
  address: string;
  city: string;
  profilePhoto: File;
  phoneNumber: number;
};

export default function RegisterForm() {
  const { register, handleSubmit, control, errors, onSubmit, isPending } =
    useRegisterCommerce();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" component="h1" align="center">
          Registrar Comercio
        </Typography>
        <Stack spacing={2} sx={{ mt: 3 }}>
          <InputsRegisterForm register={register} errors={errors} />
        </Stack>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <CommerceInputsRegisterForm
            control={control}
            errors={errors}
            register={register}
          />
        </Stack>
        <Stack spacing={2} sx={{ mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending} //desactiva el botón mientras se envía el form
            sx={{ backgroundColor: "#77a778" }}
          >
            {isPending ? "Registrando..." : "Registrar"}
          </Button>
        </Stack>
      </form>
    </>
  );
}
