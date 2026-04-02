import { AuthRoutes } from "@/routes/AuthRoutes";
import { UserRoutes } from "@/routes/UserRoutes";
import { CustomerRoutes } from "@/routes/CustomerRoutes";
import { CommerceRoutes } from "@/routes/CommerceRoutes";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadLocalityPage from "@/modules/catalog/pages/LoadLocalityPage";

export default function RoutesProvider() {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/api/users/*" element={<UserRoutes />} />
      <Route path="/commerce/*" element={<CommerceRoutes />} />

      {/* Selector de localidad — fuera de AppLayout, sin barra de navegación */}
      <Route path="locality" element={<LoadLocalityPage />} />

      <Route path="/*" element={<CustomerRoutes />} />

      {/* Redirecciones heredadas para que los enlaces antiguos no den 404 */}
      <Route path="/customer/*" element={<Navigate to="/" replace />} />
      <Route path="/public/*" element={<Navigate to="/" replace />} /> 
    </Routes>
  );
}
