import { createContext, useState, ReactNode, useContext } from "react";

export type NotificationType = "Confirmed" | "Cancelled" | "Expired";

export interface Notification {
  orderId: string;
  message: string;
  type: NotificationType;
}

interface NotificationContextProps {
  notifications: Notification[];
  addNotification: (n: Notification) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

// 👇 ESTE es el fix importante
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (n: Notification) => {
    setNotifications((prev) => [n, ...prev]);
  };

  const clearNotifications = () => setNotifications([]);

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, clearNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotifications must be used inside NotificationProvider");
  }
  return ctx;
};