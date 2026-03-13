import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "@/shared/pages/layouts/AuthLayout";
import RegisterForm from "@/modules/commerce/pages/registerCommercePage";
import StoreBusinessHours from "@/modules/commerce/components/BusinessHours";

export function CommerceRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<RegisterForm />} />
        <Route path='/schedule' element={<StoreBusinessHours />} />
      </Route>
    </Routes>
  );
}
