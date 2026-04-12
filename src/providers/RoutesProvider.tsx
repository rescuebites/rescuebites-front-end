import { AuthRoutes } from "@/routes/AuthRoutes";
import { UserRoutes } from "@/routes/UserRoutes";
import { CustomerRoutes } from "@/routes/CustomerRoutes";
import { Navigate, Route, Routes } from "react-router-dom";
import { CommerceRoutes } from "@/routes/CommerceRoutes";
import LoadLocalityPage from "@/modules/catalog/pages/LoadLocalityPage";
import { useLocalityStore } from "@/modules/customer/home/hooks/useLocalityStore";

export default function RoutesProvider() {
  const locality = useLocalityStore((s) => s.locality);
  return (
    <Routes>
      {/* Si no hay localidad seleccionada, redirigir la raíz a /locality */}
      {!locality && <Route path="/" element={<Navigate to="/locality" replace />} />}
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/api/users/*" element={<UserRoutes />} />

      {/* Selector de localidad — fuera de AppLayout, sin barra de navegación */}
      <Route path="locality"  element={<LoadLocalityPage />} />
      
      {/* Acá van las rutas de /customer */}
      <Route path="/*" element={<CustomerRoutes />} />


      <Route path="/commerce/*" element={<CommerceRoutes />} />
    </Routes>
  );
}
