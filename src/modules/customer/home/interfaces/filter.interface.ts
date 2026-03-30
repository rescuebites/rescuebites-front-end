import { PreferenceType } from "@/modules/client/enums/preference-type.enum";
import { ProductCategory } from "@/modules/products/enums/product-category.enum";

// Re-export para mantener compatibilidad
export { PreferenceType, ProductCategory };

export interface ProductFilters {
  permanentPreferences: PreferenceType[];
  temporaryPreferences: PreferenceType[];
  categories: ProductCategory[];
}

export interface Category {
  id: string;
  name: string;
  type: string; // "panaderia", "frutas-verduras", etc.
}

export interface FilterParams {
  category?: string;
  search?: string;
  //sortBy?: 'discount' | 'price' | 'expiration';
}