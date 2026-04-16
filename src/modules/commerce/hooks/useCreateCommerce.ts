import { useMutation } from "@tanstack/react-query";
import { createCommerce } from "../api/commerce.api";
import { CreateCommerceParams } from "../interfaces/requests/create-commerce.interface";
import { REGISTER_COMMERCE_KEY } from "../utils/constants";

export function useCreateCommerce() {
  const { isPending, isSuccess, mutate, mutateAsync } = useMutation({
    mutationFn: async (params: CreateCommerceParams) => {
      await createCommerce(params);
    },
    mutationKey: [REGISTER_COMMERCE_KEY],
  });

  return { isPending, isSuccess, mutate, mutateAsync };
}
