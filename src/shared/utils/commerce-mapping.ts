import { CommerceType } from "../../modules/commerce/enums/commerce-type.enum";

export const CommerceTypeDisplayName: Record<CommerceType, string> = {
  [CommerceType.BAKERY]: "Panadería",
  [CommerceType.SUPERMARKET]: "Supermercado",
  [CommerceType.GREENGROCERY]: "Verdulería",
  [CommerceType.RESTAURANT]: "Restaurante",
  [CommerceType.KIOSK]: "Kiosco",
};

export type CommerceTypeDisplay = typeof CommerceTypeDisplayName[CommerceType];

export const COMMERCE_TYPE_COLORS: Record<CommerceTypeDisplay, { bg: string; color: string }> = {
  Verdulería:  { bg: "#B9EEA6",   color: "#39714C" },
  Panadería:   { bg: "#EB951C87", color: "#A16A0A" },
  Restaurante: { bg: "#E6E6E7",   color: "#6C6567" },
  Supermercado:{ bg: "#F2C94C8C", color: "#CC9F19" },
  Kiosco:      { bg: "#DDD4F9",   color: "#6D59D3" },
};
