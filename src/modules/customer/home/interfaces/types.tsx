import { ProductCategory } from "@/modules/products/enums/product-category.enum";
import { ProductCondition } from "@/modules/products/enums/product-condition.enum";

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

