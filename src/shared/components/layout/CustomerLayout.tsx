/// Este componente se encarga de envolver las páginas del cliente y mostrar el navbar en todas ellas
import { Outlet } from "react-router-dom";
import ClientNavbar from "../layout/ClientNavbar";

export default function CustomerLayout() {
  return (
    <>
      <Outlet />
      <ClientNavbar />
    </>
  );
}