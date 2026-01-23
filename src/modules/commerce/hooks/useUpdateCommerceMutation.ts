import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCommerce } from "../services/commerceService";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import { useNavigate } from "react-router-dom";
import type { Inputs } from "../interfaces/createCommerceInteface";

export const useUpdateCommerceMutation = (commerceId: string) => {
  const showMessage = useSnackbarStore((state) => state.showMessage);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Inputs>) => updateCommerce(commerceId, data),

    onSuccess: (updatedCommerce) => {
      // Invalidar y actualizar el cache de React Query
      queryClient.invalidateQueries({ queryKey: ["commerce", commerceId] });
      queryClient.setQueryData(["commerce", commerceId], updatedCommerce);

      showMessage("Comercio actualizado exitosamente", "success");
      
      setTimeout(() => {
        // Puedes redirigir a la vista del comercio o a otra página
        navigate(`/commerces/${commerceId}`);
      }, 1000);
    },

    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Error al actualizar el comercio.";
      showMessage(message, "error");
    },
  });
};