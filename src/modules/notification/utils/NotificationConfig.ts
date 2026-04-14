import { LucideIcon, CheckCircle, Store, Clock, PackageCheck, XCircle, ShoppingBag, AlertTriangle } from 'lucide-react';
import { NotificationStatus } from '../interfaces/responses/notification.response';

export interface StatusConfig {
  label: string;
  color: string;
  bgColor: string;
  Icon: LucideIcon;
  defaultMessage: string;
}

export const STATUS_CONFIG: Record<NotificationStatus, StatusConfig> = {
  COMPLETED: {
    label: 'Completado',
    color: '#448f48',
    bgColor: '#E8F5E9',
    Icon: CheckCircle,
    defaultMessage: 'Tu pedido fue completado exitosamente. ¡Gracias por tu compra!',
  },
  READY: {
    label: 'Listo',
    color: '#477fbe',
    bgColor: '#E3F2FD',
    Icon: Store,
    defaultMessage: 'Tu pedido está listo para retirar. Podés pasarlo a buscar cuando quieras.',
  },
  PREPARING: {
    label: 'Preparando',
    color: '#db7a45',
    bgColor: '#FFF3E0',
    Icon: Clock,
    defaultMessage: 'Tu pedido está siendo preparado. Te avisaremos cuando esté listo.',
  },
  CONFIRMED: {
    label: 'Confirmado',
    color: '#6c8f34',
    bgColor: '#E8F5E9',
    Icon: PackageCheck,
    defaultMessage: 'Recibimos tu pedido. Nos pondremos en contacto cuando haya novedades.',
  },
  CANCELLED: {
    label: 'Cancelado',
    color: '#C62828',
    bgColor: '#FFEBEE',
    Icon: XCircle,
    defaultMessage: 'Tu pedido fue cancelado. Si tenés dudas, contactate con el comercio.',
  },
  NEW_ORDER: {
    label: 'Nuevo Pedido',
    color: '#1B5E20',
    bgColor: '#E8F5E9',
    Icon: ShoppingBag,
    defaultMessage: 'Recibiste un nuevo pedido. Revisalo y confirmalo a la brevedad.',
  },
  EXPIRING_PRODUCT: {
    label: 'Producto por Vencer',
    color: '#E65100',
    bgColor: '#FFF3E0',
    Icon: AlertTriangle,
    defaultMessage: 'Uno de tus productos está próximo a vencer. Revisá tu inventario.',
  },
};

export const getStatusConfig = (status: NotificationStatus): StatusConfig =>
  STATUS_CONFIG[status];