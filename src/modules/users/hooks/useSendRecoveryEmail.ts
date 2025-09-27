import { useMutation } from "@tanstack/react-query";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore.ts";
import { sendRecoveryEmail } from "../services/user.service";

export const useSendRecoveryEmail = () => {
  const showMessage = useSnackbarStore((state) => state.showMessage);

  const mutation = useMutation({
    mutationFn: sendRecoveryEmail,
    onSuccess: () => {
      showMessage("Se envió un enlace de recuperación a tu correo electrónico", "success");
    },
    onError: (err: any) => {
      showMessage(err.response?.data?.message || "No se pudo enviar el correo", "error");
    },
  });

  return mutation;
};