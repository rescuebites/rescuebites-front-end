import { ProductCategory } from './filter.interface';

export enum ProductCondition {
  // Estados generales
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  // Verdulería
  RIPE = 'RIPE',
  ALMOST_RIPE = 'ALMOST_RIPE',
  OVERRIPE = 'OVERRIPE',
  // Panadería
  FRESHLY_BAKED = 'FRESHLY_BAKED',
  SAME_DAY = 'SAME_DAY',
  PREVIOUS_DAY = 'PREVIOUS_DAY',
  // Restaurante
  READY_TO_SERVE = 'READY_TO_SERVE',
  NEEDS_REHEATING = 'NEEDS_REHEATING',
  // Supermercado / Kiosco
  DENTED_PACKAGING = 'DENTED_PACKAGING',
  NEAR_EXPIRY = 'NEAR_EXPIRY',
  EXPIRED_TODAY = 'EXPIRED_TODAY',
  DAMAGED_LABEL = 'DAMAGED_LABEL',
  // General
  OTHER = 'OTHER',
}

// Display names alineados con el backend
export const CONDITION_DISPLAY_NAMES: Record<ProductCondition, string> = {
  [ProductCondition.EXCELLENT]:       'Excelente estado',
  [ProductCondition.GOOD]:            'Buen estado',
  [ProductCondition.RIPE]:            'Maduro',
  [ProductCondition.ALMOST_RIPE]:     'Casi maduro',
  [ProductCondition.OVERRIPE]:        'Pasado de madurez',
  [ProductCondition.FRESHLY_BAKED]:   'Recién horneado',
  [ProductCondition.SAME_DAY]:        'Del día',
  [ProductCondition.PREVIOUS_DAY]:    'Día anterior',
  [ProductCondition.READY_TO_SERVE]:  'Listo para servir',
  [ProductCondition.NEEDS_REHEATING]: 'Requiere recalentar',
  [ProductCondition.DENTED_PACKAGING]:'Envase abollado',
  [ProductCondition.NEAR_EXPIRY]:     'Próximo a vencer',
  [ProductCondition.EXPIRED_TODAY]:   'Vence hoy',
  [ProductCondition.DAMAGED_LABEL]:   'Etiqueta dañada',
  [ProductCondition.OTHER]:           'Otro',
};

export interface Product {
  productId: string;
  commerceId?: string;
  commerceName?: string;
  name: string;
  description?: string;
  stock: number;
  originalPrice: number;
  discountPercentage: number;
  discountedPrice: number;
  category?: ProductCategory;
  condition?: ProductCondition;
  expirationDate: string | null;
  imageUrls: string[];
  active?: boolean;
}

export interface Store {
  id?: number;
  name: string;
  subtitle?: string;
  profileImageUrl?: string;
  imageUrl?: string;
  location?: string;
  schedule?: string;
  deliveryAvailable?: boolean;
  phoneNumber?: string;
  categories?: string[];
}

//constants para categorías de productos (para mostrar en la UI y mapear con el backend)
export type CategoryDisplay = 
  | "Panadería"
  | "Supermercado"
  | "Verdulería"
  | "Restaurante"
  | "Kiosco";

export type CategoryBackend = 
  | "GREENGROCERY"
  | "BAKERY"
  | "RESTAURANT"
  | "SUPERMARKET"
  | "KIOSK";

// Mapeo español → inglés
export const CATEGORY_TO_BACKEND: Record<CategoryDisplay, CategoryBackend> = {
  "Panadería": "BAKERY",
  "Supermercado": "SUPERMARKET",
  "Verdulería": "GREENGROCERY",
  "Restaurante": "RESTAURANT",
  "Kiosco": "KIOSK",
};

// Mapeo inverso (para mostrar nombres en español desde el backend)
export const BACKEND_TO_CATEGORY: Record<CategoryBackend, CategoryDisplay> = {
  "BAKERY": "Panadería",
  "SUPERMARKET": "Supermercado",
  "GREENGROCERY": "Verdulería",
  "RESTAURANT": "Restaurante",
  "KIOSK": "Kiosco",
};

export const categories: CategoryDisplay[] = [
  "Panadería",
  "Supermercado",
  "Verdulería",
  "Restaurante",
  "Kiosco",
];

// mapeo del enum del back para mostrar las categorías con nombre en español
export type ProductCategoryBackend =
  | "FRUIT" | "VEGETABLE" | "HERBS" | "TUBER" | "SEEDLING"
  | "BREAD" | "PASTRIES" | "CAKES" | "COOKIES" | "DOUGH"
  | "DESSERTS_BAKERY" | "APPETIZERS" | "MAIN_COURSES"
  | "DESSERTS_RESTAURANT" | "BEVERAGES_RESTAURANT"
  | "CLEANING" | "BEVERAGES" | "GROCERIES" | "FRESH_PRODUCTS"
  | "FROZEN" | "PERSONAL_HYGIENE" | "CANDY" | "SNACKS"
  | "CIGARETTES" | "MAGAZINES" | "GREENGROCERY_SECTION"
  | "BAKERY_SECTION" | "OTHER";

export const PRODUCT_CATEGORY_DISPLAY: Record<ProductCategoryBackend, string> = {
  FRUIT: "Fruta",           VEGETABLE: "Verdura",       HERBS: "Hierbas",
  TUBER: "Tubérculo",       SEEDLING: "Plantines",      BREAD: "Pan",
  PASTRIES: "Facturas",     CAKES: "Tortas",            COOKIES: "Galletas",
  DOUGH: "Masas",           DESSERTS_BAKERY: "Postres", APPETIZERS: "Entradas",
  MAIN_COURSES: "Platos Principales",                   DESSERTS_RESTAURANT: "Postres",
  BEVERAGES_RESTAURANT: "Bebidas",                      CLEANING: "Limpieza",
  BEVERAGES: "Bebidas",     GROCERIES: "Comestibles",   FRESH_PRODUCTS: "Frescos",
  FROZEN: "Congelados",     PERSONAL_HYGIENE: "Higiene Personal",
  CANDY: "Golosinas",       SNACKS: "Snacks",           CIGARETTES: "Cigarrillos",
  MAGAZINES: "Revistas",    GREENGROCERY_SECTION: "Verdulería",
  BAKERY_SECTION: "Panadería",                          OTHER: "Otro",
};

