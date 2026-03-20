import { useCancelOrder } from "@/modules/orders/hooks/useCancelOrder";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";

interface UseCancelOrderWithFeedbackProps {
  clientId: string | null | undefined;
  orderId?: string | undefined;
}

export const useCancelOrderWithFeedback = ({
  clientId,
  orderId,
}: UseCancelOrderWithFeedbackProps) => {
  const showMessage = useSnackbarStore((state) => state.showMessage);
  const { mutate: cancelOrder, isPending: isCanceling } = useCancelOrder();
  const handleCancelOrder = (
    reason: string,
    onSuccessCallback?: () => void,
  ) => {
    if (!clientId || !orderId) return;

    cancelOrder(
      { clientId, orderId, reason },
      {
        onSuccess: () => {
          showMessage("Pedido cancelado exitosamente", "success");
          onSuccessCallback?.();
        },
        onError: (error) => {
          showMessage(error.message || "Error al cancelar el pedido", "error");
        },
      },
    );
  };

  return {
    handleCancelOrder,
    isCanceling,
  };
};
