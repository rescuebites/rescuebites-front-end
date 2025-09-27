import { Footer } from "@/modules/auth/components/Footer";
import LoginForm from "@/modules/auth/components/LoginForm";

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
        linkHrefClient={"/register-client"}
        linkTextClient={"Registrate como cliente"}
      />
    </>
  );
}
