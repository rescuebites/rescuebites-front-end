import { AuthRoutes } from "@/routes/AuthRoutes";
import { UserRoutes } from "@/routes/UserRoutes";
import { Navigate, Route, Routes } from "react-router-dom";

export default function RoutesProvider() {
  return (
    <Routes>
      {/* redirige "/" a "/auth/login" */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />

      {/* Acá van las rutas de /auth */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      <Route path="/api/users/*" element={<UserRoutes />} />
    </Routes>
  );
}