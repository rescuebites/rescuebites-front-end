import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/modules/auth/api/auth.api";
import { useNavigate } from "react-router-dom";
import { AUTH_REGISTER_KEY } from "../constants";
import { RegisterRequest } from "../interfaces/requests/register.interface";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";

export function useRegister() {
  const navigate = useNavigate();
  const showMessage = useSnackbarStore((state) => state.showMessage);

  const { isPending, mutate } = useMutation<void, Error, RegisterRequest>({
    mutationFn: registerUser, 
    mutationKey: [AUTH_REGISTER_KEY],
    onSuccess: () => {
      navigate("/auth/register/email-confirm", { replace: true });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Error al guardar los datos.";
      showMessage(message, "error");
    },
  });

  return {
    isPending,
    mutate,
  };
}
