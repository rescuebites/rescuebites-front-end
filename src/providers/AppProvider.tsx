import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CssBaseline } from "@mui/material";

import RoutesProvider from "@/providers/RoutesProvider";
//import { ConfirmModal } from "@/shared/components/ui/ConfirmModal";
//import { AuthProvider } from "@/providers/AuthProvider";
import { ErrorBoundary } from "@/shared/components/ui/ErrorBoundary";
import { SnackbarProvider } from "./SnackbarProvider";

const queryClient = new QueryClient();

export default function AppProvider() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CssBaseline />
          {/*<ConfirmModal /> */}

          <ErrorBoundary fallback={<p>Algo salió mal</p>}>
            <RoutesProvider/>

            {/*<AuthProvider>
              <RoutesProvider/>
            </AuthProvider>*/}
          </ErrorBoundary>

           <SnackbarProvider />

          {/*{process.env.NODE_ENV === "development" && <ReactQueryDevtools />}*/}
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  );
}