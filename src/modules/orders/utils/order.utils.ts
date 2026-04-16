import { OrderStatus } from "../enums/order-status.enum";

export const getShortOrderNumber = (orderNumber: string): string => {
  const parts = orderNumber.split("-");
  return parts[parts.length - 1];
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
