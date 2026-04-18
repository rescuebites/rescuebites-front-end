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
    if (
      isClient &&
      clientProfile?.locality &&
      clientProfile.locality !== locality
    ) {
      setLocality(clientProfile.locality);
    }
  }, [isClient, clientProfile?.locality, locality, setLocality]);

  // isSyncing stays true during two phases:
  //  1. The profile fetch is still in-flight (!locality && isLoading)
  //  2. The fetch just settled and the profile has a locality, but the
  //     useEffect below hasn't written it to the store yet — this is the
  //     render-timing gap where !locality && !isLoading && clientProfile?.locality
  //     would otherwise cause LocalityGuard to redirect to /locality prematurely.
  //
  // Once setLocality() fires and locality enters the store, !locality becomes
  // false and isSyncing resolves to false.
  //
  // If the fetch settles and the profile has NO locality, clientProfile?.locality
  // is falsy so isSyncing becomes false and LocalityGuard redirects to /locality,
  // prompting the client to complete their profile.
  const isSyncing = isClient && !locality && (isLoading || !!clientProfile?.locality);

  return { isSyncing };
}
