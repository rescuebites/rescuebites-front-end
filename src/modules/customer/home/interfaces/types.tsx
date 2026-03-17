import { ProductCategory } from "@/modules/products/enums/product-category.enum";

export enum ProductCondition {
  RIPE = 'Maduro',
  NEAR_EXPIRY = 'Vencimiento próximo',
  DAMAGED = 'Dañado',
  SURPLUS = 'Sobrante',
  OTHER = 'Otro'
}

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
  tags?: ProductTag[];
  active?: boolean;
}


export type ProductTag =
  | "maduro"
  | "vegano"
  | "vegetariano"
  | "sin-gluten"
  | "sin-lactosa"
  | "organico"
  | "buen-estado";

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

