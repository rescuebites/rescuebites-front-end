export enum PreferenceType {
  CELIAC = 'Celiaco',
  VEGAN = 'Vegano',
  VEGETARIAN = 'Vegetariano',
  GLUTEN_FREE = 'Sin Gluten',
  LACTOSE_FREE = 'Sin Lactosa',
  LOW_SODIUM = 'Bajo en Sodio',
  NUT_FREE = 'Sin Frutos Secos',
}

export enum ProductCategory {
  // VERDULERÍA
  FRUIT = 'Fruta',
  VEGETABLE = 'Verdura',
  HERBS = 'Hierbas',
  TUBER = 'Tubérculo',
  SEEDLING = 'Plantín',
  // PANADERÍA
  BREAD = 'Pan',
  PASTRIES = 'Facturas',
  CAKES = 'Tortas',
  COOKIES = 'Galletas',
  DOUGH = 'Masas',
  DESSERTS_BAKERY = 'Postres',
  // RESTAURANTE
  APPETIZERS = 'Entradas',
  MAIN_COURSES = 'Platos Principales',
  DESSERTS_RESTAURANT = 'Postres',
  BEVERAGES_RESTAURANT = 'Bebidas',
  // KIOSCO/SUPERMERCADO
  CLEANING = 'Limpieza',
  BEVERAGES = 'Bebidas',
  GROCERIES = 'Comestibles',
  FRESH_PRODUCTS = 'Frescos',
  FROZEN = 'Congelados',
  PERSONAL_HYGIENE = 'Higiene Personal',
  CANDY = 'Golosinas',
  SNACKS = 'Snacks',
  CIGARETTES = 'Cigarrillos',
  MAGAZINES = 'Revistas',
  GREENGROCERY_SECTION = 'Verdulería',
  BAKERY_SECTION = 'Panadería',
  OTHER = 'Otro',
}

export interface ProductFilters {
  permanentPreferences: PreferenceType[];
  temporaryPreferences: PreferenceType[];
  categories: ProductCategory[];
}

export interface FilterLabels {
  [key: string]: string;
}

export const PREFERENCE_LABELS: FilterLabels = {
  [PreferenceType.CELIAC]: 'Celíaco',
  [PreferenceType.VEGAN]: 'Vegano',
  [PreferenceType.VEGETARIAN]: 'Vegetariano',
  [PreferenceType.GLUTEN_FREE]: 'Sin Gluten',
  [PreferenceType.LACTOSE_FREE]: 'Sin Lactosa',
  [PreferenceType.LOW_SODIUM]: 'Bajo en Sodio',
  [PreferenceType.NUT_FREE]: 'Sin Frutos Secos',
};

export const CATEGORY_LABELS: FilterLabels = {
  [ProductCategory.FRUIT]: 'Frutas',
  [ProductCategory.VEGETABLE]: 'Verduras',
  [ProductCategory.HERBS]: 'Hierbas',
  [ProductCategory.TUBER]: 'Tubérculos',
  [ProductCategory.SEEDLING]: 'Plantines',
  [ProductCategory.BREAD]: 'Pan',
  [ProductCategory.PASTRIES]: 'Facturas',
  [ProductCategory.CAKES]: 'Tortas',
  [ProductCategory.COOKIES]: 'Galletas',
  [ProductCategory.DOUGH]: 'Masas',
  [ProductCategory.DESSERTS_BAKERY]: 'Postres',
  [ProductCategory.APPETIZERS]: 'Entradas',
  [ProductCategory.MAIN_COURSES]: 'Platos Principales',
  [ProductCategory.BEVERAGES_RESTAURANT]: 'Bebidas',
  [ProductCategory.CLEANING]: 'Limpieza',
  [ProductCategory.GROCERIES]: 'Comestibles',
  [ProductCategory.FRESH_PRODUCTS]: 'Frescos',
  [ProductCategory.FROZEN]: 'Congelados',
  [ProductCategory.PERSONAL_HYGIENE]: 'Higiene Personal',
  [ProductCategory.CANDY]: 'Golosinas',
  [ProductCategory.SNACKS]: 'Snacks',
  [ProductCategory.CIGARETTES]: 'Cigarrillos',
  [ProductCategory.MAGAZINES]: 'Revistas',
  [ProductCategory.GREENGROCERY_SECTION]: 'Verdulería',
  [ProductCategory.BAKERY_SECTION]: 'Panadería',
  [ProductCategory.OTHER]: 'Otro',
};

// Grupos de categorías por tipo de comercio
export const CATEGORY_GROUPS = {
  bakery: {
    title: 'Panadería',
    categories: [
      ProductCategory.BREAD,
      ProductCategory.PASTRIES,
      ProductCategory.CAKES,
      ProductCategory.COOKIES,
      ProductCategory.DOUGH,
      ProductCategory.DESSERTS_BAKERY,
    ],
  },
  restaurant: {
    title: 'Restaurante',
    categories: [
      ProductCategory.APPETIZERS,
      ProductCategory.MAIN_COURSES,
      ProductCategory.DESSERTS_RESTAURANT,
      ProductCategory.BEVERAGES_RESTAURANT,
    ],
  },
  supermarket: {
    title: 'Supermercado',
    categories: [
      //ProductCategory.DAIRY,
      ProductCategory.FRESH_PRODUCTS,
      ProductCategory.FROZEN,
      ProductCategory.GROCERIES,
      ProductCategory.BEVERAGES,
      ProductCategory.CLEANING,
      ProductCategory.PERSONAL_HYGIENE,
      ProductCategory.CANDY,
      ProductCategory.SNACKS,
      ProductCategory.GREENGROCERY_SECTION,
      ProductCategory.BAKERY_SECTION,
    ],
  },
  greengrocery: {
    title: 'Verdulería',
    categories: [
      ProductCategory.FRUIT,
      ProductCategory.VEGETABLE,
      ProductCategory.HERBS,
      ProductCategory.TUBER,
      ProductCategory.SEEDLING,
    ],
  },
};

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