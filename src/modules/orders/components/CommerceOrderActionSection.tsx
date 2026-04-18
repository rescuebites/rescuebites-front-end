import { Avatar, Box, Stack } from "@mui/material";
import CustomTitle from "@/shared/components/CustomTitle";
import { MdStorefront } from "react-icons/md";
import CustomButton from "@/shared/components/CustomButton";
import { ConfirmModal } from "@/shared/components/ui/ConfirmModal";
import { CancelOrderDialog } from "@/modules/orders/components/CancelOrderDialog";
import { OrderStatus } from "@/modules/orders/enums/order-status.enum";
import { PaymentMethod } from "@/modules/orders/enums/payment-method.enum";
import { PaymentMethodDisplayName } from "@/modules/orders/utils/payment-method-mapping";
import { useState } from "react";
import { useUpdateOrderStatus } from "@/modules/orders/hooks/useUpdateOrderStatus";
import { MdCheckCircle, MdCancel, MdPlayArrow } from "react-icons/md";

interface CommerceOrderActionSectionProps {
  commerceId: string;
  orderId: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
}

const CommerceOrderActionSection = ({
  commerceId,
  orderId,
  status,
  paymentMethod,
}: CommerceOrderActionSectionProps) => {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [confirmReadyOpen, setConfirmReadyOpen] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);

  const { mutate: updateStatus, isPending } = useUpdateOrderStatus();

  const handleAccept = () => {
    setIsAccepting(true);
    updateStatus(
      { commerceId, orderId, body: { newStatus: OrderStatus.PREPARING } },
      {
        onSuccess: () => setIsAccepting(false),
        onError: () => setIsAccepting(false),
      }
    );
  };

  const handleReady = () => {
    updateStatus(
      { commerceId, orderId, body: { newStatus: OrderStatus.READY } },
      { onSuccess: () => setConfirmReadyOpen(false) }
    );
  };

  const handleCancel = (reason: string) => {
    updateStatus(
      { commerceId, orderId, body: { newStatus: OrderStatus.CANCELLED, reason } },
      { onSuccess: () => setCancelDialogOpen(false) }
    );
  };

  const showActions =
    status === OrderStatus.PENDING ||
    status === OrderStatus.CONFIRMED ||
    status === OrderStatus.PREPARING;

  if (!showActions) return null;

  return (
    <>
      {/* Método de pago */}
      <Box
        sx={{
          bgcolor: "#F5F5F5",
          borderRadius: 3,
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 2,
        }}
      >
        <Avatar sx={{ width: 40, height: 40, bgcolor: "#E3F2FD" }}>
          {paymentMethod === PaymentMethod.MERCADO_PAGO ? (
            <Box
              component="img"
              src="/mercadoPagoLogo.png"
              alt="Mercado Pago"
              sx={{ width: 40, height: 40 }}
            />
          ) : (
            <MdStorefront size={20} color="#1976D2" />
          )}
        </Avatar>
        <CustomTitle
          text={PaymentMethodDisplayName[paymentMethod]}
          variant="body1"
          color="#2D2D2D"
          fontWeight={600}
          fontSize={15}
          align="left"
        />
      </Box>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box sx={{ flex: 1 }}>
          <CustomButton
            text="Cancelar Pedido"
            fullWidth
            onClick={() => setCancelDialogOpen(true)}
            disabled={isPending || isAccepting || status === OrderStatus.PREPARING}
            startIcon={<MdCancel size={20} />}
            sx={{
              borderRadius: 3,
              py: 1.5,
              fontWeight: 600,
              fontSize: { xs: 14, sm: 15 },
              textTransform: "none",
              boxShadow: "none",
              backgroundColor: "#F5F5F5",
              color: "#D32F2F",
              "&:hover": {
                backgroundColor: "#FFEBEE",
                boxShadow: "none",
              },
            }}
          />
        </Box>

        {(status === OrderStatus.PENDING || status === OrderStatus.CONFIRMED) && (
          <Box sx={{ flex: 1 }}>
            <CustomButton
              text="Aceptar pedido"
              fullWidth
              onClick={handleAccept}
              isLoading={isPending}
              startIcon={<MdPlayArrow size={20} />}
              sx={{
                borderRadius: 3,
                py: 1.5,
                fontWeight: 600,
                fontSize: { xs: 14, sm: 15 },
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "0 2px 8px rgba(119,167,135,0.3)",
                },
              }}
            />
          </Box>
        )}

        {status === OrderStatus.PREPARING && (
          <Box sx={{ flex: 1 }}>
            <CustomButton
              text="Listo"
              fullWidth
              onClick={() => setConfirmReadyOpen(true)}
              isLoading={isPending}
              startIcon={<MdCheckCircle size={20} />}
              sx={{
                borderRadius: 3,
                py: 1.5,
                fontWeight: 600,
                fontSize: { xs: 14, sm: 15 },
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "0 2px 8px rgba(119,167,135,0.3)",
                },
              }}
            />
          </Box>
        )}
      </Stack>

      <ConfirmModal
        open={confirmReadyOpen}
        title="Confirmar pedido listo"
        description="Notificaremos al cliente que su pedido está listo. ¿Está seguro que desea continuar?"
        confirmText="Confirmar"
        cancelText="Volver"
        onConfirm={handleReady}
        onCancel={() => setConfirmReadyOpen(false)}
      />

      <CancelOrderDialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
        onConfirm={handleCancel}
        isLoading={isPending}
      />
    </>
  );
};

export default CommerceOrderActionSection;
