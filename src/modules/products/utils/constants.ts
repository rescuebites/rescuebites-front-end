export const API_PRODUCT_KEY = "api/v1/commerce/products";

export const MAX_PRODUCT_IMAGES = 5;

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"] as const;

export const PRODUCT_CATEGORY_OPTIONS = [
  // Verdulería
  { label: "Fruta", value: "FRUIT" },
  { label: "Verdura", value: "VEGETABLE" },
  { label: "Hierbas", value: "HERBS" },
  { label: "Tubérculo", value: "TUBER" },
  { label: "Plantines", value: "SEEDLING" },
  // Panadería
  { label: "Pan", value: "BREAD" },
  { label: "Facturas", value: "PASTRIES" },
  { label: "Tortas", value: "CAKES" },
  { label: "Galletas", value: "COOKIES" },
  { label: "Masas", value: "DOUGH" },
  { label: "Postres (Panadería)", value: "DESSERTS_BAKERY" },
  // Restaurante
  { label: "Entradas", value: "APPETIZERS" },
  { label: "Platos principales", value: "MAIN_COURSES" },
  { label: "Postres (Restaurante)", value: "DESSERTS_RESTAURANT" },
  { label: "Bebidas (Restaurante)", value: "BEVERAGES_RESTAURANT" },
  // Kiosco / Supermercado
  { label: "Limpieza", value: "CLEANING" },
  { label: "Bebidas", value: "BEVERAGES" },
  { label: "Comestibles", value: "GROCERIES" },
  { label: "Productos frescos", value: "FRESH_PRODUCTS" },
  { label: "Congelados", value: "FROZEN" },
  { label: "Higiene personal", value: "PERSONAL_HYGIENE" },
  { label: "Golosinas", value: "CANDY" },
  { label: "Snacks", value: "SNACKS" },
  { label: "Cigarrillos", value: "CIGARETTES" },
  { label: "Revistas", value: "MAGAZINES" },
  // Cross categories
  { label: "Sector verdulería", value: "GREENGROCERY_SECTION" },
  { label: "Sector panadería", value: "BAKERY_SECTION" },
  // Genérico
  { label: "Otro", value: "OTHER" },
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
