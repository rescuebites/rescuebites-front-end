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
  commerceId: string;
  commerceName: string;
  name: string;
  description: string;
  stock: number;
  originalPrice: number;
  discountPercentage: number;
  discountedPrice: number;
  category: ProductCategory;
  condition: ProductCondition;
  expirationDate: string | null;
  imageUrls: string[];
  active: boolean;
}
export interface Deal {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;  
  discount: number;
  imageUrl: string;
  expiresIn?: string;  // ej: "two days", "one day"
  description: string;
  stock: number;
  expirationDate: string; // ISO date string
  category: string;
  productType: string;
  storeId: string;
  tags: string[];
}

export interface Store {
  id: number;
  name: string;
  profileImageUrl: string;
  categories: string[];
}

export const categories = [
  "Panadería",
  "Supermercado",
  "Verdulería",
  "Restaurante",
  "Kiosco",
];