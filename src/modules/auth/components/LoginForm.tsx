import React, { useState } from "react";
import { TextField} from "@mui/material";
import { useLogin } from "@/modules/auth/hooks/useLogin";
import CustomTitle from "@/shared/components/CustomTitle";
import CustomButton from "@/shared/components/CustomButton";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isPending, mutate } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };
  
  return (
    <>
      <CustomTitle text="Iniciar Sesión" />

      <form onSubmit={handleSubmit}>
        <TextField
          label="Correo Electrónico"
          placeholder="Ingrese su correo electrónico"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Contraseña"
          placeholder="********"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <CustomButton
          type="submit"
          text="Iniciar Sesión"
          isLoading={isPending}
        />
      </form>
    </>
  );
};

export default LoginForm;
