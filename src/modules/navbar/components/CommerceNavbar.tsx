import { useEffect, useState } from "react";
import NavbarUI from "./NavbarUI";
import { navbarRoutes } from "../config/routes";

export default function CommerceNavbar() {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    console.log("ELFECTO")
    const eventSource = new EventSource(
      "http://localhost:8080/subscribe/commerce",
    );
    console.log(eventSource);
    eventSource.addEventListener("notification", (event) => {
      const data = JSON.parse(event.data);
      console.log("🔔 Notificación recibida:", data);

      // Incrementar badge
      setNotificationCount((prev) => prev + 1);
    });

    eventSource.onerror = (error) => {
      console.error("❌ Error en SSE:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <NavbarUI
      routes={navbarRoutes.commerce}
      notificationCount={notificationCount}
    />
  );
}
