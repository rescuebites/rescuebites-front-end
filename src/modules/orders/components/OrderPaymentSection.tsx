import { Avatar, Box, Stack, Typography } from "@mui/material";
import { MdStorefront } from "react-icons/md";
import CustomButton from "@/shared/components/CustomButton";
import { PaymentMethodDisplayName } from "@/modules/orders/utils/payment-method-mapping";
import { PaymentMethod } from "@/modules/orders/enums/payment-method.enum";

interface OrderPaymentSectionProps {
  paymentMethod: PaymentMethod;
  onCancelClick: () => void;
}

/**
 * Componente que muestra la sección de método de pago y el botón para cancelar pedido
 * Solo se muestra para pedidos en estados PENDING o CONFIRMED
 */
const OrderPaymentSection = ({
  paymentMethod,
  onCancelClick,
}: OrderPaymentSectionProps) => {
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
        onClick={onCancelClick}
        backgroundColor="#77A787"
        sx={{
          mt: 0,
          borderRadius: 3,
          py: 1.5,
          px: 4,
          fontWeight: 600,
          fontSize: { xs: 14, sm: 15 },
          textTransform: "none",
          boxShadow: "none",
          flex: { xs: "none", sm: 1 },
          width: "100%",
          "&:hover": {
            bgcolor: "#6B9677",
            boxShadow: "0 2px 8px rgba(119,167,135,0.3)",
          },
        }}
      />
    </Stack>
  );
};

export default OrderPaymentSection;
