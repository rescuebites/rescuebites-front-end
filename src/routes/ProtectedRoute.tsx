import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { Outlet } from "react-router-dom";
import NotLoggedInScreen from "@/modules/navbar/pages/NotLoggedInScreen";

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <NotLoggedInScreen />;
}
