import { PreferenceType } from "../enums/preference-type.enum";

export const PreferenceTypeDisplayName: Record<PreferenceType, string> = {
  [PreferenceType.CELIAC]: "Apto celíaco",
  [PreferenceType.VEGAN]: "Apto vegano",
  [PreferenceType.VEGETARIAN]: "Apto vegetariano",
  [PreferenceType.GLUTEN_FREE]: "Sin Gluten",
  [PreferenceType.LACTOSE_FREE]: "Sin Lactosa",
  [PreferenceType.LOW_SODIUM]: "Bajo en Sodio",
};
