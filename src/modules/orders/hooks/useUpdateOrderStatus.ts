import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "../api/order.api";
import { OrderStatus } from "../enums/order-status.enum";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import { UpdateOrderStatusRequest } from "../interfaces/requests/update-order-status.request";

interface UpdateOrderStatusParams {
  commerceId: string;
  orderId: string;
  body: UpdateOrderStatusRequest;
}

const statusSuccessMessage: Partial<Record<OrderStatus, string>> = {
  [OrderStatus.PREPARING]: "Pedido aceptado. El cliente será notificado.",
  [OrderStatus.READY]: "El cliente fue notificado que su pedido está listo.",
  [OrderStatus.CANCELLED]: "Pedido cancelado exitosamente.",
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  const showMessage = useSnackbarStore((state) => state.showMessage);

  return useMutation<void, Error, UpdateOrderStatusParams>({
    mutationFn: ({ commerceId, orderId, body }) =>
      updateOrderStatus(commerceId, orderId, body),
    onSuccess: (_data, variables) => {
      const msg = statusSuccessMessage[variables.body.newStatus];
      if (msg) showMessage(msg, "success");
      queryClient.invalidateQueries({
        queryKey: [
          "commerce-order-detail",
          variables.commerceId,
          variables.orderId,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: ["commerce-orders", variables.commerceId],
      });
    },
  });
};
