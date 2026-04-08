import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AUTH_LOGIN_KEY } from "@/modules/auth/constants";
import { loginUser } from "@/modules/auth/api/auth.api";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";

export function useLogin() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const showMessage = useSnackbarStore((state) => state.showMessage);

  const { isPending, mutate } = useMutation({
    mutationFn: loginUser,
    mutationKey: [AUTH_LOGIN_KEY],
    onSuccess: (authResponse) => {
      setServerError(null);
      login(authResponse);
      navigate("/commerce");
    },
    
    onError: (error: any) => {
      const message = error.response?.data?.message || "Ocurrió un error inesperado. Intentá de nuevo.";
      showMessage(message, "error");
    },
  });

  return { isPending, mutate, serverError };
}
