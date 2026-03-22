import { PreferenceType } from "../enums/preference-type.enum";
import { LucideIcon, Leaf, Wheat, Milk, Vegan, Droplet } from "lucide-react";

export interface PreferenceConfig {
  label: string;
  icon: LucideIcon;
  bgColor: string;
  textColor: string;
}

export const PreferenceTypeDisplayName: Record<PreferenceType, string> = {
  [PreferenceType.CELIAC]: "Apto celíaco",
  [PreferenceType.VEGAN]: "Apto vegano",
  [PreferenceType.VEGETARIAN]: "Apto vegetariano",
  [PreferenceType.GLUTEN_FREE]: "Sin Gluten",
  [PreferenceType.LACTOSE_FREE]: "Sin Lactosa",
  [PreferenceType.LOW_SODIUM]: "Bajo en Sodio",
};

export const PreferenceConfigMap: Record<PreferenceType, PreferenceConfig> = {
  [PreferenceType.VEGETARIAN]: {
    label: "Vegetarian",
    icon: Leaf,
    bgColor: "#E8F5E9",
    textColor: "#2E7D32",
  },
  [PreferenceType.GLUTEN_FREE]: {
    label: "Gluten Free",
    icon: Wheat,
    bgColor: "#FFF3E0",
    textColor: "#E65100",
  },
  [PreferenceType.LACTOSE_FREE]: {
    label: "Lactose Free",
    icon: Milk,
    bgColor: "#E3F2FD",
    textColor: "#1565C0",
  },
  [PreferenceType.VEGAN]: {
    label: "Vegan",
    icon: Vegan,
    bgColor: "#E8F5E9",
    textColor: "#2E7D32",
  },
  [PreferenceType.CELIAC]: {
    label: "Apto celíaco",
    icon: Wheat,
    bgColor: "#FFF3E0",
    textColor: "#E65100",
  },
  [PreferenceType.LOW_SODIUM]: {
    label: "Bajo en Sodio",
    icon: Droplet,
    bgColor: "#E1F5FE",
    textColor: "#0277BD",
  },
};
