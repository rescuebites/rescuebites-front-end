import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "@/shared/pages/layouts/AuthLayout";
import { RegisterFormPage } from "@/shared/pages/auth/RegisterFormPage";

export function CommerceRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={"register"} element={<RegisterFormPage />} />
      </Route>
    </Routes>
  );
}
