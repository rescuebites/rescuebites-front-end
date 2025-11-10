import { useMutation } from "@tanstack/react-query";
import { createProduct } from "@/modules/products/api/product.api";
import { CreateProductParams } from "@/modules/products/interfaces/requests/createProduct.interface";
import { API_PRODUCT_KEY } from "@/modules/products/utils/constants";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";

export function useCreateProduct() {
  const showMessage = useSnackbarStore((state) => state.showMessage);

  const mutation = useMutation<void, Error, CreateProductParams>({
    mutationFn: createProduct,
    mutationKey: [API_PRODUCT_KEY],
    onSuccess: () => {
      showMessage("Producto creado exitosamente", "success");
    },
  });

  return mutation;
}
