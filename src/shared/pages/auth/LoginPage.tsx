import { Footer } from "@/modules/auth/components/Footer";
import LoginForm from "@/modules/auth/components/LoginForm";
import SearchResultsPage from "@/modules/commerce/components/SearchResultsPage";
import { SalesReport } from "@/modules/reports/SalesReport/SalesReport";

export function LoginPage() {
  return (
    <>
      <LoginForm />

      <Footer
        resetPasswordMessage={"¿Olvidaste tu contraseña?"}
        resetPasswordHref={"/api/users/reset-password/email"}
        registerMessage={"¿No tienes una cuenta?"}
        linkHrefCommerce={"/commerce/register-commerce"}
        linkTextCommerce={"Registrate como comercio"}
        linkHrefClient={"/auth/register-client"}
        linkTextClient={"Registrate como cliente"}
      />

      <SearchResultsPage />
      <SalesReport/>
    </>
  );
}
