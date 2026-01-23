import { AuthRoutes } from "@/routes/AuthRoutes";
import { UserRoutes } from "@/routes/UserRoutes";
import { Navigate, Route, Routes } from "react-router-dom";
import { CommerceRoutes } from "@/routes/CommerceRoutes";

export default function RoutesProvider() {
  return (
    <Routes>
      {/* redirige "/" a "/auth/login" */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />

      {/* Acá van las rutas de /auth */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/*<Route path="/api/v1/clients/*" element={<ClientRoutes/>}/>*/}

      <Route path="/api/users/*" element={<UserRoutes />} />

      <Route path="/commerces/*" element={<CommerceRoutes />} />
    
    </Routes>
   

  

  );
}
