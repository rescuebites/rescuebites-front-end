import { z } from "zod";

export const registerCommerceSchema = z
  .object({
    email: z
      .string()
      .min(1, "El correo electrónico es obligatorio")
      .email("Correo inválido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(22, "La contraseña no debe exceder los 22 caracteres")
      .regex(
        /[A-Z]/,
        "La contraseña debe contener al menos una letra mayúscula",
      )
      .regex(
        /[a-z]/,
        "La contraseña debe contener al menos una letra minúscula",
      )
      .regex(/[0-9]/, "La contraseña debe contener al menos un número")
      .regex(
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        "La contraseña debe contener al menos un carácter especial",
      ),
    confirmPassword: z.string().min(1, "Debe confirmar la contraseña"),
    name: z.string().min(1, "El nombre del comercio es obligatorio"),
    description: z
      .string()
      .max(255, "La descripción no puede superar los 255 caracteres")
      .optional()
      .or(z.literal("")),
    commerceTypes: z
      .array(z.string())
      .min(1, "Seleccioná al menos un tipo de comercio"),
    address: z.string().min(1, "La dirección es obligatoria"),
    locality: z.string().min(1, "La localidad es obligatoria"),
    phone: z
      .string()
      .min(1, "El teléfono es obligatorio")
      .regex(
        /^\+54(9)?[0-9]{10}$/,
        "Formato inválido. Ejemplo: +5493512345678",
      ),
    profilePhotos: z
      .array(z.instanceof(File))
      .min(1, "La imagen del comercio es obligatoria"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterCommerceSchema = z.infer<typeof registerCommerceSchema>;
