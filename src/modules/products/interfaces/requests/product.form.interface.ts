import { ProductCategory } from "@/modules/products/enums/product-category.enum";
import { ProductCondition } from "@/modules/products/enums/product-condition.enum";
import { PreferenceType } from "@/modules/client/enums/preference-type.enum";

export interface CreateProductRequest {
  name: string;
  description: string;
  stock: number;
  originalPrice: number;
  discountPercentage: number;
  category: ProductCategory;
  conditions: ProductCondition[];
  expirationDate: string; 
  preferences?: PreferenceType[];
}