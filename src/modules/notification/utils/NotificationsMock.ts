import { NotificationResponse } from '../interfaces/responses/Notification.response';

const now = new Date();
const minutesAgo = (m: number) => new Date(now.getTime() - m * 60000);

export const CLIENT_NOTIFICATIONS: NotificationResponse[] = [
  {
    id: '1',
    status: 'COMPLETED',
    orderId: '3456',
    message: 'Tu pedido ha sido completado exitosamente. ¡Gracias por elegirnos!',
    timestamp: minutesAgo(1),
    read: false,
    role: 'CLIENT',
  },
  {
    id: '2',
    status: 'READY',
    orderId: '3456',
    message: 'Tu pedido está listo. Por favor dirigite al mostrador de retiro.',
    timestamp: minutesAgo(10),
    read: false,
    role: 'CLIENT',
  },
  {
    id: '3',
    status: 'PREPARING',
    orderId: '3456',
    message: 'Nuestra cocina está preparando tu pedido con cuidado.',
    timestamp: minutesAgo(50),
    read: true,
    role: 'CLIENT',
  },
  {
    id: '4',
    status: 'CONFIRMED',
    orderId: '3456',
    message: 'Recibimos tu pedido y el pago. Te avisaremos cuando esté listo.',
    timestamp: minutesAgo(60),
    read: true,
    role: 'CLIENT',
  },
  {
    id: '5',
    status: 'CANCELLED',
    orderId: '3457',
    message: 'Tu pedido fue cancelado. Lamentamos los inconvenientes.',
    timestamp: minutesAgo(5),
    read: false,
    role: 'CLIENT',
  },
];

export const COMMERCE_NOTIFICATIONS: NotificationResponse[] = [
  {
    id: '6',
    status: 'NEW_ORDER',
    orderId: '3456',
    message: 'Se recibió un nuevo pedido y el pago fue confirmado.',
    timestamp: minutesAgo(1),
    read: false,
    role: 'COMMERCE',
  },
  {
    id: '7',
    status: 'CANCELLED',
    orderId: '3455',
    message: 'El cliente canceló su pedido. Revisá el stock correspondiente.',
    timestamp: minutesAgo(5),
    read: false,
    role: 'COMMERCE',
  },
  {
    id: '8',
    status: 'EXPIRING_PRODUCT',
    productName: 'Pasta Salad',
    message: 'Este producto está próximo a vencer. Considerá aplicar un descuento.',
    timestamp: minutesAgo(50),
    read: true,
    role: 'COMMERCE',
  },
  {
    id: '9',
    status: 'NEW_ORDER',
    orderId: '3454',
    message: 'Nuevo pedido recibido. El cliente eligió retiro en mostrador.',
    timestamp: minutesAgo(120),
    read: true,
    role: 'COMMERCE',
  },
  {
    id: '10',
    status: 'EXPIRING_PRODUCT',
    productName: 'Tarta de Verdura',
    message: 'Este producto vence mañana. Revisá la disponibilidad.',
    timestamp: minutesAgo(180),
    read: true,
    role: 'COMMERCE',
  },
];