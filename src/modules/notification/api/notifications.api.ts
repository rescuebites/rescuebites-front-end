import { NotificationResponse, UserRole } from '../interfaces/responses/notification.response';
import { CLIENT_NOTIFICATIONS, COMMERCE_NOTIFICATIONS } from '../utils/NotificationsMock';

// Simula un delay de red
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fetchNotifications = async (role: UserRole): Promise<NotificationResponse[]> => {
  await delay(500);
  return role === 'CLIENT' ? CLIENT_NOTIFICATIONS : COMMERCE_NOTIFICATIONS;
};

export const markAllAsRead = async (
  notifications: NotificationResponse[]
): Promise<NotificationResponse[]> => {
  await delay(200);
  return notifications.map((n) => ({ ...n, read: true }));
};

export const markOneAsRead = async (
  notifications: NotificationResponse[],
  id: string
): Promise<NotificationResponse[]> => {
  await delay(100);
  return notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
};