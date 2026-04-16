// useBusinessHours.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { usePendingRegistrationStore } from "@/modules/users/hooks/usePendingRegistrationStore";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import { INITIAL_DAYS } from "../components/BusinessHours";
import type { Day } from "../components/BusinessHours";
import { registerUser } from "@/modules/auth/api/auth.api";
import { Role } from "@/shared/enums/role.enum";
import { mapDaysToBusinessHours, validateBusinessHoursLogic } from "../utils/businessHoursMapper";
import { validateCommerceBusinessHours } from "../api/commerce.api";

export function useCommerceScheduleForm() {
  const [days, setDays] = useState<Day[]>(INITIAL_DAYS);
  const { commerceData, setCommerceData, pendingUserCredentials } =
    usePendingRegistrationStore();
  const showMessage = useSnackbarStore((state) => state.showMessage);
  const navigate = useNavigate();

  const { mutateAsync: registerUserMutation, isPending } = useMutation({
    mutationFn: async () => {
      await registerUser({
        email: pendingUserCredentials!.email,
        password: pendingUserCredentials!.password,
        confirmPassword: pendingUserCredentials!.confirmPassword,
        role: Role.COMMERCE,
      });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Error al registrar el usuario.";
      showMessage(message, "error");
    },
  });

  const handleSubmit = async (): Promise<void> => {
    // 1. Validación local rápida (sin red)
    const localError = validateBusinessHoursLogic(days);
    if (localError) {
      showMessage(localError, "error");
      return;
    }
    if (!commerceData) {
      showMessage(
        "No se encontraron los datos del comercio. Intentá de nuevo.",
        "error",
      );
      return;
    }

    // 2. Validación en el backend
    const mappedHours = mapDaysToBusinessHours(days);
    try {
      const hoursValidation = await validateCommerceBusinessHours(mappedHours);
      if (!hoursValidation.valid) {
        hoursValidation.errors.forEach((msg) => showMessage(msg, "error"));
        return;
      }
    } catch {
      // Error already shown by httpClient interceptor
      return;
    }

    // 3. Guardar horarios en el store
    setCommerceData({
      ...commerceData,
      createCommerceRequest: {
        ...commerceData.createCommerceRequest,
        businessHours: mappedHours,
      },
    });

    // 4. Registrar usuario y disparar el mail de verificación
    await registerUserMutation();

    // 5. Navegar solo si el registro fue exitoso
    navigate("/auth/register/email-confirm", { replace: true });
  };

  return { days, setDays, handleSubmit, isPending };
}
