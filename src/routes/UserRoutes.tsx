import { ForgotPasswordPage } from "@/modules/users/components/ForgotPasswordPage";
import { ResetPasswordPage } from "@/modules/users/components/ResetPasswordPage";
import { ResendVerificationPage } from "@/shared/pages/auth/ResendVerificationPage";
import { AuthLayout } from "@/shared/pages/layouts/AuthLayout";
import { Route, Routes } from "react-router-dom";

export function UserRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={"reset-password/email"} element={<ForgotPasswordPage />} />
        <Route path={"reset-password"} element={<ResetPasswordPage />} />
        <Route
          path={"resend-verification-account"}
          element={<ResendVerificationPage />}
        />
      </Route>
    </Routes>
  );
}
