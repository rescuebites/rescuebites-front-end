import { ProductCategory } from './filter.interface';

export enum ProductCondition {
  RIPE = 'RIPE',
  NEAR_EXPIRY = 'NEAR_EXPIRY',
  DAMAGED = 'DAMAGED',
  SURPLUS = 'SURPLUS',
  OTHER = 'OTHER'
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

export interface Deal {
  id: number;
  title: string;
  price: number;
  originalPrice: number;  
  discount: number;
  imageUrl: string;
  expiresIn?: string;
  description: string;
  stock: number;
  expirationDate: string;
  category: string;
  productType: string;
  storeId: number;
  tags?: ProductTag[];
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

export const categories = [
  "Panadería",
  "Supermercado",
  "Verdulería",
  "Restaurante",
  "Kiosco",
];