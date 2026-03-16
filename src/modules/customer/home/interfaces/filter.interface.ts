import { ProductCategory, PreferenceType, CommerceTypeEnum } from "@/shared/enums/product.enums";

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