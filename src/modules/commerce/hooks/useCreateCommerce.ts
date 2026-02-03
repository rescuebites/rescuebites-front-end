import { useMutation } from "@tanstack/react-query";
import { createCommerce } from "../api/commerce.api";
import { CreateCommerceParams } from "../interfaces/createCommerce.interface";
import { REGISTER_COMMERCE_KEY } from "../constants";

export function useCreateCommerce() {
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationFn: async (params: CreateCommerceParams) => {
      await createCommerce(params);
    },
    mutationKey: [REGISTER_COMMERCE_KEY],
  });

  return { isPending, isSuccess, mutateAsync };
}