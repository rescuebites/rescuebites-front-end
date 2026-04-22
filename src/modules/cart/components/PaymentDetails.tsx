import {
  Avatar,
  Card,
  CardContent,
  Stack,
  Divider,
  Button,
  Box,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CustomTitle from "@/shared/components/CustomTitle";
import CustomButton from "@/shared/components/CustomButton";
import { PaymentMethodDisplayName } from "@/modules/orders/utils/payment-method-mapping";
import { PaymentMethod } from "@/modules/orders/enums/payment-method.enum";
import type { CartResponse } from "../interfaces/responses/cart-response.interface";
import { formatCurrency } from "@/shared/utils/currency.utils";

interface Props {
  cart: CartResponse;
  confirming: boolean;
  onChangePaymentMethod: () => void;
  onConfirmOrder: () => void;
}

export default function PaymentDetails({
  cart,
  confirming,
  onChangePaymentMethod,
  onConfirmOrder,
}: Props) {
  return (
    <>
      <CustomTitle
        text="Método de pago"
        variant="h5"
        align="left"
        color="#2d2d2d"
      />
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid #F3F4F6",
          bgcolor: "white",
          mb: 3,
        }}
      >
        <CardContent sx={{ p: "14px !important" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar sx={{ width: 40, height: 40, bgcolor: "#E3F2FD" }}>
                {cart.selectedPaymentMethod === PaymentMethod.MERCADO_PAGO ? (
                  <Box
                    component="img"
                    src="/mercadoPagoLogo.png"
                    alt="Mercado Pago"
                    sx={{ width: 40, height: 40 }}
                  />
                ) : (
                  <SwapHorizIcon sx={{ color: "#2563EB", fontSize: 22 }} />
                )}
              </Avatar>
              <CustomTitle
                text={
                  cart.selectedPaymentMethod
                    ? PaymentMethodDisplayName[cart.selectedPaymentMethod]
                    : "Sin método de pago seleccionado"
                }
                variant="body1"
                align="left"
                color="#111827"
                
                fontSize={{ xs: 15.5, sm: 19.5, md: 22.5 }}
              />
            </Stack>
            <Button
              size="small"
              onClick={onChangePaymentMethod}
              sx={{
                color: "#77A787",
                fontWeight: 600,
                fontSize: { xs: 15, sm: 19, md: 22 },
                textTransform: "none",
                p: 0,
                "&:hover": {
                  bgcolor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              Cambiar
            </Button>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <CustomTitle
                text="Subtotal"
                variant="body1"
                align="left"
                color="#6B7280"
                fontSize={{ xs: 15, sm: 19, md: 22 }}
              />
              <CustomTitle
                text={`$${formatCurrency(cart.subtotal)}`}
                variant="body1"
                align="left"
                color="#374151"
                fontWeight={500}
                fontSize={{ xs: 15, sm: 19, md: 22 }}
              />
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <CustomTitle
                text="Tarifa de servicio"
                variant="body1"
                align="left"
                color="#6B7280"
                fontSize={{ xs: 15, sm: 19, md: 22 }}
              />
              <CustomTitle
                text={`$${formatCurrency(cart.serviceFee)}`}
                variant="body1"
                align="left"
                color="#374151"
                fontWeight={500}
                fontSize={{ xs: 15, sm: 19, md: 22 }}
              />
            </Stack>

            <Divider sx={{ my: 0.5 }} />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <CustomTitle
                text="Total"
                variant="body1"
                align="left"
                color="#111827"
                fontWeight={700}
                fontSize={{ xs: 18, sm: 22, md: 25 }}
              />
              <CustomTitle
                text={`$${formatCurrency(cart.total)}`}
                variant="body1"
                align="left"
                color="#77A787"
                fontWeight={700}
                fontSize={{ xs: 18, sm: 22, md: 25 }}
              />
            </Stack>
          </Stack>

          <CustomButton
            text="Confirmar pedido"
            fullWidth
            isLoading={confirming}
            disabled={!cart.selectedPaymentMethod || !cart.totalItems}
            onClick={onConfirmOrder}
          />
        </CardContent>
      </Card>
    </>
  );
}
