import { useEffect } from "react";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useClientProfile } from "@/modules/client/hooks/useClientProfile";
import { useLocalityStore } from "./useLocalityStore";

/**
 * When the user is authenticated as a client, fetches their profile from the
 * backend and syncs their registered locality into the locality store.
 *
 * Returns `isSyncing = true` while the profile is still being fetched AND
 * locality has not been written to the store yet. Callers can use this to
 * block rendering (e.g. show a spinner) instead of landing on empty states.
 */
export function useClientSync() {
  const { isAuthenticated, clientId } = useAuthStore();
  const locality = useLocalityStore((state) => state.locality);
  const setLocality = useLocalityStore((state) => state.setLocality);

  const isClient = isAuthenticated && !!clientId;

  const { data: clientProfile, isLoading } = useClientProfile(
    isClient ? clientId : undefined
  );

  useEffect(() => {
    if (isClient && clientProfile?.locality) {
      setLocality(clientProfile.locality);
    }
  }, [isClient, clientProfile?.locality, setLocality]);

  // True only while we're a client, haven't got locality yet, and the fetch
  // is still in-flight. Once locality lands in the store this becomes false.
  const isSyncing = isClient && !locality && isLoading;

  return { isSyncing };
}
