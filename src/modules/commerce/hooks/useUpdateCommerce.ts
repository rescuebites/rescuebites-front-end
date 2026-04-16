import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateCommerce } from "../api/commerce.api";
import { UpdateCommerceParams } from "../interfaces/requests/update-commerce.interface";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import { usePendingCommerceUpdateStore } from "./usePendingCommerceUpdateStore";

export const useUpdateCommerce = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const showMessage = useSnackbarStore((state) => state.showMessage);
  const clearPendingUpdate = usePendingCommerceUpdateStore((state) => state.clearPendingUpdate);

  return useMutation({
    mutationFn: (params: UpdateCommerceParams) => updateCommerce(params),
    onSuccess: () => {
      showMessage("Perfil actualizado exitosamente", "success");
      queryClient.invalidateQueries({ queryKey: ["commerce-profile"] });
      clearPendingUpdate();
      navigate("/commerce", { replace: true });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Error al actualizar el perfil";
      showMessage(message, "error");
    },
  });
};
