import { useMutation } from "@tanstack/react-query";
import { registerCommerce } from "../services/commerceService";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore"; //store global para mostrar mensajes de notificación (snackbars)
import { useNavigate } from "react-router-dom";
import type { Inputs } from "../components/CommerceRegisterForm";

export const useRegisterCommerceMutation = () => {
  const showMessage = useSnackbarStore((state) => state.showMessage);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: Inputs) => registerCommerce(data),

    onSuccess: () => {
      showMessage("Comercio registrado exitosamente", "success");
      setTimeout(() => {
        //redirige al login después de un tiempo
        navigate("/auth/login");
      }, 1000);
    },

    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Error al registrar el comercio.";
      showMessage(message, "error");
    },
  });
};

//mutationsFn realiza la petición http, llama al registerCommerce del service
//(data:Inputs) recibe los datos del formulario (Inputs) y los pasa al servicio
