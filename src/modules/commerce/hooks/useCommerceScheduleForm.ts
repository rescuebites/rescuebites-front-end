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
import { mapDaysToBusinessHours } from "../utils/businessHoursMapper";

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
    const hasAtLeastOneShift = days.some(
      (d) =>
        !d.closed && (d.shifts.morning.enabled || d.shifts.afternoon.enabled),
    );
    if (!hasAtLeastOneShift) {
      showMessage("Debe configurar al menos un turno de atención.", "error");
      return;
    }
    if (!commerceData) {
      showMessage(
        "No se encontraron los datos del comercio. Intentá de nuevo.",
        "error",
      );
      return;
    }

    // 1. Guardar horarios en el store
    setCommerceData({
      ...commerceData,
      createCommerceRequest: {
        ...commerceData.createCommerceRequest,
        businessHours: mapDaysToBusinessHours(days),
      },
    });

    // 2. Registrar usuario y disparar el mail de verificación
    await registerUserMutation();

    // 3. Navegar solo si el registro fue exitoso
    navigate("/auth/register/email-confirm", { replace: true });
  };

  return { days, setDays, handleSubmit, isPending };
}
