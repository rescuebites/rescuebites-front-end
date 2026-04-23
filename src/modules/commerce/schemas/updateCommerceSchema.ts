import { z } from "zod";

export const updateCommerceSchema = z
  .object({
    name: z.string().min(1, "El nombre es obligatorio"),
    description: z
      .string()
      .max(255, "La descripción no puede superar los 255 caracteres")
      .optional(),
    commerceTypes: z
      .array(z.string())
      .min(1, "Seleccioná al menos un rubro")
      .optional(),
    address: z.string().min(1, "La dirección es obligatoria"),
    locality: z.string().min(1, "La localidad es obligatoria"),
    phone: z
      .string()
      .min(1, "El teléfono es obligatorio")
      .regex(
        /^\+54(9)?[0-9]{10}$/,
        "El número de celular debe tener el formato válido argentino, ej: +54911XXXXXXXX",
      ),
    email: z
      .string()
      .email("Correo inválido")
      .min(1, "El email es obligatorio"),
    password: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val || val === "") return true;
          return val.length >= 8;
        },
        { message: "La contraseña debe tener al menos 8 caracteres" },
      )
      .refine(
        (val) => {
          if (!val || val === "") return true;
          return val.length <= 22;
        },
        { message: "La contraseña no debe exceder los 22 caracteres" },
      )
      .refine(
        (val) => {
          if (!val || val === "") return true;
          return /[A-Z]/.test(val);
        },
        { message: "La contraseña debe contener al menos una letra mayúscula" },
      )
      .refine(
        (val) => {
          if (!val || val === "") return true;
          return /[a-z]/.test(val);
        },
        { message: "La contraseña debe contener al menos una letra minúscula" },
      )
      .refine(
        (val) => {
          if (!val || val === "") return true;
          return /[0-9]/.test(val);
        },
        { message: "La contraseña debe contener al menos un número" },
      )
      .refine(
        (val) => {
          if (!val || val === "") return true;
          return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val);
        },
        {
          message: "La contraseña debe contener al menos un carácter especial",
        },
      ),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password && data.password !== "") {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Las contraseñas no coinciden",
      path: ["confirmPassword"],
    },
  );

export type UpdateCommerceSchema = z.infer<typeof updateCommerceSchema>;
