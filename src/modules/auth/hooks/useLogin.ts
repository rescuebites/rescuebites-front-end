import { useMutation } from "@tanstack/react-query";
import { AUTH_LOGIN_KEY } from "@/modules/auth/constants";
import { loginUser } from "@/modules/auth/services/auth.service";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const { login } = useAuthStore();
    const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: loginUser, //Se dice que funcion va a ejecutar la mutación
    mutationKey: [AUTH_LOGIN_KEY],  
    onSuccess: (authResponse) => { 
      login(authResponse);
      navigate("/");
    },
    onError: (error: any) => { 
      alert(error.message || "Error al iniciar sesión");
    },
  });

  return {
    isPending,
    mutate, 
  };
}