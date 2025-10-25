import { z } from "zod";

export const registerSchema = z
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
          return birth <= today; // La fecha no puede ser futura
        },
        {
          message: "La fecha de nacimiento no puede ser futura",
        }
      ),
    
    address: z.string().optional(),
    
    email: z
      .string()
      .email("Correo inválido")
      .min(1, "El email es obligatorio"),
    
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(22, "La contraseña no debe exceder los 32 caracteres")
      .regex(
        /[A-Z]/,
        "La contraseña debe contener al menos una letra mayúscula"
      )
      .regex(
        /[a-z]/,
        "La contraseña debe contener al menos una letra minúscula"
      )
      .regex(/[0-9]/, "La contraseña debe contener al menos un número")
      .regex(
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        "La contraseña debe contener al menos un carácter especial"
      ),
    
    confirmPassword: z
      .string()
      .min(1, "La confirmación de la contraseña es obligatoria"),
    
    preferences: z.array(z.string()).optional(),
    
    profilePicture: z.instanceof(File).optional(),
  })
  .refine(
    (data) =>
      !data.password ||
      !data.confirmPassword ||
      data.password === data.confirmPassword,
    {
      message: "Las contraseñas no coinciden",
      path: ["confirmPassword"],
    }
  );
