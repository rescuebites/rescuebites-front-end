import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClient } from "../api/client.api";
import { UpdateClientParams } from "../interfaces/requests/updateClient.interface";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import { useNavigate } from "react-router-dom";

export const useUpdateClient = () => {
  const queryClient = useQueryClient();
  const { showMessage } = useSnackbarStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (params: UpdateClientParams) => updateClient(params),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["client", data.clientId] });
      showMessage("Perfil actualizado exitosamente", "success");
      navigate("/profile");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Error al actualizar el perfil";
      showMessage(errorMessage, "error");
    },
  });
};
