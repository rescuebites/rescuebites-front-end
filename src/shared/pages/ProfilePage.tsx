import ClientProfilePage from "@/modules/client/pages/ClientProfilePage";
import NotLoggedInScreen from "@/modules/navbar/pages/NotLoggedInScreen";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";

export default function ProfilePage() {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <NotLoggedInScreen />;
    }

    return <ClientProfilePage />;
}