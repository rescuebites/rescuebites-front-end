import { useEffect } from "react";
import NavbarUI from "./NavbarUI";
import { navbarRoutes } from "../config/routes";
import { useNotifications } from "../contexts/NotificationContext";

export default function CommerceNavbar() {
  const { notifications, setNotifications, addNotification, markAllAsRead } =
    useNotifications();

  const getCommerceId = () => {
    const raw = localStorage.getItem("auth-storage");
    if (!raw) return null;

    return JSON.parse(raw)?.state?.commerceId;
  };

  useEffect(() => {
    // =========================
    // 1. TRAER NO LEÍDAS
    // =========================
    const fetchUnread = async () => {
      try {
        const commerceId = getCommerceId();

        const res = await fetch(
          `http://localhost:8080/notifications/unread?userId=${commerceId}`,
        );

        const data = await res.json();
        console.log("DATA", data);
        // 🔥 asegurar array SIEMPRE
        const list = Array.isArray(data) ? data : (data.content ?? []);
        console.log("list", list);
        const mapped = list.map((n: any) => ({
          id: n.id,
          eventId: n?.eventId,
          registerId: n?.registerId,
          message: n.message,
          type: n.type,
          read: n.read,
        }));

        setNotifications(mapped);
      } catch (err) {
        console.error("Error fetching notifications", err);
        setNotifications([]); // fallback seguro
      }
    };

    fetchUnread();

    // =========================
    // 2. SSE
    // =========================
    const commerceId = getCommerceId();

    const eventSource = new EventSource(
      `http://localhost:8080/subscribe/commerce?commerceId=${commerceId}`,
    );

    eventSource.onopen = () => {
      console.log("✅ SSE conectado");
    };

    eventSource.addEventListener("notification", (event) => {
      const data = JSON.parse(event.data);

      addNotification({
        id: crypto.randomUUID(),
        eventId: data.eventId,
        registerId: data.registerId,
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
      const commerceId = getCommerceId();

      await fetch(
        `http://localhost:8080/notifications/read/all?userId=${commerceId}`,
        {
          method: "PATCH",
        },
      );

      markAllAsRead(); // 👈 ahora sí correcto
    } catch (err) {
      console.error("Error marking as read", err);
    }
  };

  // 👇 SOLO CONTAR NO LEÍDAS
  const unreadCount = notifications?.filter((n) => !n.isRead).length;

  return (
    <NavbarUI
      routes={navbarRoutes.commerce}
      notificationCount={unreadCount}
      onOpenNotifications={handleOpenNotifications}
    />
  );
}
