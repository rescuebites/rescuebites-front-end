export const API_PRODUCT_KEY = "api/v1/commerce/products";

export const MAX_PRODUCT_IMAGES = 5;

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"] as const;

export const PRODUCT_CATEGORY_OPTIONS = [
  { label: "Frutas", value: "FRUIT" },
  { label: "Verduras", value: "VEGETABLE" },
  { label: "Panadería", value: "BAKERY" },
  { label: "Lácteos", value: "DAIRY" },
  { label: "Refrigerados", value: "REFRIGERATED" },
  { label: "Comidas Preparadas", value: "PREPARED_FOOD" },
] as const;

export type ProductCategory =
  (typeof PRODUCT_CATEGORY_OPTIONS)[number]["value"];

export const PRODUCT_CONDITION_OPTIONS = [
  { label: "Fresco", value: "FRESH" },
  { label: "Maduro", value: "RIPE" },
  { label: "Congelado", value: "FROZEN" },
  { label: "Cocido", value: "COOKED" },
  { label: "Listo para consumir", value: "READY_TO_EAT" },
  { label: "Próximo a vencer", value: "NEAR_EXPIRATION" },
] as const;

export type ProductCondition =
  (typeof PRODUCT_CONDITION_OPTIONS)[number]["value"];
