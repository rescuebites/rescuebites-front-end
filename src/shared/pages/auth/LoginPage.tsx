import { Footer } from "@/modules/auth/components/Footer";
import LoginForm from "@/modules/auth/components/LoginForm";
import HomeCustomerPage from "@/modules/commerce/HomeCustomerPage";
import CustomerDashboardPage from "@/modules/commerce/CustomerDashboardPage";

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

      <HomeCustomerPage />
      <CustomerDashboardPage />
    </>
  );
}
