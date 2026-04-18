import { useEffect } from "react";
import NavbarUI from "./NavbarUI";
import { navbarRoutes } from "../config/routes";
import { useNotifications } from "../contexts/NotificationContext";

export default function CommerceNavbar() {
  const { notifications, addNotification } = useNotifications();

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:8080/subscribe/commerce"
    );

    eventSource.addEventListener("notification", (event) => {
      const data = JSON.parse(event.data);

      addNotification({
        orderId: data.orderId,
        message: data.message,
        type: data.type,
      });
    });

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return (
    <NavbarUI
      routes={navbarRoutes.commerce}
      notificationCount={notifications.length}
    />
  );
}
