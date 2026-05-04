import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CssBaseline } from "@mui/material";

import RoutesProvider from "@/providers/RoutesProvider";
//import { ConfirmModal } from "@/shared/components/ui/ConfirmModal";
//import { AuthProvider } from "@/providers/AuthProvider";
import { ErrorBoundary } from "@/shared/components/ui/ErrorBoundary";
import { SnackbarProvider } from "./SnackbarProvider";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import ScrollToTop from "@/shared/components/ScrollToTop";
import { NotificationProvider } from "@/modules/navbar/contexts/NotificationContext";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message || "Ocurrió un error inesperado";
      useSnackbarStore.getState().showMessage(msg, "error");
    },
  }),
});

export default function AppProvider() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
                  <NotificationProvider>

        <BrowserRouter>
          <ScrollToTop />
          <CssBaseline />
          {/*<ConfirmModal /> */}

            <ErrorBoundary fallback={<p>Algo salió mal</p>}>
              <RoutesProvider />

              {/*<AuthProvider>
              <RoutesProvider/>
            </AuthProvider>*/}
            </ErrorBoundary>

            <SnackbarProvider />
          {/*{process.env.NODE_ENV === "development" && <ReactQueryDevtools />}*/}
        </BrowserRouter>
                  </NotificationProvider>

      </QueryClientProvider>
    </StrictMode>
  );
}
