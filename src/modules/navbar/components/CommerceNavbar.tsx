import NavbarUI from "./NavbarUI";
import { navbarRoutes } from "../config/routes";

export default function CommerceNavbar() {
    //ver si implementar contador para nro de notif sin leer:
    // const { notificationCount } = useNotifications();
  
  return (
    <NavbarUI 
      routes={navbarRoutes.commerce}
      notificationCount={0}
    />
  );
}