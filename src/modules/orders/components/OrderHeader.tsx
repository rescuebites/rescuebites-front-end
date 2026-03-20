import { Box, Card, Chip, Stack } from "@mui/material";
import CustomTitle from "@/shared/components/CustomTitle";
import { OrderStatus } from "@/modules/orders/enums/order-status.enum";
import { OrderStatusDisplayName } from "@/modules/orders/utils/order-status-mapping";
import {
  getShortOrderNumber,
  getStatusColor,
  getProgressPercentage,
} from "@/modules/orders/utils/order.utils";
import { formatDateWithTime } from "@/shared/utils/dateFormat";

interface OrderHeaderProps {
  orderNumber: string;
  status: OrderStatus;
  createdAt: string;
}

const OrderHeader = ({ orderNumber, status, createdAt }: OrderHeaderProps) => {
  const statusStyle = getStatusColor(status);

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        bgcolor: "white",
        p: { xs: 2.5, sm: 3 },
        mb: 3,
      }}
    >
      {/* Order # y Estado */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <CustomTitle
          variant="h4"
          align="left"
          text={`Pedido #${getShortOrderNumber(orderNumber)}`}
          color="#2D2D2D"
        />
        <Chip
          icon={
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: statusStyle.color,
              }}
            />
          }
          label={OrderStatusDisplayName[status]}
          sx={{
            backgroundColor: statusStyle.bg,
            color: statusStyle.color,
            fontWeight: 600,
            fontSize: { xs: 13, sm: 14 },
            height: { xs: 32, sm: 36 },
            px: 2,
            "& .MuiChip-icon": {
              ml: 0.5,
              mr: -0.5,
            },
          }}
        />
      </Stack>

      {/* Barra de progreso */}
      <Box
        sx={{
          width: "100%",
          height: 6,
          bgcolor: "#E5E7EB",
          borderRadius: 3,
          mb: 2,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${getProgressPercentage(status)}%`,
            height: "100%",
            bgcolor: statusStyle.color,
            borderRadius: 3,
            transition: "width 0.3s ease",
          }}
        />
      </Box>

      {/* Fecha */}
      <CustomTitle
        variant="body1"
        align="left"
        text={formatDateWithTime(createdAt)}
        color="#9CA3AF"
      />
    </Card>
  );
};

export default OrderHeader;
