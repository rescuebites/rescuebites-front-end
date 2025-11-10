import { z } from "zod";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_PRODUCT_IMAGES,
} from "@/modules/products/utils/constants";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede superar los 500 caracteres"),
  stock: z.coerce
    .number({
      invalid_type_error: "El stock es obligatorio",
    })
    .int("El stock debe ser un número entero")
    .min(1, "El stock debe ser al menos 1"),
  originalPrice: z.coerce
    .number({
      invalid_type_error: "El precio original es obligatorio",
    })
    .min(0.01, "El precio original debe ser mayor a 0"),
  discountPercentage: z.coerce
    .number({
      invalid_type_error: "El porcentaje de descuento es obligatorio",
    })
    .min(0, "El descuento no puede ser negativo")
    .max(100, "El descuento no puede superar el 100%"),
  category: z.string().min(1, "La categoría es obligatoria"),
  condition: z.string().min(1, "La condición es obligatoria"),
  expirationDate: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        const today = new Date();
        const selected = new Date(value);
        today.setHours(0, 0, 0, 0);
        return selected > today;
      },
      {
        message: "La fecha de vencimiento debe ser posterior a hoy",
      }
    ),
  images: z
    .array(z.instanceof(File))
    .min(1, "Debes subir al menos una imagen")
    .max(
      MAX_PRODUCT_IMAGES,
      `Puedes subir hasta ${MAX_PRODUCT_IMAGES} imágenes`
    )
    .refine(
      (files) =>
        files.every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(
            file.type as (typeof ACCEPTED_IMAGE_TYPES)[number]
          )
        ),
      {
        message: "Solo se permiten imágenes en formato JPG o PNG",
      }
    ),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;
