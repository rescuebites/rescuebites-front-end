import { useEffect } from "react";
import NavbarUI from "./NavbarUI";
import { navbarRoutes } from "../config/routes";
import { useCartStore } from "@/modules/cart/hooks/useCartStore";
import { useNotifications } from "../contexts/NotificationContext";

export default function ClientNavbar() {
  const cartCount = useCartStore((state) => state.cart?.totalItems ?? 0);

  const { notifications, setNotifications, addNotification, markAllAsRead } =
    useNotifications();

  // 🔹 helper para clientId
  const getClientId = () => {
    const raw = localStorage.getItem("auth-storage");
    if (!raw) return null;

    return JSON.parse(raw)?.state?.clientId;
  };

  useEffect(() => {
    // =========================
    // 1. TRAER NO LEÍDAS
    // =========================
    const fetchUnread = async () => {
      try {
        const clientId = getClientId();
        if (!clientId) return;

        const res = await fetch(
          `http://localhost:8080/notifications/unread?userId=${clientId}`
        );

        const data = await res.json();

        const list = Array.isArray(data) ? data : (data.content ?? []);

        const mapped = list.map((n: any) => ({
          id: n.id,
          eventId: n.data?.eventId,
          message: n.message,
          type: n.type,
          isRead: n.read,
        }));

        setNotifications(mapped);
      } catch (err) {
        console.error("Error fetching notifications", err);
        setNotifications([]);
      }
    };

    fetchUnread();

    // =========================
    // 2. SSE
    // =========================
    const clientId = getClientId();
    if (!clientId) return;

    const eventSource = new EventSource(
      `http://localhost:8080/subscribe/client?clientId=${clientId}`
    );

    eventSource.onopen = () => {
      console.log("✅ SSE cliente conectado");
    };

    eventSource.addEventListener("notification", (event) => {
      const data = JSON.parse(event.data);

      addNotification({
        id: crypto.randomUUID(),
        eventId: data.eventId,
        message: data.message,
        type: data.type,
        isRead: false,
      });
    });

    eventSource.onerror = (err) => {
      console.error("❌ SSE error", err);
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  // =========================
  // 3. MARCAR COMO LEÍDAS
  // =========================
  const handleOpenNotifications = async () => {
    try {
      const clientId = getClientId();
      if (!clientId) return;

      await fetch(
        `http://localhost:8080/notifications/read/all?userId=${clientId}`,
        {
          method: "PATCH",
        }
      );

      markAllAsRead();
    } catch (err) {
      console.error("Error marking as read", err);
    }
  };

  const unreadCount = notifications?.filter((n) => !n.isRead).length;

  return (
    <NavbarUI
      routes={navbarRoutes.client}
      cartCount={cartCount}
      notificationCount={unreadCount}
      onOpenNotifications={handleOpenNotifications}
    />
  );
}