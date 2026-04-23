import { User, Clock } from "lucide-react";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import CustomTitle from "@/shared/components/CustomTitle";
import { OrderSummaryForCommerceResponse } from "../interfaces/responses/order-summary-commerce-response.interface";
import { getShortOrderNumber } from "../utils/order.utils";
import { OrderStatusStyles } from "../config/order-status-styles.config";
import { OrderStatusDisplayName } from "../utils/order-status-mapping";
import { formatDateWithTime } from "@/shared/utils/dateFormat";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/shared/utils/currency.utils";

function CommerceOrderCard({
  order,
}: {
  order: OrderSummaryForCommerceResponse;
}) {
  const style = OrderStatusStyles[order.status];
  const bg = style.backgroundColor;
  const color = style.textColor;
  const clientImageUrl = order.clientImages?.[0]?.url;
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      onClick={() => navigate(`/commerce/orders/${order.orderId}`)}
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
              {clientImageUrl ? (
                <img
                  src={clientImageUrl}
                  alt={`${order.clientName} ${order.clientLastName}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <User size={28} color="#4CAF50" />
              )}
            </Box>
            <Box>
              <Typography fontWeight={600} fontSize={{ xs: 15, sm: 17 }}>
                {order.clientName} {order.clientLastName}
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
                  fontSize: { xs: 13, sm: 14 },
                  height: { xs: 28, sm: 36 },
                  px: 2,
                  "& .MuiChip-icon": {
                    ml: 0.5,
                    mr: -0.5,
                  },
                }}
              />
            </Box>
          </Box>
          <Typography fontSize={{ xs: 14, sm: 16 }} color="text.secondary">
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
              <Typography fontSize={{ xs: 13, sm: 14 }} color="text.secondary">
                {formatDateWithTime(order.createdAt)}
              </Typography>
            </Box>
            <Typography fontSize={{ xs: 13, sm: 14 }} color="text.disabled">
              {order.totalItems}{" "}
              {order.totalItems === 1 ? "Producto" : "Productos"}
            </Typography>
          </Box>
          <Typography
            fontWeight={600}
            fontSize={{ xs: 15, sm: 17 }}
            color="#77A787"
          >
            ${formatCurrency(order.total)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function CommerceOrdersListCard({
  orders = [],
}: {
  orders: OrderSummaryForCommerceResponse[];
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
        <CustomTitle
          text="Sin pedidos"
          fontSize={20}
          fontWeight={500}
          color="#2d2d2d"
          align="center"
        />
        <CustomTitle
          text="Todavía no recibiste ningún pedido"
          fontSize={18}
          color="#6d6d6d"
          align="center"
          fontWeight={400}
        />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={2} p={2}>
      {orders.map((order) => (
        <CommerceOrderCard key={order.orderId} order={order} />
      ))}
    </Box>
  );
}
