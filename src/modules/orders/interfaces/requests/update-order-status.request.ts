import { OrderStatus } from "@/modules/orders/enums/order-status.enum";

export interface UpdateOrderStatusRequest {
  newStatus: OrderStatus;
  reason?: string;
}
