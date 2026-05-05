import { Avatar, Box, Stack, Typography } from "@mui/material";
import { MdStorefront, MdCancel, MdCreditCard } from "react-icons/md";
import CustomButton from "@/shared/components/CustomButton";
import { PaymentMethodDisplayName } from "@/modules/orders/utils/payment-method-mapping";
import { PaymentMethod } from "@/modules/orders/enums/payment-method.enum";
import { useState } from "react";
import { createPaymentPreference } from "@/modules/orders/api/payment.api";

interface OrderPaymentSectionProps {
  paymentMethod: PaymentMethod;
  onCancelClick: () => void;
  orderId?: string;
  cancelDisabled?: boolean;
  showContinuePayment?: boolean;
}

/**
 * Componente que muestra la sección de método de pago y el botón para cancelar pedido.
 * También muestra "Confirmar entrega" cuando el pedido está listo para retirar.
 */
const OrderPaymentSection = ({
  paymentMethod,
  onCancelClick,
  orderId,
  cancelDisabled = false,
  showContinuePayment = true,
}: OrderPaymentSectionProps) => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleContinuePayment = async () => {
    if (!orderId) return;
    setIsProcessingPayment(true);
    try {
      const pref = await createPaymentPreference(orderId);
      // Redirect to Mercado Pago sandbox/init point
      const target = pref.sandboxInitPoint || pref.initPoint;
      window.location.href = target;
    } catch (err: any) {
      console.error("continue payment failed:", err);
      setIsProcessingPayment(false);
    }
  };
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{ mb: 3, alignItems: "stretch" }}
    >
      {/* Método de Pago */}
      <Box
        sx={{
          bgcolor: "#F5F5F5",
          borderRadius: 3,
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          flex: { xs: "none", sm: 1 },
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: "#E3F2FD",
          }}
        >
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
        <Box>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              fontSize: { xs: 14, sm: 15 },
              color: "#2D2D2D",
            }}
          >
            {PaymentMethodDisplayName[paymentMethod]}
          </Typography>
        </Box>
      </Box>

      {/* Botón Cancelar Pedido */}
      <CustomButton
        text="Cancelar Pedido"
        fullWidth
        onClick={onCancelClick}
        disabled={cancelDisabled}
        startIcon={<MdCancel size={20} />}
        sx={{
          borderRadius: 3,
          py: 1.5,
          fontWeight: 600,
          fontSize: { xs: 14, sm: 15 },
          textTransform: "none",
          boxShadow: "none",
          backgroundColor: cancelDisabled ? "#EEEEEE" : "#F5F5F5",
          color: cancelDisabled ? "#BDBDBD" : "#D32F2F",
          flex: { xs: "none", sm: 1 },
          "&:hover": {
            backgroundColor: cancelDisabled ? "#EEEEEE" : "#FFEBEE",
            boxShadow: "none",
          },
        }}
      />

      {/* Continuar Pago: sólo para Mercado Pago cuando el pago aún no fue completado */}
      {paymentMethod === PaymentMethod.MERCADO_PAGO && showContinuePayment && (
        <CustomButton
          text="Continuar pago"
          fullWidth
          onClick={handleContinuePayment}
          isLoading={isProcessingPayment}
          startIcon={<MdCreditCard size={20} />}
          sx={{
            borderRadius: 3,
            py: 1.5,
            fontWeight: 600,
            fontSize: { xs: 14, sm: 15 },
            textTransform: "none",
            boxShadow: "none",
            flex: { xs: "none", sm: 1 },
            backgroundColor: "#477e5c",
            color: "#FFFFFF",
            "&:hover": {
              boxShadow: "0 2px 8px rgba(119,167,135,0.3)",
            },
          }}
        />
      )}
    </Stack>
  );
};

export default OrderPaymentSection;
