import { OrderStatus } from "../enums/order-status.enum";

export const OrderStatusDisplayName: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: "Pendiente",
  [OrderStatus.CONFIRMED]: "Confirmado",
  [OrderStatus.PREPARING]: "En preparación",
  [OrderStatus.READY]: "Listo para retirar",
  [OrderStatus.COMPLETED]: "Completado",
  [OrderStatus.CANCELLED]: "Cancelado",
};
