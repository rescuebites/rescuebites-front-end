import { AuthRoutes } from "@/routes/AuthRoutes";
import { UserRoutes } from "@/routes/UserRoutes";
import {CustomerRoutes} from "@/routes/CustomerRoutes";
import { Navigate, Route, Routes } from "react-router-dom";
import { CommerceRoutes } from "@/routes/CommerceRoutes";
import { PublicRoutes } from "@/routes/PublicRoutes";

export default function RoutesProvider() {
  return (
    <Routes>
      {/* redirige "/" a "/auth/login" */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />

      {/* Acá van las rutas de /auth */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      <Route path="/api/users/*" element={<UserRoutes />} />

      <Route path="/register-commerce/*" element={<CommerceRoutes />} />
      {/* Acá van las rutas de /customer */}
      <Route path="/customer/*" element={<CustomerRoutes />} />

      {/* Rutas de invitado */}
      <Route path="/public/*" element={<PublicRoutes />} />

    </Routes>
  );
}
