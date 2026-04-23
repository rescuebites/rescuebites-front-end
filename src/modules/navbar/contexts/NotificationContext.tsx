import { createContext, useState, ReactNode, useContext } from "react";

export type NotificationType = "Confirmed" | "Cancelled" | "Expired";

export interface Notification {
  id: string;
  eventId: string;
  registerId: string,
  message: string;
  type: NotificationType;
  isRead: boolean;
}

interface NotificationContextProps {
  notifications: Notification[];
  addNotification: (n: Notification) => void;
  setNotifications: (n: Notification[]) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined,
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotificationsState] = useState<Notification[]>([]);

  const addNotification = (n: Notification) => {
    setNotificationsState((prev) => [n, ...prev]);
  };

  const setNotifications = (n: Notification[]) => {
    setNotificationsState(n);
  };

  const markAllAsRead = () => {
    setNotificationsState((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        setNotifications,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider",
    );
  }
  return ctx;
};
