import NavbarUI from "./NavbarUI";
import { navbarRoutes } from "../config/routes";
import { useCartStore } from "@/modules/cart/hooks/useCartStore";

export default function ClientNavbar() {
  const cartCount = useCartStore((state) => state.cart?.totalItems ?? 0);

  return (
    <NavbarUI 
      routes={navbarRoutes.client}
      cartCount={cartCount}
      notificationCount={0}
    />
  );
}