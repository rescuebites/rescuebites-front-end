import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLogin } from "@/modules/auth/hooks/useLogin";
import CustomTitle from "@/shared/components/CustomTitle";
import CustomButton from "@/shared/components/CustomButton";
<<<<<<< HEAD
import { fieldSx } from "@/shared/styles/fieldSx";
import { loginSchema, LoginSchema } from "@/modules/auth/schemas/loginSchema";
=======
>>>>>>> 03a4eaf (ADD Sales report route)

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isPending, mutate } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    mutate(data);
  };

  return (
    <>
      <CustomTitle text="Iniciar Sesión" />

      <Stack component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        {/* Email */}
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
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={fieldSx}
          size="small"
        />

        {/* Contraseña */}
        <CustomTitle
          variant="body2"
          align="left"
          text="Contraseña *"
          color="#585858"
        />
        <TextField
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Ingrese su contraseña"
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={fieldSx}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  onClick={() => setShowPassword((s) => !s)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <CustomButton
          type="submit"
          text="Iniciar Sesión"
          isLoading={isPending}
          sx={{ mt: 1 }}
          fullWidth
        />
<<<<<<< HEAD
      </Stack>
=======
      </form>
>>>>>>> 03a4eaf (ADD Sales report route)
    </>
  );
};

export default LoginForm;
