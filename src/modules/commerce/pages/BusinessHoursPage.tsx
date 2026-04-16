import { useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import CustomTitle from "@/shared/components/CustomTitle";
import CustomButton from "@/shared/components/CustomButton";
import BackButton from "@/shared/components/ui/BackButton";
import LoadingState from "@/shared/components/LoadingState";
import CommerceBusinessHours, { Day, INITIAL_DAYS } from "../components/BusinessHours";
import { useCommerceScheduleForm } from "../hooks/useCommerceScheduleForm";
import { useBusinessHoursUpdate } from "../hooks/useBusinessHoursUpdate";
import { useCommerceDetail } from "@/modules/commerce/hooks/useCommerceDetail";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { mapBusinessHoursToDay } from "../utils/businessHoursMapper";

export default function BusinessHoursPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Detectar si estamos en modo edición basado en la ruta
  const isEditMode = location.pathname.includes("edit-commerce-profile");
  
  // Estados y hooks para modo registro
  const registrationForm = useCommerceScheduleForm();
  
  // Estados y hooks para modo edición
  const commerceId = useAuthStore((state) => state.commerceId);
  const { data: commerceData, isLoading: isLoadingCommerce } = useCommerceDetail(
    isEditMode ? commerceId : null
  );
  const { handleUpdate: updateBusinessHours, isPending: isUpdating } = useBusinessHoursUpdate();
  
  // Calcular días basados en los datos del comercio (solo para edición)
  const initialEditDays = useMemo(() => {
    if (isEditMode && commerceData?.businessHours) {
      return mapBusinessHoursToDay(commerceData.businessHours);
    }
    return INITIAL_DAYS;
  }, [isEditMode, commerceData?.businessHours]);
  
  const [editDays, setEditDays] = useState<Day[]>(initialEditDays);

  // Sincronizar estado cuando cambien los datos (solo cuando se cargan por primera vez)
  useEffect(() => {
    setEditDays(initialEditDays);
  }, [initialEditDays]);

  const handleSubmit = () => {
    if (isEditMode) {
      updateBusinessHours(editDays);
    } else {
      registrationForm.handleSubmit();
    }
  };

  if (isEditMode && isLoadingCommerce) {
    return <LoadingState />;
  }

  const activeDays = isEditMode ? editDays : registrationForm.days;
  const setActiveDays = isEditMode ? setEditDays : registrationForm.setDays;
  const isPending = isEditMode ? isUpdating : registrationForm.isPending;
  const buttonText = isEditMode ? "ACTUALIZAR COMERCIO" : "Registrar Comercio";
  const backPath = isEditMode ? "/commerce/edit-commerce-profile" : "/commerce/register-commerce";

  return (
    <Box sx={{ maxWidth: 600, mx: "auto"}}>
      <BackButton
        sx={{ position: "absolute", left: 14, top: 14 }}
        onClick={() => navigate(backPath!)}
      />
      
      <CustomTitle text="Horarios del comercio" />

      <CustomTitle
        text="Completá el primer día abierto. Al hacer click en otro día se replican
        esos horarios al resto."
        align="justify"
        color="#999"
        fontSize="15px"
      />

      <CommerceBusinessHours days={activeDays} onDaysChange={setActiveDays} />

      <Box sx={{ mt: 3, mb: 2 }}>
        <CustomButton
          text={buttonText}
          type="button"
          fullWidth
          onClick={handleSubmit}
          isLoading={isPending}
        />
      </Box>
    </Box>
  );
}
