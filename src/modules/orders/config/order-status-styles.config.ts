import { OrderStatus } from "../enums/order-status.enum";

export interface StatusStyle {
  backgroundColor: string;
  textColor: string;
  label: string;
}

export const OrderStatusStyles: Record<OrderStatus, StatusStyle> = {
  [OrderStatus.PENDING]: {
    backgroundColor: "#FFF3CD",
    textColor: "#856404",
    label: "Pendiente",
  },
  [OrderStatus.CONFIRMED]: {
    backgroundColor: "#DBEAFE",
    textColor: "#1E40AF",
    label: "Confirmado",
  },
  [OrderStatus.PREPARING]: {
    backgroundColor: "#FEF3C7",
    textColor: "#B45309",
    label: "En preparación",
  },
  [OrderStatus.READY]: {
    backgroundColor: "#D4EDDA",
    textColor: "#155724",
    label: "Listo para retirar",
  },
  [OrderStatus.COMPLETED]: {
    backgroundColor: "#E0E0E0",
    textColor: "#424242",
    label: "Completado",
  },
  [OrderStatus.CANCELLED]: {
    backgroundColor: "#FEE2E2",
    textColor: "#DC2626",
    label: "Cancelado",
  },
};
