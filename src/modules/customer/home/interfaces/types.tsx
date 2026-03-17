import { ProductCategory } from "@/modules/products/enums/product-category.enum";
import { ProductCondition } from "@/modules/products/enums/product-condition.enum";
import { CommerceTypeEnum } from "@/shared/enums/commerce-type.enum";

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

// ============================================
// TIPOS DE COMERCIO (para UI)
// ============================================
export type CommerceTypeDisplay = 
  | "Panadería"
  | "Supermercado"
  | "Verdulería"
  | "Restaurante"
  | "Kiosco";

// Mapeo español → backend
export const COMMERCE_TYPE_TO_BACKEND: Record<CommerceTypeDisplay, CommerceTypeEnum> = {
  "Panadería": CommerceTypeEnum.BAKERY,
  "Supermercado": CommerceTypeEnum.SUPERMARKET,
  "Verdulería": CommerceTypeEnum.GREENGROCERY,
  "Restaurante": CommerceTypeEnum.RESTAURANT,
  "Kiosco": CommerceTypeEnum.KIOSK,
};

// Mapeo inverso (backend → español)
export const BACKEND_TO_COMMERCE_TYPE: Record<CommerceTypeEnum, CommerceTypeDisplay> = {
  [CommerceTypeEnum.BAKERY]: "Panadería",
  [CommerceTypeEnum.SUPERMARKET]: "Supermercado",
  [CommerceTypeEnum.GREENGROCERY]: "Verdulería",
  [CommerceTypeEnum.RESTAURANT]: "Restaurante",
  [CommerceTypeEnum.KIOSK]: "Kiosco",
};

export const commerceTypes: CommerceTypeDisplay[] = [
  "Panadería",
  "Supermercado",
  "Verdulería",
  "Restaurante",
  "Kiosco",
];

