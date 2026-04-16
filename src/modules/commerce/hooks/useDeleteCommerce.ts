import { useMutation } from "@tanstack/react-query";
import { deleteCommerce } from "../api/commerce.api";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useNavigate } from "react-router-dom";

export const useDeleteCommerce = () => {
  const { showMessage } = useSnackbarStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (commerceId: string) => deleteCommerce(commerceId),
    onSuccess: () => {
      showMessage("Cuenta eliminada exitosamente", "success");
      logout();
      navigate("/auth/login");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Error al eliminar la cuenta";
      showMessage(errorMessage, "error");
    },
  });
};
