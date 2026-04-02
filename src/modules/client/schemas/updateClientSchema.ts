import { z } from "zod";

export const updateClientSchema = z
  .object({
    firstName: z.string().min(1, "El nombre es obligatorio"),

    lastName: z.string().min(1, "El apellido es obligatorio"),

    birthDate: z
      .string()
      .min(1, "La fecha de nacimiento es obligatoria")
      .refine(
        (value) => {
          const birth = new Date(value);
          const today = new Date();
          return birth <= today;
        },
        {
          message: "La fecha de nacimiento no puede ser futura",
        },
      ),

    address: z.string().min(1, "La dirección es obligatoria"),

    locality: z.string().min(1, "La localidad es obligatoria"),

    phone: z
      .string()
      .min(1, "El teléfono es obligatorio")
      .regex(
        /^\+54(9)?[0-9]{10}$/,
        "El número de celular debe tener el formato válido argentino, ej: +549XXXXXXXXXX",
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
        { message: "La contraseña no debe exceder los 32 caracteres" },
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

    preferences: z.array(z.string()).optional(),
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
