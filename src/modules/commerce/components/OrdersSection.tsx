import { Box, Stack } from "@mui/material";
import OrderCard from "./OrderCard";
import { OrderSummaryForCommerceResponse } from "@/modules/orders/interfaces/responses/order-summary-commerce-response.interface";
import EmptyState from "@/shared/components/EmptyState";
import { formatDateShort } from "@/shared/utils/dateFormat";

interface Props {
  orders: OrderSummaryForCommerceResponse[];
}

export default function OrdersSection({ orders }: Props) {
  if (orders.length === 0) {
    return <EmptyState message="No hay pedidos para mostrar" />;
  }

  return (
    <Box mt={3}>
      <Stack spacing={2}>
        {orders.map((order) => {
          return (
            <OrderCard
              key={order.orderId}
              name={`${order.clientName} ${order.clientLastName}`}
              price={Number(order.total)}
              date={formatDateShort(order.createdAt)}
              status={order.status}
              image={order.clientImages?.[0]?.url}
              orderNumber={order.orderNumber}
            />
          );
        })}
      </Stack>
    </Box>
  );
}
