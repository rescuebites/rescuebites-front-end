import { OrderStatus } from "../enums/order-status.enum";

//Extrae la parte corta del número de orden (última sección después del guion)

export const getShortOrderNumber = (orderNumber: string): string => {
  const parts = orderNumber.split("-");
  return parts[parts.length - 1];
};

export const getStatusColor = (
  status: OrderStatus
): { bg: string; color: string } => {
  switch (status) {
    case OrderStatus.PENDING:
      return { bg: "#FFF3CD", color: "#856404" };
    case OrderStatus.CONFIRMED:
      return { bg: "#D1ECF1", color: "#0C5460" };
    case OrderStatus.PREPARING:
      return { bg: "#CCE5FF", color: "#004085" };
    case OrderStatus.READY:
      return { bg: "#D4EDDA", color: "#155724" };
    case OrderStatus.COMPLETED:
      return { bg: "#E0E0E0", color: "#424242" };
    case OrderStatus.CANCELLED:
      return { bg: "#F8D7DA", color: "#721C24" };
    default:
      return { bg: "#E0E0E0", color: "#424242" };
  }
};

export const getProgressPercentage = (status: OrderStatus): number => {
  switch (status) {
    case OrderStatus.PENDING:
      return 20;
    case OrderStatus.CONFIRMED:
      return 40;
    case OrderStatus.PREPARING:
      return 60;
    case OrderStatus.READY:
      return 80;
    case OrderStatus.COMPLETED:
      return 100;
    case OrderStatus.CANCELLED:
      return 0;
    default:
      return 0;
  }
};
