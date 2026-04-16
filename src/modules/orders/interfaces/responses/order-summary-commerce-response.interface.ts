import { ImageResponse } from "@/shared/interfaces/image-response.interface";
import { OrderStatus } from "../../enums/order-status.enum";

export interface OrderSummaryForCommerceResponse {
  orderId: string;
  orderNumber: string;
  clientId: string;
  clientName: string;
  clientLastName: string;
  clientImages: ImageResponse[];
  totalItems: number;
  createdAt: string;
  total: number;
  status: OrderStatus;
}
