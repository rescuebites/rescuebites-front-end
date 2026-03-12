import NavbarUI from "./NavbarUI";
import { navbarRoutes } from "../config/routes";

export default function PublicNavbar() {
  return (
    <NavbarUI 
      routes={navbarRoutes.public}
    />
  );
}