import { Box } from "@mui/material";
import { OrderStatus } from "../enums/order-status.enum";
import { OrderStatusStyles } from "../config/order-status-styles.config";

interface Props {
  status: OrderStatus;
}

export default function StatusChip({ status }: Props) {
  const style = OrderStatusStyles[status];

  return (
    <Box
      sx={{
        display: "inline-block",
        px: 1.5,
        py: 0.3,
        borderRadius: 5,
        bgcolor: style.backgroundColor,
        fontSize: 20,
        fontWeight: 600,
        color: style.textColor,
      }}
    >
      ● {style.label}
    </Box>
  );
}
