export enum PreferenceType {
  CELIAC = "CELIAC",
  VEGAN = "VEGAN",
  VEGETARIAN = "VEGETARIAN",
  GLUTEN_FREE = "GLUTEN_FREE",
  LACTOSE_FREE = "LACTOSE_FREE",
  LOW_SODIUM = "LOW_SODIUM",
}

export const PreferenceTypeDisplayName: Record<PreferenceType, string> = {
  [PreferenceType.CELIAC]: "Apto celíaco",
  [PreferenceType.VEGAN]: "Apto vegano",
  [PreferenceType.VEGETARIAN]: "Apto vegetariano",
  [PreferenceType.GLUTEN_FREE]: "Sin Gluten",
  [PreferenceType.LACTOSE_FREE]: "Sin Lactosa",
  [PreferenceType.LOW_SODIUM]: "Bajo en Sodio",
};
