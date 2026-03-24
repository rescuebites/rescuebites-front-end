import { ImageResponse} from "@/shared/interfaces/image-response.interface";
import { PaymentMethod } from "../../../orders/enums/payment-method.enum";


//Cart Item 
 
export interface CartItemResponse {
  cartItemId: string;         
  productId: string;          
  productName: string;
  description: string;
  originalPrice: number;      
  discountPercentage: number;
  unitPrice: number;
  quantity: number;
  availableStock: number;
  subtotal: number;
  commerceId: string;       
  commerceName: string;
  commerceAddress: string;
  images: ImageResponse[];
}
 
//Commerce Cart Summary 
 
export interface CommerceCartSummary {
  commerceId: string;         
  commerceName: string;
  address: string;
  items: CartItemResponse[];
  subtotal: number;
  itemCount: number;
}
 
// Cart Response
 
export interface CartResponse {
  cartId: string;                                 
  commerceSummaries: Record<string, CommerceCartSummary>; 
  subtotal: number;
  serviceFee: number;
  total: number;
  totalItems: number;
  selectedPaymentMethod: PaymentMethod | null;
  lastUsedPaymentMethod: PaymentMethod | null;
}