import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/modules/auth/api/auth.api";
import { useNavigate } from "react-router-dom";
import { AUTH_REGISTER_KEY } from "../constants";
import { RegisterRequest } from "../interfaces/requests/register.interface";

export function useRegister() {
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation<void, Error, RegisterRequest>({
    mutationFn: registerUser, 
    mutationKey: [AUTH_REGISTER_KEY],
    onSuccess: () => {
      navigate("/auth/register/email-confirm", { replace: true });
    },
  });

  return {
    isPending,
    mutate,
  };
}
