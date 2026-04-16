import { CommerceType } from "@/modules/commerce/enums/commerce-type.enum";
import { ImageResponse } from "@/shared/interfaces/image-response.interface";
import { OrderStatus } from "../../enums/order-status.enum";
import { PaymentMethod } from "../../enums/payment-method.enum";

export interface OrderItemResponse {
  orderItemId: string;
  productId: string;
  productName: string;
  productDescription: string;
  originalPrice: number;
  discountPercentage: number;
  unitPrice: number;
  quantity: number;
  subtotal: number;
  images: ImageResponse[];
}

export interface OrderResponse {
  orderId: string;
  orderNumber: string;
  commerceId: string;
  commerceName: string;
  commerceAddress: string;
  commerceLocality: string;
  commercePhone: string;
  commerceType: CommerceType;
  commerceImages: ImageResponse[];
  items: OrderItemResponse[];
  subtotal: number;
  discountedSubtotal: number;
  serviceFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  confirmedAt: string | null;
  scheduledPickupTime: string | null;
  notes: string | null;
}
