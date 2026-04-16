import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import { usePendingCommerceUpdateStore } from "./usePendingCommerceUpdateStore";
import { useUpdateCommerce } from "./useUpdateCommerce";
import { mapDaysToBusinessHours } from "../utils/businessHoursMapper";
import type { Day } from "../components/BusinessHours";

export function useBusinessHoursUpdate() {
  const navigate = useNavigate();
  const showMessage = useSnackbarStore((state) => state.showMessage);
  const commerceId = useAuthStore((state) => state.commerceId);
  const { updateData, images } = usePendingCommerceUpdateStore();
  const { mutate: updateCommerceMutation, isPending } = useUpdateCommerce();

  const handleUpdate = (days: Day[]): void => {
    // Validar que haya al menos un turno configurado
    const hasAtLeastOneShift = days.some(
      (d) => !d.closed && (d.shifts.morning.enabled || d.shifts.afternoon.enabled)
    );
    
    if (!hasAtLeastOneShift) {
      showMessage("Debe configurar al menos un turno de atención.", "error");
      return;
    }

    if (!commerceId) {
      showMessage("No se encontró el ID del comercio.", "error");
      navigate("/commerce");
      return;
    }

    const finalUpdateData = {
      ...updateData,
      businessHours: mapDaysToBusinessHours(days),
    };

    updateCommerceMutation({
      commerceId,
      updateCommerceRequest: finalUpdateData,
      images: images.length > 0 ? images : undefined,
    });
  };

  return { handleUpdate, isPending };
}
