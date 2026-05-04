import { ProductCategory } from "../../modules/products/enums/product-category.enum";
import { ProductCondition } from "../../modules/products/enums/product-condition.enum";
import { CommerceType } from "../../modules/commerce/enums/commerce-type.enum";

export function getProductCategoryGroups(): Array<{
  key: string;
  title: string;
  categories: ProductCategory[];
}> {
  return [
    {
      key: "frutas_verduras",
      title: "Frutas y Verduras",
      categories: [
        ProductCategory.FRUIT,
        ProductCategory.VEGETABLE,
        ProductCategory.HERBS,
        ProductCategory.TUBER,
        ProductCategory.SEEDLING,
      ],
    },
    {
      key: "panaderia",
      title: "Panadería",
      categories: [
        ProductCategory.BREAD,
        ProductCategory.PASTRIES,
        ProductCategory.CAKES,
        ProductCategory.COOKIES,
        ProductCategory.DOUGH,
        ProductCategory.DESSERTS_BAKERY,
      ],
    },
    {
      key: "restaurante",
      title: "Restaurante",
      categories: [
        ProductCategory.APPETIZERS,
        ProductCategory.MAIN_COURSES,
        ProductCategory.DESSERTS_RESTAURANT,
        ProductCategory.BEVERAGES_RESTAURANT,
      ],
    },
    {
      key: "kiosco_super",
      title: "Kiosco y Supermercado",
      categories: [
        ProductCategory.GREENGROCERY_SECTION,
        ProductCategory.BAKERY_SECTION,
        ProductCategory.CLEANING,
        ProductCategory.BEVERAGES,
        ProductCategory.GROCERIES,
        ProductCategory.FRESH_PRODUCTS,
        ProductCategory.FROZEN,
        ProductCategory.PERSONAL_HYGIENE,
        ProductCategory.CANDY,
        ProductCategory.SNACKS,
        ProductCategory.CIGARETTES,
        ProductCategory.MAGAZINES,
      ],
    },
    {
      key: "otros",
      title: "Otros",
      categories: [ProductCategory.OTHER],
    },
  ];
}
export function getAllowedProductCategories(
  commerceType: CommerceType,
): ProductCategory[] {
  switch (commerceType) {
    case CommerceType.GREENGROCERY:
      return [
        ProductCategory.FRUIT,
        ProductCategory.VEGETABLE,
        ProductCategory.HERBS,
        ProductCategory.TUBER,
        ProductCategory.SEEDLING,
        ProductCategory.OTHER,
      ];
    case CommerceType.BAKERY:
      return [
        ProductCategory.BREAD,
        ProductCategory.PASTRIES,
        ProductCategory.CAKES,
        ProductCategory.COOKIES,
        ProductCategory.DOUGH,
        ProductCategory.DESSERTS_BAKERY,
        ProductCategory.OTHER,
      ];
    case CommerceType.RESTAURANT:
      return [
        ProductCategory.APPETIZERS,
        ProductCategory.MAIN_COURSES,
        ProductCategory.DESSERTS_RESTAURANT,
        ProductCategory.BEVERAGES_RESTAURANT,
        ProductCategory.OTHER,
      ];
    case CommerceType.KIOSK:
      return [
        ProductCategory.CLEANING,
        ProductCategory.BEVERAGES,
        ProductCategory.GROCERIES,
        ProductCategory.FRESH_PRODUCTS,
        ProductCategory.FROZEN,
        ProductCategory.PERSONAL_HYGIENE,
        ProductCategory.CANDY,
        ProductCategory.SNACKS,
        ProductCategory.CIGARETTES,
        ProductCategory.MAGAZINES,
        ProductCategory.OTHER,
      ];
    case CommerceType.SUPERMARKET:
      return [
        ProductCategory.GREENGROCERY_SECTION,
        ProductCategory.BAKERY_SECTION,
        ProductCategory.CLEANING,
        ProductCategory.BEVERAGES,
        ProductCategory.GROCERIES,
        ProductCategory.FRESH_PRODUCTS,
        ProductCategory.FROZEN,
        ProductCategory.PERSONAL_HYGIENE,
        ProductCategory.CANDY,
        ProductCategory.SNACKS,
        ProductCategory.CIGARETTES,
        ProductCategory.MAGAZINES,
        ProductCategory.OTHER,
      ];
    default:
      return [ProductCategory.OTHER];
  }
}

export function getAllowedProductConditions(
  commerceType: CommerceType,
): ProductCondition[] {
  switch (commerceType) {
    case CommerceType.GREENGROCERY:
      return [
        ProductCondition.EXCELLENT,
        ProductCondition.GOOD,
        ProductCondition.RIPE,
        ProductCondition.ALMOST_RIPE,
        ProductCondition.OVERRIPE,
        ProductCondition.OTHER,
      ];
    case CommerceType.BAKERY:
      return [
        ProductCondition.EXCELLENT,
        ProductCondition.GOOD,
        ProductCondition.FRESHLY_BAKED,
        ProductCondition.SAME_DAY,
        ProductCondition.PREVIOUS_DAY,
        ProductCondition.OTHER,
      ];
    case CommerceType.RESTAURANT:
      return [
        ProductCondition.EXCELLENT,
        ProductCondition.GOOD,
        ProductCondition.READY_TO_SERVE,
        ProductCondition.NEEDS_REHEATING,
        ProductCondition.OTHER,
      ];
    case CommerceType.KIOSK:
    case CommerceType.SUPERMARKET:
      return [
        ProductCondition.EXCELLENT,
        ProductCondition.GOOD,
        ProductCondition.DENTED_PACKAGING,
        ProductCondition.NEAR_EXPIRY,
        ProductCondition.EXPIRED_TODAY,
        ProductCondition.DAMAGED_LABEL,
        ProductCondition.OTHER,
      ];
    default:
      return [ProductCondition.OTHER];
  }
}
