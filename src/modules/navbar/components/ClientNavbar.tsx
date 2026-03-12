import NavbarUI from "./NavbarUI";
import { navbarRoutes } from "../config/routes";

export default function ClientNavbar() {
  // ver si implementar nro para cant de prod agregados al carrito o cantidad de notificaciones
  // const { cartCount } = useCart();
  // const { notificationCount } = useNotifications();
  
  return (
    <NavbarUI 
      routes={navbarRoutes.client}
      cartCount={0}
      notificationCount={0}
    />
  );
}