import { CommerceTypeEnum } from "@/shared/enums/commerce-type.enum";
import { ProductCategory } from "@/modules/products/enums/product-category.enum";
import { PreferenceType } from "@/modules/client/enums/preference-type.enum";

export interface ProductFilters {
  permanentPreferences: PreferenceType[];
  temporaryPreferences: PreferenceType[];
  categories: ProductCategory[];
}

export interface FilterLabels {
  [key: string]: string;
}

// Usa los displayName centralizados si los necesitas

// Grupos de categorías por tipo de comercio
// Usa getAllowedProductCategories(commerceType) del util centralizado

export interface Category {
  id: string;
  name: string;
  type: CommerceTypeEnum;
}

export interface FilterParams {
  category?: string;
  search?: string;
  //sortBy?: 'discount' | 'price' | 'expiration';
}