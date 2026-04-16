import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../api/products.api";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import { useNavigate } from "react-router-dom";
import { UpdateProductRequest } from "../interfaces/requests/update-product-request.interface";
import { UpdateProductSchema } from "../schemas/updateProductSchema";

export const useUpdateProduct = (commerceId: string | undefined, productId: string | undefined) => {
  const queryClient = useQueryClient();
  const showMessage = useSnackbarStore((state) => state.showMessage);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ data, images }: { data: UpdateProductSchema; images: File[] }) => {
      if (!productId) {
        throw new Error("productId no disponible");
      }
      if (!commerceId) {
        throw new Error("commerceId no disponible");
      }

      const backendPayload: UpdateProductRequest = {
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

      return updateProduct(commerceId, productId, backendPayload, images);
    },
    onSuccess: () => {
      showMessage("Producto actualizado exitosamente", "success");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      queryClient.invalidateQueries({ queryKey: ["commerce-products-by-expiration"] });
      queryClient.invalidateQueries({ queryKey: ["commerce-products-by-stock"] });
      navigate(-1);
    },
    onError: (error: any) => {
      showMessage(error?.response?.data?.message ?? "Error al actualizar producto", "error");
    },
  });
};
