import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import { resetPassword } from "../services/user.service";

export const useResetPassword = () => {
  const navigate = useNavigate();
  const showMessage = useSnackbarStore((state) => state.showMessage);

  const { isError, isPending, mutate } = useMutation({
    mutationFn: resetPassword, //Se dice que funcion va a ejecutar la mutación
    
    onSuccess: () => { 
      showMessage("Contraseña recuperada con éxito", "success");
      navigate("/auth/login", { replace: true });
    },
    onError: (error: any) => { 
      showMessage(
        error.response?.data?.message || "No se pudo recuperar la contraseña.",
        "error"
      );
    },
  });
    return {
        isError,
        isPending,
        mutate, 
    };
}