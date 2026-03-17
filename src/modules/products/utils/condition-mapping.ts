import { ProductCondition } from "../enums/product-condition.enum";

export const ProductConditionDisplayName: Record<ProductCondition, string> = {
  [ProductCondition.EXCELLENT]: "Excelente estado",
  [ProductCondition.GOOD]: "Buen estado",
  [ProductCondition.RIPE]: "Maduro",
  [ProductCondition.ALMOST_RIPE]: "Casi maduro",
  [ProductCondition.OVERRIPE]: "Pasado de madurez",
  [ProductCondition.FRESHLY_BAKED]: "Recién horneado",
  [ProductCondition.SAME_DAY]: "Del día",
  [ProductCondition.PREVIOUS_DAY]: "Día anterior",
  [ProductCondition.READY_TO_SERVE]: "Listo para servir",
  [ProductCondition.NEEDS_REHEATING]: "Requiere recalentar",
  [ProductCondition.DENTED_PACKAGING]: "Envase abollado",
  [ProductCondition.NEAR_EXPIRY]: "Próximo a vencer",
  [ProductCondition.EXPIRED_TODAY]: "Vence hoy",
  [ProductCondition.DAMAGED_LABEL]: "Etiqueta dañada",
  [ProductCondition.OTHER]: "Otro",
};