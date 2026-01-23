export type Store = {
  id: string;
  name: string;
  subtitle: string;
  imageUrl: string;
  location: string;
  schedule: string;
  deliveryAvailable: boolean;
  phoneNumber?: string;
};

export type Deal = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  images?: string[]; // Array de imágenes adicionales
  price: number;
  originalPrice: number;
  discount: number;
  stock: number;
  expirationDate: string; // ISO format
  category: (typeof categories)[number];
  productType: string;
  storeId: string;
  tags?: ProductTag[];
};

export type ProductTag =
  | "maduro"
  | "vegano"
  | "vegetariano"
  | "sin-gluten"
  | "sin-lactosa"
  | "organico"
  | "buen-estado";

export const categories = [
  "Panadería",
  "Supermercado",
  "Verdulería",
  "Restaurante",
  "Kiosco",
] as const;

export type UserPreferences = {
  celiaco: boolean;
  vegano: boolean;
  vegetariano: boolean;
  sinLactosa: boolean;
};
