import { Box, Chip } from "@mui/material";
import { OrderStatus } from "../enums/order-status.enum";
import { OrderStatusDisplayName } from "../utils/order-status-mapping";

type FilterValue = OrderStatus | "ALL";

interface OrderStatusFilterProps {
  value: FilterValue;
  onChange: (status: FilterValue) => void;
}

const ALL_OPTION: FilterValue = "ALL";

const FILTER_OPTIONS: FilterValue[] = [
  ALL_OPTION,
  OrderStatus.PENDING,
  OrderStatus.CONFIRMED,
  OrderStatus.PREPARING,
  OrderStatus.READY,
  OrderStatus.COMPLETED,
  OrderStatus.CANCELLED,
];

const getLabel = (option: FilterValue): string =>
  option === ALL_OPTION ? "Todos" : OrderStatusDisplayName[option];

const OrderStatusFilter = ({ value, onChange }: OrderStatusFilterProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        overflowX: "auto",
        pb: 0.5,
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
      }}
    >
      {FILTER_OPTIONS.map((option) => {
        const isActive = value === option;
        return (
          <Chip
            key={option}
            label={getLabel(option)}
            onClick={() => onChange(option)}
            sx={{
              flexShrink: 0,
              fontWeight: isActive ? 600 : 500,
              fontSize: 20,
              bgcolor: isActive ? "#77A787" : "transparent",
              color: isActive ? "#FFFFFF" : "text.secondary",
              border: "2px solid",
              borderColor: isActive ? "#77A787" : "divider",
              "&:hover": {
                bgcolor: isActive ? "#77A787" : "action.hover",
              },
            }}
          />
        );
      })}
    </Box>
  );
};

export default OrderStatusFilter;