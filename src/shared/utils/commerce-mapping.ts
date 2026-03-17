import { CommerceType } from "../enums/commerce-type.enum";

export const CommerceTypeDisplayName: Record<CommerceType, string> = {
  [CommerceType.BAKERY]: "Panadería",
  [CommerceType.SUPERMARKET]: "Supermercado",
  [CommerceType.GREENGROCERY]: "Verdulería",
  [CommerceType.RESTAURANT]: "Restaurante",
  [CommerceType.KIOSK]: "Kiosco",
};

export type CommerceTypeDisplay = typeof CommerceTypeDisplayName[CommerceType];
