import { Box, Paper, Stack } from "@mui/material";
import { getShortOrderNumber } from "../../orders/utils/order.utils";
import { formatCurrency } from "@/shared/utils/currency.utils";
import CustomTitle from "@/shared/components/CustomTitle";
import StatusChip from "../../orders/components/StatusChip";
import { OrderStatus } from "../../orders/enums/order-status.enum";

interface Props {
  name: string;
  price: number;
  date: string;
  status: OrderStatus;
  image: string;
  orderNumber: string;
}

export default function OrderCard({
  name,
  price,
  date,
  status,
  image,
  orderNumber,
}: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        display: "flex",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 150,
          overflow: "hidden",
          flexShrink: 0,
          "&:hover img": {
            transform: "scale(1.12)",
          },
        }}
      >
        <Box
          component="img"
          src={image}
          alt={name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </Box>

      <Box flex={1} sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <CustomTitle
            text={name}
            variant="body1"
            color="#2D2D2D"
            fontSize={22}
          />

          <CustomTitle
            text={`#${getShortOrderNumber(orderNumber)}`}
            variant="subtitle2"
            fontSize={20}
            color="#9CA3AF"
          />
        </Stack>

        <CustomTitle
          text={`Costo Total: $${formatCurrency(price)}`}
          color="text.secondary"
          align="left"
          fontSize={20}
        />

        <CustomTitle
          text={`Fecha: ${date}`}
          color="text.secondary"
          align="left"
          fontSize={20}
        />

        <Box sx={{ mt: 0.5 }}>
          <StatusChip status={status} />
        </Box>
      </Box>
    </Paper>
  );
}
