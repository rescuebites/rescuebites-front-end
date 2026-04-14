export type NotificationStatus =
  | 'COMPLETED'
  | 'READY'
  | 'PREPARING'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'NEW_ORDER'
  | 'EXPIRING_PRODUCT';

export type UserRole = 'CLIENT' | 'COMMERCE';

export interface NotificationResponse {
  id: string;
  status: NotificationStatus;
  orderId?: string;
  productName?: string;
  message: string;
  timestamp: Date;
  read: boolean;
  role: UserRole;
}