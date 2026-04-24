import { Box } from "@mui/material";
import FilterChip from "@/shared/components/ui/FilterChip";
import { OrderStatus } from "../enums/order-status.enum";
import type { FilterValue } from "../hooks/useOrderFilters";
import { OrderStatusDisplayName } from "../utils/order-status-mapping";
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
          <FilterChip
            key={option}
            label={getLabel(option)}
            active={isActive}
            onClick={() => onChange(option)}
          />
        );
      })}
    </Box>
  );
};

export default OrderStatusFilter;