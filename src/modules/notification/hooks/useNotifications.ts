import { useState, useEffect, useCallback } from 'react';
import { NotificationResponse, UserRole } from '../interfaces/responses/notification.response';
import {
  fetchNotifications,
  markAllAsRead,
  markOneAsRead,
} from '../api/notifications.api';

interface UseNotificationsReturn {
  notifications: NotificationResponse[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  handleMarkAllRead: () => void;
  handleMarkOneRead: (id: string) => void;
}

export const useNotifications = (role: UserRole): UseNotificationsReturn => {
  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchNotifications(role)
      .then(setNotifications)
      .catch(() => setError('No se pudieron cargar las notificaciones.'))
      .finally(() => setLoading(false));
  }, [role]);

  const handleMarkAllRead = useCallback(async () => {
    const updated = await markAllAsRead(notifications);
    setNotifications(updated);
  }, [notifications]);

  const handleMarkOneRead = useCallback(
    async (id: string) => {
      const updated = await markOneAsRead(notifications, id);
      setNotifications(updated);
    },
    [notifications]
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  return { notifications, unreadCount, loading, error, handleMarkAllRead, handleMarkOneRead };
};