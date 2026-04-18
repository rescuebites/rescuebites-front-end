import { useEffect } from "react";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useClientProfile } from "@/modules/client/hooks/useClientProfile";
import { useLocalityStore } from "./useLocalityStore";

/**
 * When the user is authenticated as a client, fetches their profile from the
 * backend and syncs their registered locality into the locality store.
 *
 * This ensures:
 *  - Commerce hooks (which use the public endpoints + locality param) always
 *    use the client's real locality instead of a manually entered one.
 *  - Product hooks switch to the client-specific endpoints automatically.
 *
 * Call this hook once near the top of the customer route tree.
 */
export function useClientSync() {
  const { isAuthenticated, clientId } = useAuthStore();
  const setLocality = useLocalityStore((state) => state.setLocality);

  const { data: clientProfile } = useClientProfile(
    isAuthenticated && clientId ? clientId : undefined
  );

  useEffect(() => {
    if (isAuthenticated && clientProfile?.locality) {
      setLocality(clientProfile.locality);
    }
  }, [isAuthenticated, clientProfile?.locality, setLocality]);
}
