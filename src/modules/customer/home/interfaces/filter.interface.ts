export enum PreferenceType {
  CELIAC = 'CELIAC',
  VEGAN = 'VEGAN',
  VEGETARIAN = 'VEGETARIAN',
  GLUTEN_FREE = 'GLUTEN_FREE',
  LACTOSE_FREE = 'LACTOSE_FREE',
  LOW_SODIUM = 'LOW_SODIUM',
  NUT_FREE = 'NUT_FREE',
}

export enum ProductCategory {
  // VERDULERÍA
  FRUIT = 'FRUIT',
  VEGETABLE = 'VEGETABLE',
  HERBS = 'HERBS',
  TUBER = 'TUBER',
  SEEDLING = 'SEEDLING',
  // PANADERÍA
  BREAD = 'BREAD',
  PASTRIES = 'PASTRIES',
  CAKES = 'CAKES',
  COOKIES = 'COOKIES',
  DOUGH = 'DOUGH',
  DESSERTS_BAKERY = 'DESSERTS_BAKERY',
  // RESTAURANTE
  APPETIZERS = 'APPETIZERS',
  MAIN_COURSES = 'MAIN_COURSES',
  DESSERTS_RESTAURANT = 'DESSERTS_RESTAURANT',
  BEVERAGES_RESTAURANT = 'BEVERAGES_RESTAURANT',
  // KIOSCO/SUPERMERCADO
  CLEANING = 'CLEANING',
  BEVERAGES = 'BEVERAGES',
  GROCERIES = 'GROCERIES',
  FRESH_PRODUCTS = 'FRESH_PRODUCTS',
  FROZEN = 'FROZEN',
  PERSONAL_HYGIENE = 'PERSONAL_HYGIENE',
  CANDY = 'CANDY',
  SNACKS = 'SNACKS',
  CIGARETTES = 'CIGARETTES',
  MAGAZINES = 'MAGAZINES',
  GREENGROCERY_SECTION = 'GREENGROCERY_SECTION',
  BAKERY_SECTION = 'BAKERY_SECTION',
  OTHER = 'OTHER',
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
  [ProductCategory.DESSERTS_RESTAURANT]: 'Postres',
  [ProductCategory.BEVERAGES_RESTAURANT]: 'Bebidas',
  [ProductCategory.CLEANING]: 'Limpieza',
  [ProductCategory.BEVERAGES]: 'Bebidas',
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