import {
  ProductCategory,
  ProductCondition,
} from "@/modules/products/utils/constants";

export interface CreateProductRequest {
  name: string;
  description: string;
  stock: number;
  originalPrice: number;
  discountPercentage: number;
  category: ProductCategory;
  condition: ProductCondition;
  expirationDate?: string;
}

export interface CreateProductParams {
  commerceId: string;
  product: CreateProductRequest;
  images: File[];
}
