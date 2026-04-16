import { CommerceType } from "../../modules/commerce/enums/commerce-type.enum";
import { CommerceTypeDisplayName } from "./commerce-mapping";

/**
 * Obtiene el enum CommerceType a partir del nombre en español
 * @param displayName - Nombre en español (ej: "Panadería")
 * @returns El enum correspondiente o undefined si no existe
 */
export const getCommerceTypeFromDisplay = (displayName: string): CommerceType | undefined => {
  const entry = Object.entries(CommerceTypeDisplayName).find(([_, value]) => value === displayName);
  return entry ? (entry[0] as CommerceType) : undefined;
};

/**
 * Obtiene todos los nombres de tipos de comercio en español
 * @returns Array con todos los nombres para mostrar en UI
 */
export const getAllCommerceDisplayNames = (): string[] => {
  return Object.values(CommerceTypeDisplayName);
};
