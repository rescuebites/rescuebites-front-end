// interfaces/types.ts
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
  subtitle: string;
  imageUrl: string;
  location?: string;
  schedule?: string;
  deliveryAvailable: boolean;
  phoneNumber?: string;
}

export const categories = [
  "Panadería",
  "Supermercado",
  "Verdulería",
  "Restaurante",
  "Kiosco",
];