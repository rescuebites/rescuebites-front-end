//Hook para ejecutar la creación del comercio en el backend.
import { useMutation } from "@tanstack/react-query";
import { createCommerce } from "../api/commerce.api";
import { CreateCommerceParams } from "../interfaces/createCommerce.interface";
import { REGISTER_COMMERCE_KEY } from "../constants";
import { usePendingRegistrationStore } from "../../users/hooks/usePendingRegistrationStore";

export function useCreateCommerce() {
  const { clearData } = usePendingRegistrationStore();

  const { isPending, isSuccess, mutate, mutateAsync } = useMutation({
    mutationFn: async (params: CreateCommerceParams) => {
      await createCommerce(params);
    },
    mutationKey: [REGISTER_COMMERCE_KEY],
    onSuccess: () => {
      // Limpiar datos temporales después de crear exitosamente
      clearData();
    },
  });

  return { isPending, isSuccess, mutate, mutateAsync };
}