import { useMemo } from "react";

interface FormValues {
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  phone: string;
  preferences?: string[];
  locality: string;
  password?: string;
}

interface OriginalValues {
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  phone: string;
  preferences: string[];
  locality: string;
}

interface UseFormChangeDetectionProps {
  formValues: FormValues;
  originalValues?: OriginalValues;
  isEditMode: boolean;
  profilePicture: File | null;
}

export const useFormChangeDetection = ({
  formValues,
  originalValues,
  isEditMode,
  profilePicture,
}: UseFormChangeDetectionProps) => {
  const hasChanges = useMemo(() => {
    if (!isEditMode || !originalValues) return true;

    const currentValues = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      birthDate: formValues.birthDate,
      address: formValues.address,
      phone: formValues.phone,
      preferences: formValues.preferences || [],
      locality: formValues.locality,
    };

    const fieldsChanged = Object.keys(currentValues).some((key) => {
      if (key === "preferences") {
        const curr = [...(currentValues.preferences as string[])].sort();
        const orig = [...(originalValues.preferences as string[])].sort();
        return JSON.stringify(curr) !== JSON.stringify(orig);
      }
      return (
        currentValues[key as keyof typeof currentValues] !==
        originalValues[key as keyof typeof originalValues]
      );
    });

    const passwordChanged = formValues.password && formValues.password !== "";
    const imageChanged = profilePicture !== null;

    return fieldsChanged || passwordChanged || imageChanged;
  }, [formValues, originalValues, isEditMode, profilePicture]);

  return { hasChanges };
};
