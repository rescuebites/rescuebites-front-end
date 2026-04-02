import { Card, CardContent, Stack, Typography, Divider, Button, Box } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CustomTitle from "@/shared/components/CustomTitle";
import CustomButton from "@/shared/components/CustomButton";
import { PaymentMethodDisplayName } from "@/modules/orders/utils/payment-method-mapping";
import type { CartResponse } from "../interfaces/responses/cart-response.interface";

interface Props {
  cart: CartResponse;
  confirming: boolean;
  onChangePaymentMethod: () => void;
  onConfirmOrder: () => void;
}

export default function PaymentDetails({ cart, confirming, onChangePaymentMethod, onConfirmOrder }: Props) {
  return (
    <>
      <CustomTitle text="Método de pago" variant="h5" align="left" color="#2d2d2d" />
      <Card elevation={0} sx={{ borderRadius: 4, border: "1px solid #F3F4F6", bgcolor: "white", mb: 3 }}>
        <CardContent sx={{ p: "14px !important" }}>

          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#F9FAFB" }}>
                <SwapHorizIcon sx={{ color: "#2563EB", fontSize: 22 }} />
              </Box>
              <Typography sx={{ fontWeight: 600, fontSize: { xs: 18, sm: 21, md: 25 }, color: "#111827" }}>
                {cart.selectedPaymentMethod
                  ? PaymentMethodDisplayName[cart.selectedPaymentMethod]
                  : "Sin método de pago seleccionado"}
              </Typography>
            </Stack>
            <Button
              size="small"
              onClick={onChangePaymentMethod}
              sx={{ color: "#477e5c", fontWeight: 600, fontSize: { xs: 14.5, sm: 16.5, md: 19 }, textTransform: "none", p: 0, "&:hover": { bgcolor: "transparent", textDecoration: "underline" } }}
            >
              Cambiar
            </Button>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontSize: { xs: 15.5, sm: 19.5, md: 22.5 }, color: "#6B7280" }}>Subtotal</Typography>
              <Typography sx={{ fontSize: { xs: 17, sm: 21, md: 23 }, fontWeight: 500, color: "#374151" }}>
                ${cart.subtotal.toFixed(2).replace(".", ",")}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontSize: { xs: 15.5, sm: 19.5, md: 22.5 }, color: "#6B7280" }}>Tasa de servicio</Typography>
              <Typography sx={{ fontSize: { xs: 17, sm: 21, md: 23 }, fontWeight: 500, color: "#374151" }}>
                ${cart.serviceFee.toFixed(2).replace(".", ",")}
              </Typography>
            </Stack>

            <Divider sx={{ my: 0.5 }} />

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography sx={{ fontSize: { xs: 16, sm: 20, md: 23 }, fontWeight: 700, color: "#111827" }}>Total</Typography>
              <Typography sx={{ fontSize: { xs: 19.5, sm: 24.5, md: 27.5 }, fontWeight: 700, color: "#477e5c" }}>
                ${cart.total.toFixed(2).replace(".", ",")}
              </Typography>
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