import { useMutation } from "@tanstack/react-query";
import { resendVerificationEmail } from "../api/user.api";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";

export function useResendVerification() {
  const showMessage = useSnackbarStore((state) => state.showMessage);

  const { isPending, mutate } = useMutation({
    mutationFn: (email: string) => resendVerificationEmail(email),
    onSuccess: () => {
      showMessage("Correo de verificación reenviado", "success");
    },
    onError: (err: any) => {
      showMessage(
        err.response?.data?.message || "Error reenviando el correo.",
        "error"
      );
    },
  });

  return { isPending, mutate };
}