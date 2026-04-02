import { useEffect } from "react";
import { UseFormReset } from "react-hook-form";
import { ClientResponse } from "../interfaces/responses/client.response";

interface UseEditFormInitParams {
  isEditMode: boolean;
  clientData?: ClientResponse;
  reset: UseFormReset<any>;
}

export function useEditFormInit({
  isEditMode,
  clientData,
  reset,
}: UseEditFormInitParams) {
  useEffect(() => {
    if (isEditMode && clientData) {
      reset({
        firstName: clientData.firstName,
        lastName: clientData.lastName,
        birthDate: clientData.birthDate,
        address: clientData.address,
        phone: clientData.phone,
        email: clientData.user.email,
        password: "",
        confirmPassword: "",
        preferences: clientData.preferences,
        locality: clientData.locality,
      });
    }
  }, [isEditMode, clientData, reset]);
}
