import { useMutation } from "@tanstack/react-query";
import { verifyAccount } from "@/modules/auth/api/auth.api";
import { AUTH_VERIFY_KEY } from "../constants";

export function useVerifyAccount() {
  const { mutate, isPending } = useMutation({
    mutationKey: [AUTH_VERIFY_KEY],
    mutationFn: verifyAccount,
  });

  return { mutate, isPending };
}
