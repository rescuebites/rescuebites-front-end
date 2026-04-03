import { Store, Clock } from "lucide-react";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";

type OrderStatus = "in_preparation" | "delivered" | "cancelled";

interface Order {
  id: number;
  storeName: string;
  status: OrderStatus;
  date: string;
  itemCount: number;
  total: number;
}

const STATUS_CONFIG = {
  in_preparation: { label: "In Preparation", color: "#3B6D11", bg: "#EAF3DE" },
  delivered: { label: "Delivered", color: "#185FA5", bg: "#E6F1FB" },
  cancelled: { label: "Cancelled", color: "#A32D2D", bg: "#FCEBEB" },
} satisfies Record<OrderStatus, { label: string; color: string; bg: string }>;

const mockOrders: Order[] = [
  {
    id: 1234,
    storeName: "Bakery",
    status: "in_preparation",
    date: "February 02, 2026",
    itemCount: 3,
    total: 47.0,
  },
  {
    id: 1235,
    storeName: "Bakery",
    status: "delivered",
    date: "January 28, 2026",
    itemCount: 5,
    total: 83.5,
  },
];

function OrderCard({ order }: { order: Order }) {
  const status = STATUS_CONFIG[order.status];

  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: 3, maxWidth: 420, width: "100%" }}
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
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Store size={22} color="#E07A30" />
            </Box>
            <Box>
              <Typography fontWeight={500} fontSize={15}>
                {order.storeName}
              </Typography>
              <Chip
                label={status.label}
                size="small"
                sx={{
                  mt: 0.5,
                  height: 20,
                  fontSize: 11,
                  fontWeight: 500,
                  color: status.color,
                  bgcolor: status.bg,
                  borderRadius: "999px",
                }}
              />
            </Box>
          </Box>
          <Typography fontSize={13} color="text.secondary">
            #{order.id}
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
          <Box display="flex" alignItems="center" gap={0.75}>
            <Clock size={14} color="gray" />
            <Box>
              <Typography fontSize={12} color="text.secondary">
                {order.date}
              </Typography>
              <Typography fontSize={11} color="text.disabled">
                {order.itemCount} Items
              </Typography>
            </Box>
          </Box>
          <Typography fontWeight={500} fontSize={16}>
            ${order.total.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function OrderList() {
  return (
    <Box display="flex" flexDirection="column" gap={2} p={2}>
      {mockOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </Box>
  );
}