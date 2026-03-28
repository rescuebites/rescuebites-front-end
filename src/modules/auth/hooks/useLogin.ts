import { useMutation } from "@tanstack/react-query";
import { AUTH_LOGIN_KEY } from "@/modules/auth/constants";
import { loginUser } from "@/modules/auth/api/auth.api";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";

export function useLogin() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const showMessage = useSnackbarStore((state) => state.showMessage);

  const { isPending, mutate } = useMutation({
    mutationFn: loginUser, //Se dice que funcion va a ejecutar la mutación
    mutationKey: [AUTH_LOGIN_KEY],
    onSuccess: (authResponse) => {
      login(authResponse);
      navigate("/customer");
    },
    onError: (error: any) => {
      showMessage(
        error.response?.data?.message || "Error al iniciar sesión.",
        "error"
      );
    },
  });

  return {
    isPending,
    mutate,
  };
}
