import { Store, Clock } from "lucide-react";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import CustomTitle from "@/shared/components/CustomTitle";
import { OrderSummaryForClientResponse } from "../interfaces/responses/order-summary-client-response.interface";
import { getShortOrderNumber } from "../utils/order.utils";
import { OrderStatusStyles } from "../config/order-status-styles.config";
import { OrderStatusDisplayName } from "../utils/order-status-mapping";
import { formatDateWithTime } from "@/shared/utils/dateFormat";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/shared/utils/currency.utils";

function OrderCard({ order }: { order: OrderSummaryForClientResponse }) {
  const style = OrderStatusStyles[order.status];
  const bg = style.backgroundColor;
  const color = style.textColor;
  const commerceImageUrl = order.commerceImages?.[0]?.url;
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      onClick={() => navigate(`/orders/${order.orderId}`)}
      sx={{
        borderRadius: 3,
        maxWidth: 1500,
        width: "100%",
        cursor: "pointer",
        "&:hover": { boxShadow: 3 },
        transition: "box-shadow 0.2s",
      }}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={1.5}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box
              sx={{
                width: { xs: 44, sm: 52 },
                height: { xs: 44, sm: 52 },
                borderRadius: 2,
                bgcolor: "#E8F5E9",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {commerceImageUrl ? (
                <img
                  src={commerceImageUrl}
                  alt={order.commerceName}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Store size={28} color="#E07A30" />
              )}
            </Box>
            <Box>
              <Typography fontWeight={600} fontSize={{ xs: 16, sm: 18 }}>
                {order.commerceName}
              </Typography>
              <Chip
                icon={
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: color,
                    }}
                  />
                }
                label={OrderStatusDisplayName[order.status]}
                sx={{
                  backgroundColor: bg,
                  color: color,
                  fontWeight: 600,
                  fontSize: { xs: 14, sm: 15 },
                  height: { xs: 30, sm: 38 },
                  px: 2,
                  "& .MuiChip-icon": {
                    ml: 0.5,
                    mr: -0.5,
                  },
                }}
              />
            </Box>
          </Box>
          <Typography fontSize={{ xs: 15, sm: 17 }} color="text.secondary">
            #{getShortOrderNumber(order.orderNumber)}
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          pt={1.5}
          borderTop="1px solid"
          borderColor="divider"
        >
          <Box display="flex" flexDirection="column" gap={0.5}>
            <Box display="flex" alignItems="center" gap={0.75}>
              <Clock size={20} color="gray" />
              <Typography fontSize={{ xs: 14, sm: 15 }} color="text.secondary">
                {formatDateWithTime(order.createdAt)}
              </Typography>
            </Box>
            <Typography fontSize={{ xs: 21, sm: 22 }} color="text.disabled">
              {order.totalItems}{" "}
              {order.totalItems === 1 ? "Producto" : "Productos"}
            </Typography>
            {/* <Typography fontSize={{ xs: 13, sm: 14 }} color="text.disabled">
              {order.totalItems ?? (order.items ?? []).reduce((sum, it) => sum + (it.quantity ?? 0), 0)}{" "}
              {(order.totalItems ?? (order.items ?? []).reduce((sum, it) => sum + (it.quantity ?? 0), 0)) === 1 ? "Producto" : "Productos"}
            </Typography> */}
          </Box>
          <Typography fontWeight={600} fontSize={{ xs: 16, sm: 18 }} color="#77A787">
            ${formatCurrency(order.total)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function OrdersListCard({
  orders = [],
}: {
  orders: OrderSummaryForClientResponse[];
}) {
  if (orders.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={0.5}
      >
        <img src="/emptyBag.png" alt="Sin pedidos" width={400} height={300} />
        <CustomTitle text="Sin pedidos" fontSize={22} fontWeight={500} color="#2d2d2d" align="center" />
        <CustomTitle text="No encontramos pedidos en esta categoría. Realizá tu próxima compra y llená tu lista." fontSize={20} color="#6d6d6d" align="center" fontWeight={400} />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={2} p={2}>
      {orders.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </Box>
  );
}
