import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AUTH_LOGIN_KEY } from "@/modules/auth/constants";
import { loginUser } from "@/modules/auth/api/auth.api";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import { decodeJwtPayload } from "@/shared/utils/jwt.utils";
import { useCartStore } from "@/modules/cart/hooks/useCartStore";

export function useLogin() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const showMessage = useSnackbarStore((state) => state.showMessage);
  const fetchCart = useCartStore((state) => state.fetchCart);

  const { isPending, mutate } = useMutation({
    mutationFn: loginUser,
    mutationKey: [AUTH_LOGIN_KEY],
    onSuccess: async (authResponse) => {
      setServerError(null);
      login(authResponse);
      try {
        await fetchCart();
      } catch {
        showMessage("No se pudo cargar el carrito.", "error");
      }
      const payload = decodeJwtPayload(authResponse.token);
      if (payload?.commerceId) {
        navigate("/commerce");
      } else {
        navigate("/");
      }
    },
    
    onError: (error: any) => {
      const message = error.response?.data?.message || "Ocurrió un error inesperado. Intentá de nuevo.";
      showMessage(message, "error");
    },
  });

  return { isPending, mutate, serverError };
}
