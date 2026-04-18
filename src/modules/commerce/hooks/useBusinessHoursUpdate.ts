import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import { usePendingCommerceUpdateStore } from "./usePendingCommerceUpdateStore";
import { useUpdateCommerce } from "./useUpdateCommerce";
import { mapDaysToBusinessHours, validateBusinessHoursLogic } from "../utils/businessHoursMapper";
import { validateCommerceBusinessHours } from "../api/commerce.api";
import type { Day } from "../components/BusinessHours";

export function useBusinessHoursUpdate() {
  const navigate = useNavigate();
  const showMessage = useSnackbarStore((state) => state.showMessage);
  const commerceId = useAuthStore((state) => state.commerceId);
  const { updateData, images } = usePendingCommerceUpdateStore();
  const { mutate: updateCommerceMutation, isPending } = useUpdateCommerce();

  const handleUpdate = async (days: Day[]): Promise<void> => {
    const hoursError = validateBusinessHoursLogic(days);
    if (hoursError) {
      showMessage(hoursError, "error");
      return;
    }

    if (!commerceId) {
      showMessage("No se encontró el ID del comercio.", "error");
      navigate("/commerce");
      return;
    }

    // Validación en el backend
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

    const finalUpdateData = {
      ...updateData,
      businessHours: mappedHours,
    };

    updateCommerceMutation({
      commerceId,
      updateCommerceRequest: finalUpdateData,
      images: images.length > 0 ? images : undefined,
    });
  };

  return { handleUpdate, isPending };
}
