import { ImageResponse } from "@/shared/interfaces/image-response.interface";
import { OrderStatus } from "../../enums/order-status.enum";

export interface OrderSummaryForClientResponse {
  orderId: string;
  orderNumber: string;
  commerceId: string;
  commerceName: string;
  commerceImages: ImageResponse[];
  totalItems: number;
  createdAt: string;
  total: number;
  status: OrderStatus;
}
