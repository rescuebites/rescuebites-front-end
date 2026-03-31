import { z } from "zod";
import { ProductCategory } from "@/modules/products/enums/product-category.enum";
import { ProductCondition } from "@/modules/products/enums/product-condition.enum";
import { PreferenceType } from "@/modules/client/enums/preference-type.enum";

export const createProductSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(100),
  description: z.string().optional(),
  category: z.nativeEnum(ProductCategory, {
    message: "Seleccione una categoría"
  }),
  conditions: z.array(z.nativeEnum(ProductCondition)).min(1, "Seleccione al menos una condición"),
  stock: z.number().min(1, "El stock debe ser al menos 1"),
  originalPrice: z.number().min(0.01, "El precio debe ser mayor a 0"),
  discountPercentage: z.number().min(0).max(100, "El descuento no puede superar el 100%"),
  expirationDate: z.string().min(1, "La fecha es obligatoria").refine((val) => {
    const selected = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected >= today;
  }, "La fecha de vencimiento debe ser hoy o posterior"),
  preferences: z.array(z.nativeEnum(PreferenceType)).optional(),
  images: z.array(z.instanceof(File)).min(1, "Agrega al menos una imagen"),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;