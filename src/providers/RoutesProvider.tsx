import { AuthRoutes } from "@/routes/AuthRoutes";
import { UserRoutes } from "@/routes/UserRoutes";
import { CustomerRoutes } from "@/routes/CustomerRoutes";
import { Navigate, Route, Routes } from "react-router-dom";
import { CommerceRoutes } from "@/routes/CommerceRoutes";
import LoadLocalityPage from "@/modules/catalog/pages/LoadLocalityPage";

export default function RoutesProvider() {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/api/users/*" element={<UserRoutes />} />

      {/* Selector de localidad — fuera de AppLayout, sin barra de navegación */}
      <Route path="locality" element={<LoadLocalityPage />} />
      
      {/* Acá van las rutas de /customer */}
      <Route path="/customer/*" element={<CustomerRoutes />} />


      <Route path="/commerce/*" element={<CommerceRoutes />} />
      {/* Redirecciones heredadas para que los enlaces antiguos no den 404 */}
      <Route path="/public/*" element={<Navigate to="/" replace />} /> 
    </Routes>
  );
}
