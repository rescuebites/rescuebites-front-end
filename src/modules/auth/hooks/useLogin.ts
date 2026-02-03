import { useMutation } from "@tanstack/react-query";
import { AUTH_LOGIN_KEY } from "@/modules/auth/constants";
import { loginUser } from "@/modules/auth/api/auth.api";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import { usePendingRegistrationStore } from "@/modules/users/hooks/usePendingRegistrationStore";
import { createCommerce } from "@/modules/commerce/api/commerce.api";

export function useLogin() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const showMessage = useSnackbarStore((state) => state.showMessage);
  const { commerceData, clearData } = usePendingRegistrationStore();

  const { isPending, mutate } = useMutation({
    mutationFn: loginUser, //Se dice que funcion va a ejecutar la mutación
    mutationKey: [AUTH_LOGIN_KEY],
    onSuccess: async (authResponse) => {
      login(authResponse);

      // Completar registro de comercio si hay datos pendientes
      if (commerceData) {
        try {
          commerceData.createCommerceRequest.userId = authResponse.userId.toString();
          await createCommerce(commerceData);
          clearData();
          showMessage("Comercio registrado exitosamente", "success");
        } catch (error: any) {
          const message = error.response?.data?.message || "Error al crear el comercio.";
          showMessage(message, "error");
        }
      }
      navigate("/");
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
