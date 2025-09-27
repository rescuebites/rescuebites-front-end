import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useLogin } from "@/modules/auth/hooks/useLogin";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isPending, mutate } = useLogin();

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };
  
  return (
    <Box>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "##77A787" }}
      >
        Iniciar Sesión
      </Typography>

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
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#77A787",
            width: "80%",
            alignItems: "center",
            mx: "auto",
            display: "block",
            "&:hover": { backgroundColor: "#77A787" },
          }}
          loading={isPending}
        >
          {isPending ? "Cargando..." : "Iniciar Sesión"}
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
