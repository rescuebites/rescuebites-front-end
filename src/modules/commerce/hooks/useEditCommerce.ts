import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateCommerceMutation } from "./useUpdateCommerceMutation";
import { useEffect } from "react";
import type { Inputs } from "../interfaces/createCommerceInteface";
import type { CommerceResponse } from "../interfaces/commerce.interface";

// Tipo específico para el formulario que acepta FileList
type EditCommerceFormInputs = {
  email?: string;
  password?: string;
  name?: string;
  description?: string;
  commerceTypes?: string[];
  schedule?: string;
  address?: string;
  city?: string;
  profilePhoto?: FileList;
  phoneNumber?: number;
};

// Schema de validación para edición
const editCommerceSchema = z.object({
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").optional().or(z.literal("")),
  name: z.string().min(1, "El nombre es requerido").optional().or(z.literal("")),
  description: z.string().optional(),
  commerceTypes: z.array(z.string()).min(1, "Selecciona al menos un tipo de comercio").optional(),
  schedule: z.string().min(1, "El horario es requerido").optional().or(z.literal("")),
  address: z.string().min(1, "La dirección es requerida").optional().or(z.literal("")),
  city: z.string().min(1, "La ciudad es requerida").optional().or(z.literal("")),
  profilePhoto: z.instanceof(FileList).optional(),
  phoneNumber: z.number().positive("El teléfono debe ser un número positivo").optional(),
});

export const useEditCommerce = (
  commerceId: string,
  initialData?: CommerceResponse
) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<EditCommerceFormInputs>({
    resolver: zodResolver(editCommerceSchema),
    defaultValues: initialData
      ? {
          email: initialData.email,
          name: initialData.name,
          description: initialData.description,
          commerceTypes: initialData.commerceTypes,
          schedule: initialData.schedule,
          address: initialData.address,
          city: initialData.city,
          phoneNumber: initialData.phoneNumber,
        }
      : {},
  });

  const { mutate, isPending } = useUpdateCommerceMutation(commerceId);

  // Actualizar el formulario cuando llegan los datos iniciales
  useEffect(() => {
    if (initialData) {
      reset({
        email: initialData.email,
        name: initialData.name,
        description: initialData.description,
        commerceTypes: initialData.commerceTypes,
        schedule: initialData.schedule,
        address: initialData.address,
        city: initialData.city,
        phoneNumber: initialData.phoneNumber,
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data: EditCommerceFormInputs) => {
    // Convertir los datos del formulario al formato esperado por el backend
    const modifiedData: Partial<Inputs> = {};

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        if (key === 'profilePhoto' && value instanceof FileList) {
          // Convertir FileList a File
          if (value.length > 0) {
            modifiedData.profilePhoto = value[0];
          }
        } else {
          (modifiedData as any)[key] = value;
        }
      }
    });

    // Solo enviar si hay campos modificados
    if (Object.keys(modifiedData).length > 0) {
      mutate(modifiedData);
    }
  };

  return {
    register,
    handleSubmit,
    control,
    errors,
    onSubmit,
    isPending,
    setValue,
  };
};