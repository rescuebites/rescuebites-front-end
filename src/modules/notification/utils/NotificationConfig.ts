import {
  CheckCircle,
  Storefront,
  AccessTime,
  CheckBox,
  Cancel,
  ShoppingBag,
  Warning,
} from '@mui/icons-material';
import { SvgIconComponent } from '@mui/icons-material';
import { NotificationStatus } from '../interfaces/responses/notification.response';

export interface StatusConfig {
  label: string;
  color: string;
  bgColor: string;
  Icon: SvgIconComponent;
}

export const STATUS_CONFIG: Record<NotificationStatus, StatusConfig> = {
  COMPLETED: {
    label: 'Completado',
    color: '#2E7D32',
    bgColor: '#E8F5E9',
    Icon: CheckCircle,
  },
  READY: {
    label: 'Listo',
    color: '#1565C0',
    bgColor: '#E3F2FD',
    Icon: Storefront,
  },
  PREPARING: {
    label: 'Preparando',
    color: '#E65100',
    bgColor: '#FFF3E0',
    Icon: AccessTime,
  },
  CONFIRMED: {
    label: 'Confirmado',
    color: '#2E7D32',
    bgColor: '#E8F5E9',
    Icon: CheckBox,
  },
  CANCELLED: {
    label: 'Cancelado',
    color: '#C62828',
    bgColor: '#FFEBEE',
    Icon: Cancel,
  },
  NEW_ORDER: {
    label: 'Nuevo Pedido',
    color: '#1B5E20',
    bgColor: '#E8F5E9',
    Icon: ShoppingBag,
  },
  EXPIRING_PRODUCT: {
    label: 'Producto por Vencer',
    color: '#E65100',
    bgColor: '#FFF3E0',
    Icon: Warning,
  },
};

export const getStatusConfig = (status: NotificationStatus): StatusConfig =>
  STATUS_CONFIG[status];

export const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMin / 60);

  if (diffMin < 1) return 'Ahora';
  if (diffMin < 60) return `${diffMin}min atrás`;
  if (diffHrs < 24) return `${diffHrs}h atrás`;
  return new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short' }).format(date);
};