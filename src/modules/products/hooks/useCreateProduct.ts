import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/products.api";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import { useNavigate } from "react-router-dom";
import { CreateProductRequest } from "../interfaces/requests/product.form.interface";
import { CreateProductSchema } from "../schemas/createProductSchema";

export const useCreateProduct = (commerceId: string | undefined) => {
  const queryClient = useQueryClient();
  const showMessage = useSnackbarStore((state) => state.showMessage);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ data, images }: { data: CreateProductSchema; images: File[] }) => {
      if (!commerceId) {
        throw new Error("commerceId no disponible");
      }

      const backendPayload: CreateProductRequest = {
        name: data.name,
        description: data.description ?? "",
        stock: data.stock,
        originalPrice: data.originalPrice,
        discountPercentage: data.discountPercentage,
        category: data.category,
        conditions: data.conditions,
        expirationDate: data.expirationDate,
        ...(data.preferences && data.preferences.length > 0 && { preferences: data.preferences }),
      };

      return createProduct(commerceId, backendPayload, images);
    },
    onSuccess: () => {
      showMessage("Producto publicado exitosamente", "success");
      queryClient.invalidateQueries({ queryKey: ["products", commerceId] });
      navigate("/");
    },
    onError: (error: any) => {
      showMessage(error?.response?.data?.message ?? "Error al crear producto", "error");
    },
  });
};