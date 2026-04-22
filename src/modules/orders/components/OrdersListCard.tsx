import { Store, Clock } from "lucide-react";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { OrderSummaryForClientResponse } from "../interfaces/responses/order-summary-client-response.interface";
import { getShortOrderNumber } from "../utils/order.utils";
import { OrderStatusStyles } from "../config/order-status-styles.config";
import { OrderStatusDisplayName } from "../utils/order-status-mapping";
import { formatDateWithTime } from "@/shared/utils/dateFormat";
import { useNavigate } from "react-router-dom";

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
                width: 44,
                height: 44,
                borderRadius: 2,
                bgcolor: "#FFF0E6",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {commerceImageUrl ? (
                <img
                  src={commerceImageUrl}
                  alt={order.commerceName}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Store size={30} color="#E07A30" />
              )}
            </Box>
            <Box>
              <Typography fontWeight={600} fontSize={25}>
                {order.commerceName}
              </Typography>
              <Chip
                label={OrderStatusDisplayName[order.status]}
                size="small"
                sx={{
                  mt: 0.5,
                  height: 20,
                  fontSize: 15,
                  fontWeight: 500,
                  color,
                  bgcolor: bg,
                  borderRadius: "999px",
                }}
              />
            </Box>
          </Box>
          <Typography fontSize={20} color="text.secondary">
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
              <Typography fontSize={18} color="text.secondary">
                {formatDateWithTime(order.createdAt)}
              </Typography>
            </Box>
            <Typography fontSize={20} color="text.disabled">
              {order.totalItems}{" "}
              {order.totalItems === 1 ? "Producto" : "Productos"}
            </Typography>
          </Box>
          <Typography fontWeight={550} fontSize={22} color="#77A787">
            ${order.total.toFixed(2)}
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
        <Typography
          fontSize={20}
          fontWeight={500}
          color="#2d2d2d"
          textAlign="center"
        >
          Sin pedidos
        </Typography>
        <Typography fontSize={18} color="#6d6d6d" textAlign="center">
          No encontramos pedidos en esta categoría. Realizá tu próxima compra y llená tu lista.
        </Typography>
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
