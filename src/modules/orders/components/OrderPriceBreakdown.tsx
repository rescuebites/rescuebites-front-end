import { Divider, Paper, Stack, Typography } from "@mui/material";
import CustomTitle from "@/shared/components/CustomTitle";
import { formatCurrency } from "@/shared/utils/currency.utils";

interface OrderPriceBreakdownProps {
  subtotal: number;
  discountedSubtotal: number;
  serviceFee: number;
  total: number;
}

/**
 * Componente que muestra el desglose detallado de precios del pedido
 * Incluye subtotal original, subtotal con descuento, cargo por servicio y total
 */
const OrderPriceBreakdown = ({
  subtotal,
  discountedSubtotal,
  serviceFee,
  total,
}: OrderPriceBreakdownProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "white",
        p: { xs: 2, sm: 2.5 },
        borderRadius: 4,
        mb: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <Stack spacing={1.5}>
        {/* Subtotal con descuento */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <CustomTitle
            variant="body2"
            align="left"
            text="Subtotal"
            color="#9E9E9E"
          />

          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography
              sx={{
                textDecoration: "line-through",
                color: "#9CA3AF",
                fontSize: { xs: 13, sm: 14 },
              }}
            >
              ${formatCurrency(subtotal)}
            </Typography>

            <CustomTitle
              variant="body1"
              align="left"
              text={`$${formatCurrency(discountedSubtotal)}`}
              color="#2D2D2D"
            />
          </Stack>
        </Stack>

        {/* Cargo por servicio */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <CustomTitle
            variant="body2"
            align="left"
            text="Service"
            color="#9E9E9E"
          />

          <CustomTitle
            variant="body1"
            align="left"
            text={`$${formatCurrency(serviceFee)}`}
            color="#2D2D2D"
          />
        </Stack>

        <Divider sx={{ borderColor: "#E5E7EB", my: 0.5 }} />

        {/* Total */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <CustomTitle
            variant="subtitle1"
            align="left"
            text="Total"
            color="#2D2D2D"
          />

          <CustomTitle
            variant="h6"
            align="left"
            text={`$${formatCurrency(total)}`}
            color="#77A787"
          />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default OrderPriceBreakdown;
