import { Footer } from "@/modules/auth/components/Footer";
import LoginForm from "@/modules/auth/components/LoginForm";
import CustomerDashboardPage from "@/modules/commerce/CommerceDashboardPage";
import SearchResultsPage from "@/modules/commerce/SearchResultsPage";

export function LoginPage() {
  return (
    <>
      <LoginForm />

      <Footer
        resetPasswordMessage={"¿Olvidaste tu contraseña?"}
        resetPasswordHref={"/api/users/reset-password/email"}
        registerMessage={"¿No tienes una cuenta?"}
        linkHrefCommerce={"/register-commerce"}
        linkTextCommerce={"Registrate como comercio"}
        linkHrefClient={"/auth/register-client"}
        linkTextClient={"Registrate como cliente"}
      />

      <CustomerDashboardPage />
      <SearchResultsPage />
    </>
  );
}
