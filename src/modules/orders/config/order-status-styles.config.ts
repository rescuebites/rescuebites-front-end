import { OrderStatus } from "../enums/order-status.enum";

export interface StatusStyle {
  backgroundColor: string;
  textColor: string;
  label: string;
}

export const OrderStatusStyles: Record<OrderStatus, StatusStyle> = {
  [OrderStatus.PENDING]: {
    backgroundColor: "#D8F3DC",
    textColor: "#2D6A4F",
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
    backgroundColor: "#E0E7FF",
    textColor: "#4338CA",
    label: "Listo para retirar",
  },
  [OrderStatus.COMPLETED]: {
    backgroundColor: "#D1FAE5",
    textColor: "#047857",
    label: "Completado",
  },
  [OrderStatus.CANCELLED]: {
    backgroundColor: "#FEE2E2",
    textColor: "#DC2626",
    label: "Cancelado",
  },
};
